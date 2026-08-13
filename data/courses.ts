export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  students: number;
  price: string;
  badge?: string;
  image: string;
  ctaLabel: string;
  link: string;
}

export const popularCourses: Course[] = [
  {
    id: "bank-online-combo",
    title: "Bank Online Combo MCQ + Written",
    description: "Live Class • Recorded Video • MCQ • PDF",
    category: "Bank",
    duration: "180 Days",
    students: 0,
    price: "৳2499",
    badge: undefined,
    image: "images/coursePic/bankOnlineComboMCQWritten.png",
    ctaLabel: "Enroll Now",
    link: "/courses/bank-online-combo",
  },
  {
    id: "bank-english-paid-course",
    title: "Bank Job English Paid Course",
    description: "Live Class • Recorded Video • MCQ • PDF",
    category: "English",
    duration: "90 Days",
    students: 0,
    price: "৳1299",
    badge: undefined,
    image: "images/coursePic/bankJobEnglishPaidCourse.png",
    ctaLabel: "Enroll Now",
    link: "/courses/bank-english-paid",
  },
  {
    id: "nibondhon-course",
    title: "নিবন্ধন কোর্স",
    description: "Live Class • Recorded Video • MCQ • PDF",
    category: "Govt",
    duration: "120 Days",
    students: 0,
    price: "৳1999",
    badge: undefined,
    image: "images/coursePic/nibondhonCourse.png",
    ctaLabel: "Enroll Now",
    link: "/courses/nibondhon",
  },
  {
    id: "somajseba-health",
    title: "সমাজসেবা ও স্বাস্থ্য সহকারী",
    description: "Live Class • Recorded Video • MCQ • PDF",
    category: "Health",
    duration: "60 Days",
    students: 0,
    price: "৳899",
    badge: undefined,
    image: "images/coursePic/somajsebaShasthoSohokari.png",
    ctaLabel: "Enroll Now",
    link: "/courses/somajseba-health",
  },
  {
    id: "sebamulok-nibondhon",
    title: "সেবামূলক নিবন্ধন কোর্স",
    description: "Live Class • Recorded Video • MCQ • PDF",
    category: "Govt",
    duration: "80 Days",
    students: 0,
    price: "৳1099",
    badge: undefined,
    image: "images/coursePic/sebamulokNibondhonCourse.png",
    ctaLabel: "Enroll Now",
    link: "/courses/sebamulok-nibondhon",
  },
];

export const runningCourses: Course[] = [
  {
    id: "nibondhon-special",
    title: "নিবন্ধন স্পেশাল কোর্স",
    description: "SPECIAL ব্যাচ",
    category: "SPECIAL",
    duration: "2-3 Months",
    students: 3240,
    price: "৳৯৯৯",
    badge: "SPECIAL",
    image: "images/coursePic/nibondhonCourse.png",
    ctaLabel: "Enroll",
    link: "/courses/nibondhon-special",
  },
  {
    id: "bank-batch-2026",
    title: "ব্যাংক ব্যাচ-২০২৬ (০১)",
    description: "LIVE ব্যাচ",
    category: "LIVE",
    duration: "4 Months+",
    students: 5120,
    price: "৳২৪৯৯",
    badge: "LIVE",
    image: "images/coursePic/bankOnlineComboMCQWritten.png",
    ctaLabel: "Enroll",
    link: "/courses/bank-batch-2026",
  },
  {
    id: "somajseba-swasthya-combined",
    title: "সমাজসেবা ও স্বাস্থ্যকর্মী কম্বাইন্ড ব্যাচ",
    description: "COMBINED ব্যাচ",
    category: "COMBINED",
    duration: "3 Months+",
    students: 4180,
    price: "৳১৪৯৯",
    badge: "COMBINED",
    image: "images/coursePic/somajsebaShasthoSohokari.png",
    ctaLabel: "Enroll",
    link: "/courses/somajseba-swasthya-combined",
  },
];
