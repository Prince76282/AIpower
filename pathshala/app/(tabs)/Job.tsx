import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";
import OpenAI from "openai";

interface DocumentResult {
  name: string;
  uri: string;
  mimeType: string;
}

interface ATSAnalysis {
  score: number;
  improvements: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

// ----------------- Grok AI Setup -----------------
const GROK_API_KEY = "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"; // 🔑 Replace with your Grok AI API key

const grokAI = new OpenAI({
  baseURL: "https://api.grok.ai/v1",
  apiKey: GROK_API_KEY,
  defaultHeaders: {
    "X-Title": "AI Resume Checker",
  },
});

export default function JobPage() {
  const [resumeFile, setResumeFile] = useState<DocumentResult | null>(null);
  const [jobDescriptionFile, setJobDescriptionFile] =
    useState<DocumentResult | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState<string>("");
  const [resumeText, setResumeText] = useState<string>("");
  const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // ---------- Keyword Extraction ----------
  const extractKeywords = (text: string): Record<string, number> => {
    const commonWords = [
      "the",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "a",
      "an",
      "is",
      "are",
      "was",
      "were",
      "be",
      "been",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
      "may",
      "might",
      "must",
      "can",
      "this",
      "that",
      "these",
      "those",
    ];
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !commonWords.includes(w))
      .reduce((acc: Record<string, number>, w) => {
        acc[w] = (acc[w] || 0) + 1;
        return acc;
      }, {});
  };

