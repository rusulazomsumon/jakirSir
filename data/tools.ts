export interface Tool {
  id: string;
  label: string;
  icon: string;
  color: string;
  liveBadge?: string;
  link: string;
}

export const tools: Tool[] = [
  {
    id: "mcq",
    label: "MCQ",
    icon: "ri-file-list-3-line",
    color: "#8B5CF6",
    liveBadge: "Live MCQ",
    link: "#mockTestSection",
  },
  {
    id: "question-bank",
    label: "প্রশ্নব্যাংক",
    icon: "ri-book-open-line",
    color: "#2563EB",
    link: "/question-bank",
  },
  {
    id: "mock-test",
    label: "মক টেস্ট",
    icon: "ri-checkbox-circle-line",
    color: "#22C55E",
    link: "/mock-test",
  },
  {
    id: "books",
    label: "বইপত্র",
    icon: "ri-file-pdf-line",
    color: "#EF4444",
    link: "#jakirsLibrary",
  },
  {
    id: "all-courses",
    label: "সব কোর্স",
    icon: "ri-graduation-cap-line",
    color: "#F97316",
    link: "/all-courses",
  },
  {
    id: "gk",
    label: "GK",
    icon: "ri-global-line",
    color: "#06B6D4",
    link: "#",
  },
  {
    id: "math",
    label: "Math",
    icon: "ri-calculator-line",
    color: "#10B981",
    link: "#",
  },
  {
    id: "english",
    label: "English",
    icon: "ri-english-input",
    color: "#3B82F6",
    link: "#",
  },
  {
    id: "vocabulary",
    label: "Vocabulary",
    icon: "ri-translate-2",
    color: "#9333EA",
    link: "#",
  },
  {
    id: "routine",
    label: "Routine",
    icon: "ri-calendar-event-line",
    color: "#DC2626",
    link: "#routineSection",
  },
];
