import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Svg, {
  Line,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = 90;
const MARGIN_H = 40;
const LINE_COLOR = "#FFE5B4";

const Level = ({
  level,
  levelIndex,
  sectionIndex,
  isLastInSection,
  handleLevelPress,
  pulseAnim,
  floatingAnim,
}) => {
  const isLeft = levelIndex % 2 === 0;
  const currentX = isLeft
    ? MARGIN_H + BUTTON_SIZE / 2
    : width - MARGIN_H - BUTTON_SIZE / 2;
  const isCurrentLevel = !level.completed && !level.locked;

  // Render decorative elements in blank spaces
  const renderDecorations = () => {
    // Only add decorations to some positions to avoid clutter
    if (levelIndex % 2 !== 0) return null;

    const decorationTypes = ["cloud", "star", "book", "lightbulb"];
    const decorationType =
      decorationTypes[(sectionIndex + levelIndex) % decorationTypes.length];

    return (
      <Animated.View
        style={[
          styles.decoration,
          {
            [isLeft ? "right" : "left"]: 40,
            top: 10,
            opacity: floatingAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1],
            }),
            transform: [
              {
                translateY: floatingAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 5],
                }),
              },
            ],
          },
        ]}
      >
        {decorationType === "cloud" && (
          <FontAwesome5 name="cloud" size={40} color="#FFE5B4" />
        )}
        {decorationType === "star" && (
          <FontAwesome5 name="star" size={40} color="#FF8C00" />
        )}
        {decorationType === "book" && (
          <FontAwesome5 name="book" size={40} color="#FF8C00" />
        )}
        {decorationType === "lightbulb" && (
          <MaterialIcons name="lightbulb-outline" size={40} color="#FF8C00" />
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.levelRow}>
      {/* Connector to next level */}
      {!isLastInSection && (
        <Svg height={100} width={width} style={styles.connector}>
          <Defs>
            <LinearGradient
              id={`gradient-${level.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor={isLeft ? level.color : LINE_COLOR} />
              <Stop
                offset="100%"
                stopColor={isLeft ? LINE_COLOR : level.color}
              />
            </LinearGradient>
          </Defs>
          <Line
            x1={currentX}
            y1={BUTTON_SIZE / 2}
            x2={
              isLeft
                ? width - MARGIN_H - BUTTON_SIZE / 2
                : MARGIN_H + BUTTON_SIZE / 2
            }
            y2={100}
            stroke={level.completed ? `url(#gradient-${level.id})` : LINE_COLOR}
            strokeWidth="3"
            strokeDasharray={level.completed ? "0" : "6,6"}
          />
        </Svg>
      )}

      {/* Level indicator dot */}
      <View style={[styles.levelIndicator, { left: currentX - 6 }]}>
        <Svg height="12" width="12">
          <Circle
            cx="6"
            cy="6"
            r="5"
            fill={level.completed ? level.color : "#fff"}
            stroke={level.color}
            strokeWidth="2"
          />
          {isCurrentLevel && (
            <Animated.View
              style={[
                styles.pulseEffect,
                {
                  transform: [{ scale: pulseAnim }],
                  backgroundColor: level.color,
                },
              ]}
            />
          )}
        </Svg>
      </View>

      {/* Decorative elements in blank spaces */}
      {renderDecorations()}

      {/* Level button */}
      <View
        style={[
          styles.levelWrapper,
          isLeft ? styles.alignLeft : styles.alignRight,
        ]}
      >
        <Animated.View
          style={[
            isCurrentLevel && {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.levelButton,
              level.completed && styles.completedButton,
              level.locked && styles.lockedButton,
              { borderColor: level.color },
            ]}
            onPress={() => handleLevelPress(level)}
            disabled={level.locked}
            activeOpacity={0.7}
          >
            {/* Gradient background for completed levels */}
            {level.completed && (
              <Svg
                height="100%"
                width="100%"
                style={StyleSheet.absoluteFillObject}
              >
                <Defs>
                  <LinearGradient
                    id={`button-gradient-${level.id}`}
                    x1="0%"
                    y1="20%"
                    x2="100%"
                    y2="100%"
                  >
                    <Stop offset="0%" stopColor={level.gradient[0]} />
                    <Stop offset="100%" stopColor={level.gradient[1]} />
                  </LinearGradient>
                </Defs>
                <Circle
                  cx={BUTTON_SIZE / 2}
                  cy={BUTTON_SIZE / 2}
                  r={BUTTON_SIZE / 2}
                  fill={`url(#button-gradient-${level.id})`}
                />
              </Svg>
            )}
            <View
              style={[
                styles.levelButtonContent,
                level.completed && styles.levelButtonCompleted,
              ]}
            >
              {level.locked ? (
                <FontAwesome5 name="lock" size={24} color="#ccc" />
              ) : level.completed ? (
                <FontAwesome5 name="check" size={24} color="#fff" />
              ) : level.type === "Beginner" ? (
                <FontAwesome5 name={level.icon} size={24} color={level.color} />
              ) : level.type === "Intermediate" ? (
                <MaterialIcons
                  name={level.icon}
                  size={26}
                  color={level.color}
                />
              ) : (
                <FontAwesome5 name={level.icon} size={24} color={level.color} />
              )}
              <Text
                style={[
                  styles.levelText,
                  level.completed && styles.completedText,
                  level.locked && styles.lockedText,
                ]}
              >
                Level {level.id}
              </Text>
              <Text style={styles.pointsText}>{level.points} pts</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  levelRow: {
    marginVertical: 10,
    minHeight: 90,
    position: "relative",
  },
  connector: {
    position: "absolute",
    top:20,
    left:0,
  },
  levelIndicator: {
    position: "absolute",
    top: BUTTON_SIZE / 2 - 6,
    zIndex: 5,
  },
  pulseEffect: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 10,
    opacity: 0.5,
    zIndex: -1,
  },
  levelWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  alignLeft: {
    justifyContent: "flex-start",
    paddingLeft: MARGIN_H,
  },
  alignRight: {
    justifyContent: "flex-end",
    paddingRight: MARGIN_H,
  },
  levelButton: {
    backgroundColor: "#fff",
    borderRadius: BUTTON_SIZE / 2,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#FF8C00",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderWidth: 3,
    overflow: "hidden",
  },
  levelButtonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  levelButtonCompleted: {
    backgroundColor: "transparent",
  },
  completedButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  lockedButton: {
    backgroundColor: "#FFE5B4",
    borderColor: "#FFD700",
  },
  levelText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "#FF8C00",
    textAlign: "center",
  },
  pointsText: {
    fontSize: 0,
    fontWeight: "600",
    color: "#FF8C00",
    marginTop: 2,
  },
  completedText: {
    color: "#fff",
  },
  lockedText: {
    color: "#FFA500",
  },
  decoration: {
    position: "absolute",
    zIndex: 1,
  },
});

export default Level;