  // ---------- ATS Analysis ----------
  const analyzeATS = async (
    resumeContent: string,
    jobDescription: string
  ): Promise<ATSAnalysis> => {
    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2000));

    const jobKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeContent);
    const jobKeywordList = Object.keys(jobKeywords);

    const matched = jobKeywordList.filter((k) => resumeKeywords[k]);
    const missing = jobKeywordList.filter((k) => !resumeKeywords[k]);

    const keywordScore = (matched.length / jobKeywordList.length) * 40;

    // formatting
    let formattingScore = 0;
    if (resumeContent.includes("@")) formattingScore += 10;
    if (resumeContent.match(/phone|mobile/i)) formattingScore += 10;
    if (resumeContent.match(/experience|work/i)) formattingScore += 10;
    if (resumeContent.match(/education|degree/i)) formattingScore += 10;
    if (resumeContent.match(/skill|technical/i)) formattingScore += 10;

    // content
    const actionWords = [
      "achieved",
      "developed",
      "implemented",
      "managed",
      "led",
      "created",
      "improved",
      "increased",
      "reduced",
      "optimized",
    ];
    const actionCount = actionWords.filter((w) =>
      resumeContent.toLowerCase().includes(w)
    ).length;
    const contentScore = Math.min(actionCount * 5, 30);

    const totalScore = Math.min(
      Math.round(keywordScore + formattingScore + contentScore),
      100
    );

    const improvements: string[] = [];
    if (keywordScore < 20)
      improvements.push(
        `Add more job-relevant keywords. Missing: ${missing
          .slice(0, 5)
          .join(", ")}`
      );
    if (formattingScore < 30)
      improvements.push(
        "Improve resume structure (contact info, experience, education, skills)."
      );
    if (contentScore < 15)
      improvements.push("Use more action verbs to describe achievements.");
    if (totalScore < 50)
      improvements.push("Tailor your resume more specifically to this job.");
    if (totalScore >= 80)
      improvements.push(
        "Great job! Your resume is well optimized for this position."
      );

    setIsAnalyzing(false);
    return {
      score: totalScore,
      improvements,
      matchedKeywords: matched.slice(0, 10),
      missingKeywords: missing.slice(0, 10),
    };
  };

  // ---------- Pick Document ----------
  const pickDocument = async (type: "resume" | "job") => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.length) {
        const asset = result.assets[0];
        const doc: DocumentResult = {
          name: asset.name,
          uri: asset.uri,
          mimeType: asset.mimeType || "application/octet-stream",
        };
        type === "resume" ? setResumeFile(doc) : setJobDescriptionFile(doc);

        if (
          asset.mimeType?.startsWith("text/") ||
          asset.name.toLowerCase().endsWith(".txt")
        ) {
          const content = await FileSystem.readAsStringAsync(asset.uri);
          type === "resume"
            ? setResumeText(content)
            : setJobDescriptionText(content);
        }
      }
    } catch (e) {
      Alert.alert("Error", "Failed to pick document");
    }
  };

  // ---------- Run ATS ----------
  const runATSAnalysis = async () => {
    if (!resumeText || !jobDescriptionText) {
      Alert.alert("Error", "Please upload both resume and job description");
      return;
    }
    const analysis = await analyzeATS(resumeText, jobDescriptionText);
    setAtsAnalysis(analysis);
  };

  // ---------- Run Grok AI ----------
  const analyzeWithGrokAI = async () => {
    if (!resumeText || !jobDescriptionText) {
      Alert.alert("Error", "Please upload both resume and job description");
      return;
    }

    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const completion = await grokAI.chat.completions.create({
        model: "grok/gemini-2.5", // Replace with your Grok model
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this resume for this job description:\n\n${jobDescriptionText}\n\nResume:\n${resumeText}`,
              },
            ],
          },
        ],
      });

      const aiMessage =
        completion.choices[0].message?.content?.[0]?.text || "No response";
      setAiResponse(aiMessage);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", "Failed to get AI analysis from Grok AI");
    } finally {
      setIsAiLoading(false);
    }
  };

  // ---------- Preview ----------
  const renderPreview = (file: DocumentResult | null, type: string) => {
    if (!file) return null;
    if (file.mimeType.startsWith("image/"))
      return <Image source={{ uri: file.uri }} style={styles.imagePreview} />;
    if (
      file.mimeType.startsWith("text/") ||
      file.name.toLowerCase().endsWith(".txt")
    ) {
      const content = type === "resume" ? resumeText : jobDescriptionText;
      return (
        <ScrollView style={styles.textContainer}>
          <Text style={styles.textPreview}>{content}</Text>
        </ScrollView>
      );
    }
    return (
      <WebView
        source={{ uri: file.uri }}
        style={styles.webview}
        originWhitelist={["*"]}
        startInLoadingState
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>ATS Resume Checker</Text>
        <Text style={styles.subtitle}>
          Upload your resume and job description to get ATS score and AI
          suggestions
        </Text>

        {/* Resume Upload */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>📄 Upload Resume</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickDocument("resume")}
          >
            <FontAwesome name="upload" size={16} color="#fff" />
            <Text style={styles.buttonText}>
              {resumeFile
                ? `Change Resume (${resumeFile.name})`
                : "Upload Resume"}
            </Text>
          </TouchableOpacity>
          {resumeFile && (
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>📎 {resumeFile.name}</Text>
              {renderPreview(resumeFile, "resume")}
            </View>
          )}
        </View>

        {/* Job Description Upload */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>📋 Upload Job Description</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickDocument("job")}
          >
            <FontAwesome name="upload" size={16} color="#fff" />
            <Text style={styles.buttonText}>
              {jobDescriptionFile
                ? `Change Job Description (${jobDescriptionFile.name})`
                : "Upload Job Description"}
            </Text>
          </TouchableOpacity>
          {jobDescriptionFile && (
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>📎 {jobDescriptionFile.name}</Text>
              {renderPreview(jobDescriptionFile, "job")}
            </View>
          )}
        </View>

        {/* Manual Input */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>
            ✍️ Or Enter Job Description Manually
          </Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Paste the job description here..."
            value={jobDescriptionText}
            onChangeText={setJobDescriptionText}
            numberOfLines={6}
          />
        </View>

        {/* Analyze Buttons */}
        <TouchableOpacity
          style={[
            styles.analyzeButton,
            (!resumeText || !jobDescriptionText) && styles.disabledButton,
          ]}
          onPress={runATSAnalysis}
          disabled={!resumeText || !jobDescriptionText || isAnalyzing}
        >
          <FontAwesome name="search" size={16} color="#fff" />
          <Text style={styles.analyzeButtonText}>
            {isAnalyzing ? "Analyzing..." : "Analyze ATS Score"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.analyzeButton,
            (!resumeText || !jobDescriptionText) && styles.disabledButton,
          ]}
          onPress={analyzeWithGrokAI}
          disabled={!resumeText || !jobDescriptionText || isAiLoading}
        >
          <FontAwesome name="robot" size={16} color="#fff" />
          <Text style={styles.analyzeButtonText}>
            {isAiLoading ? "AI Analyzing..." : "Analyze with Grok AI"}
          </Text>
        </TouchableOpacity>

        {/* ATS Results */}
        {atsAnalysis && (
          <View style={styles.resultContainer}>
            <View style={styles.scoreHeader}>
              <Text style={styles.scoreTitle}>ATS Score</Text>
              <Text
                style={[
                  styles.score,
                  {
                    color:
                      atsAnalysis.score >= 75
                        ? "#4CAF50"
                        : atsAnalysis.score >= 50
                        ? "#FF9800"
                        : "#F44336",
                  },
                ]}
              >
                {atsAnalysis.score}/100
              </Text>
            </View>

            <View style={styles.scoreBar}>
              <View
                style={[
                  styles.scoreFill,
                  {
                    width: `${atsAnalysis.score}%`,
                    backgroundColor:
                      atsAnalysis.score >= 75
                        ? "#4CAF50"
                        : atsAnalysis.score >= 50
                        ? "#FF9800"
                        : "#F44336",
                  },
                ]}
              />
            </View>

            <Text style={styles.improveTitle}>💡 Improvement Suggestions:</Text>
            {atsAnalysis.improvements.map((item, i) => (
              <View key={i} style={styles.improvementItem}>
                <Text style={styles.improvementBullet}>•</Text>
                <Text style={styles.improvement}>{item}</Text>
              </View>
            ))}

            {atsAnalysis.matchedKeywords.length > 0 && (
              <View style={styles.keywordsSection}>
                <Text style={styles.keywordsTitle}>✅ Matched Keywords:</Text>
                <View style={styles.keywordsContainer}>
                  {atsAnalysis.matchedKeywords.map((k, i) => (
                    <Text key={i} style={styles.keywordTag}>
                      {k}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {atsAnalysis.missingKeywords.length > 0 && (
              <View style={styles.keywordsSection}>
                <Text style={styles.keywordsTitle}>❌ Missing Keywords:</Text>
                <View style={styles.keywordsContainer}>
                  {atsAnalysis.missingKeywords.map((k, i) => (
                    <Text key={i} style={styles.missingKeywordTag}>
                      {k}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* AI Results */}
        {aiResponse && (
          <View style={styles.resultContainer}>
            <Text style={styles.improveTitle}>🤖 Grok AI Suggestions:</Text>
            <Text style={{ fontSize: 16, color: "#333", lineHeight: 22 }}>
              {aiResponse}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff", padding: 16 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#1976d2",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 22,
  },
  uploadSection: {
    marginBottom: 25,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#1976d2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  fileInfo: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f8f9ff",
    borderRadius: 8,
  },
  fileName: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#1976d2",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  analyzeButton: {
    backgroundColor: "#2196f3",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  disabledButton: { backgroundColor: "#ccc" },
  analyzeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },
  resultContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  scoreTitle: { fontSize: 20, fontWeight: "bold", color: "#1976d2" },
  score: { fontSize: 32, fontWeight: "bold" },
  scoreBar: {
    height: 8,
    backgroundColor: "#e3f2fd",
    borderRadius: 4,
    marginBottom: 20,
  },
  scoreFill: { height: "100%", borderRadius: 4 },
  improveTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
    color: "#1976d2",
  },
  improvementItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  improvementBullet: {
    fontSize: 16,
    marginRight: 8,
    color: "#1976d2",
    fontWeight: "bold",
  },
  improvement: { fontSize: 16, flex: 1, color: "#333", lineHeight: 22 },
  keywordsSection: { marginTop: 20 },
  keywordsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1976d2",
  },
  keywordsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  keywordTag: {
    backgroundColor: "#e3f2fd",
    color: "#1565c0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  missingKeywordTag: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 8,
  },
  webview: { height: 200, borderRadius: 8 },
  textContainer: {
    maxHeight: 200,
    borderRadius: 8,
    backgroundColor: "#f8f9ff",
  },
  textPreview: { fontSize: 14, color: "#333", padding: 12, lineHeight: 20 },
});
