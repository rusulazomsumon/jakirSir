export interface MCQ {
  question: string;
  options: string[];
  answer: number;
  explain?: string;
}

export interface Subject {
  name: string;
  topics: Record<string, MCQ[]>;
}

export const liveMcqData: Record<string, Subject> = {
  bangla: {
    name: "বাংলা",
    topics: {
      সমাস: [
        { question: "\"রামের নাম\" কোন ধরনের সমাস?", options: ["ততপুরুষ সমাস", "বহুব্রীহি সমাস", "দ্বন্দ্ব সমাস", "কর্মধারয় সমাস"], answer: 0 },
        { question: "\"পানিখেলো\" কোন ধরনের সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "কর্মধারয়"], answer: 1 },
        { question: "\"রামের বই\" কোন সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "অব্যয়ীভাব"], answer: 0 },
        { question: "\"সূর্যকিরণ\" কোন সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "কর্মধারয়"], answer: 1 },
        { question: "\"কবিকবি\" কোন সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "অব্যয়ীভাব"], answer: 3 },
      ],
      সন্ধি: [
        { question: "\"শীত + আসন\" = ?", options: ["শীতাসন", "শীত্র আসন", "শীতরাসন", "শীত আসন"], answer: 0 },
        { question: "\"দুই + খান\" = ?", options: ["দুইখান", "দ্বিখান", "দুইখ্যান", "দ্বিখান"], answer: 1 },
        { question: "\"আমি + ছিলাম\" = ?", options: ["আমিচিলাম", "আমিছিলাম", "আমি ছিলাম", "আমি ছিলাম"], answer: 1 },
        { question: "\"তুমি + কর\" = ?", options: ["তুমিকর", "তুম্বকর", "তুমি কর", "তুমিক্র"], answer: 1 },
        { question: "\"সে + আইছে\" = ?", options: ["সেইছে", "সে আইছে", "সেইচে", "সেইছে"], answer: 0 },
      ],
      "বাংলা ব্যাকরণ": [
        { question: "বাংলা ব্যাকরণের পুরোপুরি নাম কী?", options: ["বঙ্গব্যাকরণ", "বাংলা ব্যাকরণ", "বঙ্গভাষা ব্যাকরণ", "বাংলা শব্দের ব্যাকরণ"], answer: 0 },
        { question: "কোনটি সমাস নয়?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "বিশেষণ"], answer: 3 },
        { question: "\"ছোটবড়\" কোন শব্দ?", options: ["বিশেষণ", "বিশেষণ সমেস", "ক্রিয়া", "ব্যাতিপর"], answer: 1 },
        { question: "সর্বনাম কয় ধরণের?", options: ["৩", "৪", "৫", "৬"], answer: 2 },
        { question: "\"খেলাধুলা\" কোন শব্দের ধাতু?", options: ["খেল", "ধুল", "খেলাধ", "দুল"], answer: 1 },
      ],
    },
  },
  english: {
    name: "ইংরেজি",
    topics: {
      Grammar: [
        { question: "Choose the correct tense: She ____ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1 },
        { question: "He ____ football yesterday.", options: ["play", "plays", "played", "playing"], answer: 2 },
        { question: "They ____ here for 5 years.", options: ["live", "lives", "are living", "have lived"], answer: 3 },
        { question: "I ____ my homework before dinner.", options: ["finish", "finished", "had finished", "have finished"], answer: 2 },
        { question: "By next year, I ____ my degree.", options: ["complete", "will complete", "will have completed", "am completing"], answer: 2 },
      ],
      Vocabulary: [
        { question: "Synonym of 'Benevolent':", options: ["Cruel", "Kind-hearted", "Selfish", "Rude"], answer: 1 },
        { question: "Antonym of 'Abundant':", options: ["Plentiful", "Scarce", "Rich", "Full"], answer: 1 },
        { question: "Meaning of 'Epitome':", options: ["Summary", "Perfect example", "Criticism", "Praise"], answer: 1 },
        { question: "Synonym of 'Pragmatic':", options: ["Idealistic", "Practical", "Theoretical", "Absurd"], answer: 1 },
        { question: "Antonym of 'Candid':", options: ["Frank", "Honest", "Deceitful", "Sincere"], answer: 2 },
      ],
    },
  },
  math: {
    name: "গণিত",
    topics: {
      Percentage: [
        { question: "৫০ এর ২০% কত?", options: ["৫", "১০", "১৫", "২০"], answer: 1 },
        { question: "৮০ এর ২৫% কত?", options: ["১৫", "২০", "২৫", "৩০"], answer: 1 },
        { question: "প্রথম ১০ ফিবোনাচ্চি সংখ্যার যোগফল কত?", options: ["৫৫", "৫৩", "৫১", "৫৯"], answer: 1 },
        { question: "একটি ত্রিভুজের তিন কোণের সমষ্টি কত?", options: ["৯০°", "১৮০°", "২৭০°", "৩৬০°"], answer: 1 },
        { question: "৪৫ + ৩৭ = ?", options: ["৭২", "৮২", "৯২", "১০২"], answer: 1 },
      ],
      Geometry: [
        { question: "বৃত্তের ব্যাস যদি 12 cm, ব্যাসার্ধ কত?", options: ["4 cm", "6 cm", "8 cm", "10 cm"], answer: 1 },
        { question: "আয়তক্ষেত্রের দৈর্ঘ্য 10 cm এবং উচ্চতা 5 cm, ক্ষেত্রফল কত?", options: ["50 cm²", "100 cm²", "150 cm²", "200 cm²"], answer: 0 },
        { question: "বর্গক্ষেত্রের breadth 8 cm, পরিসীমা কত?", options: ["24 cm", "32 cm", "40 cm", "48 cm"], answer: 1 },
        { question: "ত্রিভুজের একটি কোণ 90° হলে এটি কী?", options: ["সমকোণী ত্রিভুজ", "অসমকোণী ত্রিভুজ", "সমবহুভুজ ত্রিভুজ", "অসমবহুভুজ ত্রিভুজ"], answer: 0 },
        { question: "পিরামিডের base একটি বর্গক্ষেত্র, মোট পৃষ্ঠ কত?", options: ["৩", "৪", "৫", "৬"], answer: 2 },
      ],
    },
  },
  gk: {
    name: "সাধারণ জ্ঞান",
    topics: {
      Bangladesh: [
        { question: "বাংলাদেশের স্বাধীনতা ঘোষণা করা হয় কত সালে?", options: ["১৯৬৯", "১৯৭১", "১৯৭৫", "১৯৮০"], answer: 1 },
        { question: "বাংলাদেশের জাতীয় ফুল কী?", options: ["গোলাপ", "পদ্ম", "শাপলা", "সূর্যমুখী"], answer: 2 },
        { question: "বাংলাদেশের জাতীয় পক্ষী কী?", options: ["দোয়েল", "ময়ূর", "বাজ", "পাঁউরি"], answer: 0 },
        { question: "বাংলাদেশের রাজধানী কোনটি?", options: ["চট্টগ্রাম", "খুলনা", "ঢাকা", "রাজশাহী"], answer: 2 },
        { question: "বাংলাদেশের বৃহত্তম নদী কোনটি?", options: ["মেঘনা", "যমুনা", "ব্রহ্মপুত্র", "পদ্মা"], answer: 2 },
      ],
      World: [
        { question: "আন্তর্জাতিক শ্রেণিবিন্যাস দিন কত?", options: ["জুলাই ২৮", "অক্টোবর ২৪", "ডিসেম্বর ১০", "ফেব্রুয়ারি ২১"], answer: 1 },
        { question: "যুক্তরাষ্ট্রের মুদ্রা কী?", options: ["ডলার", "ইউরো", "পাউন্ড", "ইয়েন"], answer: 0 },
        { question: "কোন দেশে Meenakshi Amman Temple অবস্থিত?", options: ["নেপাল", "ভারত", "শ্রীলঙ্কা", "পাকিস্তান"], answer: 1 },
        { question: "যুক্তরাষ্ট্রের দুটি ন Carolyn capital?#", options: ["নিউইয়র্ক ও লস অ্যাঞ্জেলস", "ওয়াশিংটন ডিসি ও নিউইয়র্ক", "লস অ্যাঞ্জেলস ও চিকাগো", "হিউস্টন ও ফ্রান্সisco"], answer: 1 },
        { question: "অস্থায়ী সংস্থার সদরদপ্তর কোথায়?", options: ["জেনেভা", "নিউইয়র্ক", "প্যারিস", "লন্ডন"], answer: 1 },
      ],
    },
  },
  computer: {
    name: "কম্পিউটার",
    topics: {
      Hardware: [
        { question: "CPU এর পুরোপুরি নাম কী?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"], answer: 0 },
        { question: "RAM এর TYPE কী?", options: ["Read Only Memory", "Random Access Memory", "Run Access Memory", "Read All Memory"], answer: 1 },
        { question: "Hard Disk কিসের ধরনের?", options: ["Primary Memory", "Secondary Memory", "Cache Memory", "Register"], answer: 1 },
        { question: "কোনটি output ডিভাইস?", options: ["Keyboard", "Mouse", "Printer", "Scanner"], answer: 2 },
        { question: "Motherboard এর কাজ কী?", options: ["Process data", "Store data", "Connect all components", "Display output"], answer: 2 },
      ],
      Software: [
        { question: "OS এর পুরোপুরি নাম কী?", options: ["Operating Software", "Operating System", "Optical System", "Organized System"], answer: 1 },
        { question: "কোনটি operating system?", options: ["Microsoft Word", "Windows", "Photoshop", "Chrome"], answer: 1 },
        { question: "Compiler এর কাজ কী?", options: ["Execute program", "Translate high-level to machine", "Debug program", "Store data"], answer: 1 },
        { question: "Binary system এর base কত?", options: ["8", "10", "2", "16"], answer: 2 },
        { question: "1 Byte = কত Bit?", options: ["4", "8", "16", "32"], answer: 1 },
      ],
    },
  },
  bank: {
    name: "ব্যাংক",
    topics: {
      "Banking Awareness": [
        { question: "বাংলাদেশ ব্যাংক কবে প্রতিষ্ঠিত?", options: ["১৯৭১", "১৯৭২", "১৯৭৩", "১৯৭৫"], answer: 1 },
        { question: "সোনালী ব্যাংক PLC কবে প্রতিষ্ঠিত?", options: ["১৯৭০", "১৯৭২", "১৯৭৫", "১৯৯৫"], answer: 1 },
        { question: "অগ্রণী ব্যাংক Limited কবে প্রতিষ্ঠিত?", options: ["১৯৮৩", "১৯৮৫", "১৯৮৭", "১৯৮৯"], answer: 1 },
        { question: "রূপালী ব্যাংক Limited কবে প্রতিষ্ঠিত?", options: ["১৯৮৫", "১৯৮৬", "১৯৮৭", "১৯৮৮"], answer: 1 },
        { question: "জনতা ব্যাংক Limited কবে প্রতিষ্ঠিত?", options: ["১৯৮৬", "১৯৮৭", "১৯৮৮", "১৯৮৯"], answer: 1 },
      ],
      Accounting: [
        { question: "ডেবিট side কোন account এ increases?", options: ["Asset", "Liability", "Capital", "Income"], answer: 0 },
        { question: "ক্রেডিট side of Liability increases?", options: ["Debit", "Credit", "Both", "None"], answer: 1 },
        { question: "Revenue account এর balance final কী?", options: ["Debit", "Credit", "Both", "None"], answer: 1 },
        { question: "Capital = ?", options: ["Assets - Liabilities", "Liabilities - Assets", "Assets + Liabilities", "Assets × Liabilities"], answer: 0 },
        { question: "suspense account এর balance কিভাবে?", options: ["Debit", "Credit", "Both", "None"], answer: 2 },
      ],
    },
  },
};
