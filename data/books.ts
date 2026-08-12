export interface Book {
  id: string;
  title: string;
  type: "pdf" | "video";
  size?: string;
  price?: string;
  oldPrice?: string;
  badge?: "Paid" | "Free";
  image: string;
  description?: string;
  link: string;
}

export const books: Book[] = [
  {
    id: "bank-suggestions-book",
    title: "Bank Suggestions Book",
    type: "pdf",
    size: "",
    price: "৳150",
    oldPrice: "৳250",
    badge: "Paid",
    image: "images/books/bankSugetionsBook.png",
    link: "#",
  },
  {
    id: "bcs-preliminary-book",
    title: "BCS Preliminary Book",
    type: "pdf",
    size: "",
    price: "৳180",
    oldPrice: "৳300",
    badge: "Paid",
    image: "images/books/bcsPrili.png",
    link: "#",
  },
  {
    id: "english-exclusive-notes",
    title: "English Exclusive Notes",
    type: "pdf",
    size: "",
    price: "৳120",
    oldPrice: "৳200",
    badge: "Paid",
    image: "images/books/englishExclusiveNOtes.png",
    link: "#",
  },
  {
    id: "gk-book-jakir",
    title: "GK Book - Jakir Sir",
    type: "pdf",
    size: "",
    price: "৳100",
    oldPrice: "৳180",
    badge: "Paid",
    image: "images/books/gkJakir.png",
    link: "#",
  },
  {
    id: "math-exclusive-notes",
    title: "Math Exclusive Notes",
    type: "pdf",
    size: "",
    price: "৳140",
    oldPrice: "৳220",
    badge: "Paid",
    image: "images/books/mathExclusiveNotes.png",
    link: "#",
  },
  {
    id: "shikhok-nibondhon-exclusive",
    title: "Shikhok Nibondhon Exclusive",
    type: "pdf",
    size: "",
    price: "৳160",
    oldPrice: "৳260",
    badge: "Paid",
    image: "images/books/shikhokNibondhonExclusive.png",
    link: "#",
  },
];

export const videos: Book[] = [
  {
    id: "bank-job-prostuti",
    title: "ব্যাংক জব প্রস্তুতি",
    type: "video",
    description: "Jakir Sir এর ব্যাংক জব প্রস্তুতির সম্পূর্ণ গাইডলাইন।",
    image: "images/YouTube/bankJobProstuti.png",
    link: "https://www.youtube-nocookie.com/embed/1xwpYM7VekE",
  },
  {
    id: "bcs-gonit-30-dine",
    title: "BCS গণিত প্রস্তুতি ৩০ দিনে",
    type: "video",
    description: "",
    image: "images/YouTube/jakirJobAcademyMath.png",
    link: "https://www.youtube-nocookie.com/embed/p1ASn5q40UM",
  },
  {
    id: "bangladesh-bank-mcq",
    title: "বাংলাদেশ ব্যাংক MCQ গুরুত্বপূর্ণ প্রশ্ন",
    type: "video",
    description: "",
    image: "images/YouTube/bankBCSPrimaryNibondhon.png",
    link: "https://www.youtube-nocookie.com/embed/FSL4zvc6qQQ",
  },
  {
    id: "english-vocabulary-15-min",
    title: "ইংরেজি Vocabulary মনে রাখার সহজ উপায়",
    type: "video",
    description: "",
    image: "images/YouTube/englishVocabulary.png",
    link: "https://www.youtube-nocookie.com/embed/daNJmZf4ym0",
  },
];
