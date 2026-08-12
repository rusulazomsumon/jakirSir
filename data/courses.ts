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
    id: "bank-jobs-bondho-sim",
    title: "Bank Jobs Bondho Sim Offer",
    description: "LIVE ব্যাচ",
    category: "LIVE",
    duration: "6 Months",
    students: 5240,
    price: "৳1999",
    badge: "LIVE",
    image: "images/coursePic/bankJobsBondhoSimOfferCourse.png",
    ctaLabel: "Enroll",
    link: "/courses/bank-jobs-bondho-sim",
  },
  {
    id: "somajseba-sohokari",
    title: "সমাজসেবা সহকারী কোর্স",
    description: "HOT ব্যাচ",
    category: "HOT",
    duration: "4 Months",
    students: 3100,
    price: "৳1499",
    badge: "HOT",
    image: "images/coursePic/somajsebaSohokariCourse.png",
    ctaLabel: "Enroll",
    link: "/courses/somajseba-sohokari",
  },
  {
    id: "shastho-sohokari",
    title: "স্বাস্থ্য সহকারী কোর্স",
    description: "NEW ব্যাচ",
    category: "NEW",
    duration: "5 Months",
    students: 2700,
    price: "৳1699",
    badge: "NEW",
    image: "images/coursePic/somajsebaShasthoSohokari.png",
    ctaLabel: "Enroll",
    link: "/courses/shastho-sohokari",
  },
  {
    id: "nibondhon-running",
    title: "নিবন্ধন কোর্স",
    description: "TOP ব্যাচ",
    category: "TOP",
    duration: "2 Months",
    students: 4300,
    price: "৳999",
    badge: "TOP",
    image: "images/coursePic/nibondhonCourse.png",
    ctaLabel: "Enroll",
    link: "/courses/nibondhon-running",
  },
];
