export interface LessonStep {
  title: string;
  content: string;
  example: string;
  task: string;
  solution: string;
}

export interface LessonData {
  lessonName: string;
  description: string;
  steps: LessonStep[];
}