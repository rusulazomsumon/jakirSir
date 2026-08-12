export interface QuestionBankItem {
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

export interface QuestionBankTab {
  id: string;
  label: string;
  description: string;
  items: QuestionBankItem[];
}

export const questionBankTabs: QuestionBankTab[] = [
  {
    id: "bank-ad",
    label: "ব্যাংক এডি",
    description: "Bank AD Exam",
    items: [
      {
        id: "bangladesh-bank-ad-26",
        title: "বাংলাদেশ ব্যাংক AD ২৬",
        subtitle: "বিশেষজ্ঞ প্রশ্ন | ৫০+ MCQ",
        link: "#",
      },
      {
        id: "sonali-bank-ad-2025",
        title: "সোনালী ব্যাংক AD ২০২৫",
        subtitle: "মূল প্রশ্ন | ৪০+ MCQ",
        link: "#",
      },
      {
        id: "jonota-bank-ad-2024",
        title: "জনতা ব্যাংক AD ২০২৪",
        subtitle: "সম্পূর্ণ প্রশ্নব্যাংক | ৩৫+ MCQ",
        link: "#",
      },
      {
        id: "agrani-bank-ad-2023",
        title: "অগ্রণী ব্যাংক AD ২০২৩",
        subtitle: "গুরুত্বপূর্ণ প্রশ্ন | ৪৫+ MCQ",
        link: "#",
      },
      {
        id: "rupali-bank-ad-2023",
        title: "রূপালী ব্যাংক AD ২০২৩",
        subtitle: "নিয়মিত MCQ | ৩৮+ প্রশ্ন",
        link: "#",
      },
    ],
  },
  {
    id: "nibondhon",
    label: "শিক্ষক নিবন্ধন",
    description: "Shikhok Nibondhon",
    items: [
      {
        id: "shikkhok-nibondhon-2025",
        title: "শিক্ষক নিবন্ধন ২০২৫",
        subtitle: "সম্পূর্ণ সিলেবাস | ৬০+ MCQ",
        link: "#",
      },
      {
        id: "prothomik-sohokari-2024",
        title: "প্রাথমিক সহকারী ২০২৪",
        subtitle: "মূল প্রশ্ন | ৫৫+ MCQ",
        link: "#",
      },
      {
        id: "nibondhon-model-test-01",
        title: "নিবন্ধন মডেল টেস্ট ০১",
        subtitle: "মডেল প্রশ্ন | ৫০+ MCQ",
        link: "#",
      },
      {
        id: "nibondhon-model-test-02",
        title: "নিবন্ধন মডেল টেস্ট ০২",
        subtitle: "অনুশীলনী | ৫০+ MCQ",
        link: "#",
      },
      {
        id: "nibondhon-past-10-years",
        title: "নিবন্ধন বিগত ১০ বছর",
        subtitle: "Past Questions | ১০০+ MCQ",
        link: "#",
      },
    ],
  },
  {
    id: "grade-12-20",
    label: "১২–২০ গ্রেড",
    description: "Grade 12-20",
    items: [
      {
        id: "sorkari-chakri-12-20",
        title: "সরকারি চাকরি ১২–২০ গ্রেড",
        subtitle: "সম্পূর্ণ ব্যাংক | ৫৫+ MCQ",
        link: "#",
      },
      {
        id: "prothomik-shikkhok-niyog-2025",
        title: "প্রাথমিক শিক্ষক নিয়োগ ২০২৫",
        subtitle: "নিয়োগ বিজ্ঞপ্তি | ৪৫+ MCQ",
        link: "#",
      },
      {
        id: "somajseba-sohokari-2024",
        title: "সমাজসেবা সহকারী ২০২৪",
        subtitle: "প্রশ্নব্যাংক | ৪০+ MCQ",
        link: "#",
      },
      {
        id: "shastho-sohokari-2023",
        title: "স্বাস্থ্য সহকারী ২০২৩",
        subtitle: "গুরুত্বপূর্ণ প্রশ্ন | ৩৫+ MCQ",
        link: "#",
      },
      {
        id: "sebamulok-nibondhon-2024",
        title: "সেবামূলক নিবন্ধন ২০২৪",
        subtitle: "MCQ Pattern | ৫০+ প্রশ্ন",
        link: "#",
      },
    ],
  },
  {
    id: "bcs",
    label: "বিসিএস",
    description: "BCS",
    items: [
      {
        id: "bcs-preliminary-2025",
        title: "বিসিএস প্রিলিমিনারি ২০২৫",
        subtitle: "সম্পূর্ণ ব্যাংক | ৭০+ MCQ",
        link: "#",
      },
      {
        id: "bcs-muktijuddho-r-state-policy",
        title: "বিসিএস মুক্তিযুদ্ধ ও রাষ্ট্রনীতি",
        subtitle: "বিশেষ MCQ | ৫০+ প্রশ্ন",
        link: "#",
      },
      {
        id: "bcs-bangladesh-bisho-boli",
        title: "বিসিএস বাংলাদেশ বিষয়াবলি",
        subtitle: "Past Questions | ৬০+ MCQ",
        link: "#",
      },
      {
        id: "bcs-international-affairs",
        title: "বিসিএস আন্তর্জাতিক বিষয়াবলি",
        subtitle: "Important MCQ | ৪৫+ প্রশ্ন",
        link: "#",
      },
      {
        id: "bcs-math-science",
        title: "বিসিএস গণিত ও বিজ্ঞান",
        subtitle: "Math & Science | ৫৫+ MCQ",
        link: "#",
      },
    ],
  },
];
