/*=========================================================
    Jakir Sir SMART Edu Portal
    app.js
    All content is hardcoded in index.html
    This file only handles Swiper and UI interactions
=========================================================*/


"use strict";

const showToast = (type, message) => {
    window.dispatchEvent(new CustomEvent('sonner-toast', {
        detail: { type, message }
    }))
}

/*=========================================================
                APP
=========================================================*/

const App = {

    init() {

        this.initHeroSwiper();

        this.initCourseSwiper();

        this.initPopularSwiper();

        console.log("SMART Edu Portal Initialized");

    }

};



/*=========================================================
                HERO SWIPER
=========================================================*/

App.initHeroSwiper = function () {

    new Swiper(".heroSwiper", {

        loop: true,

        speed: 700,

        spaceBetween: 0,

        autoplay: {

            delay: 3500,

            disableOnInteraction: false

        },

        pagination: {

            el: ".swiper-pagination",

            clickable: true

        },

        effect: "slide"

    });

};





/*=========================================================
            RUNNING COURSE SWIPER
=========================================================*/

App.initCourseSwiper = function () {

    new Swiper(".courseSwiper", {

        slidesPerView: 1.15,

        spaceBetween: 12,

        freeMode: true,

        grabCursor: true,

        breakpoints: {

            768: {

                slidesPerView: 2.5,

                spaceBetween: 16

            },

            1200: {

                slidesPerView: 3.5,

                spaceBetween: 20

            }

        }

    });

};





/*=========================================================
            POPULAR COURSE SWIPER
=========================================================*/

App.initPopularSwiper = function () {

    new Swiper(".popularSwiper", {

        slidesPerView: 1.15,

        spaceBetween: 12,

        freeMode: true,

        grabCursor: true,

        breakpoints: {

            768: {

                slidesPerView: 2.5,

                spaceBetween: 16

            },

            1200: {

                slidesPerView: 3.5,

                spaceBetween: 20

            }

        }

    });

};





/*=========================================================
            LIVE MCQ
=========================================================*/

const liveMcqData = {
    bangla: {
        name: "বাংলা",
        topics: {
            "সমাস": [
                { question: "\"রামের নাম\" কোন ধরনের সমাস?", options: ["ততপুরুষ সমাস", "বহুব্রীহি সমাস", "দ্বন্দ্ব সমাস", "কর্মধারয় সমাস"], answer: 0 },
                { question: "\"পানিখেলো\" কোন ধরনের সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "কর্মধারয়"], answer: 1 },
                { question: "\"রামের বই\" কোন সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "অব্যয়ীভাব"], answer: 0 },
                { question: "\"সূর্যকিরণ\" কোন সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "কর্মধারয়"], answer: 1 },
                { question: "\"কবিকবি\" কোন সমাস?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "অব্যয়ীভাব"], answer: 3 }
            ],
            "সন্ধি": [
                { question: "\"শীত + আসন\" = ?", options: ["শীতাসন", "শীত্র আসন", "শীতরাসন", "শীত আসন"], answer: 0 },
                { question: "\"দুই + খান\" = ?", options: ["দুইখান", "দ্বিখান", "দুইখ্যান", "দ্বিখান"], answer: 1 },
                { question: "\"আমি + ছিলাম\" = ?", options: ["আমিচিলাম", "আমিছিলাম", "আমি ছিলাম", "আমি ছিলাম"], answer: 1 },
                { question: "\"তুমি + কর\" = ?", options: ["তুমিকর", "তুম্বকর", "তুমি কর", "তুমিক্র"], answer: 1 },
                { question: "\"সে + আইছে\" = ?", options: ["সেইছে", "সে আইছে", "সেইচে", "সেইছে"], answer: 0 }
            ],
            "বাংলা ব্যাকরণ": [
                { question: "বাংলা ব্যাকরণের পুরোপুরি নাম কী?", options: ["বঙ্গব্যাকরণ", "বাংলা ব্যাকরণ", "বঙ্গভাষা ব্যাকরণ", "বাংলা শব্দের ব্যাকরণ"], answer: 0 },
                { question: "কোনটি সমাস নয়?", options: ["ততপুরুষ", "বহুব্রীহি", "দ্বন্দ্ব", "বিশেষণ"], answer: 3 },
                { question: "\"ছোটবড়\" কোন শব্দ?", options: ["বিশেষণ", "বিশেষণ সমেস", "ক্রিয়া", "ব্যাতিপর"], answer: 1 },
                { question: "সর্বনাম কয় ধরণের?", options: ["৩", "৪", "৫", "৬"], answer: 2 },
                { question: "\"খেলাধুলা\" কোন শব্দের ধাতু?", options: ["খেল", "ধুল", "খেলাধ", "দুল"], answer: 1 }
            ]
        }
    },
    english: {
        name: "ইংরেজি",
        topics: {
            "Grammar": [
                { question: "Choose the correct tense: She ____ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1 },
                { question: "He ____ football yesterday.", options: ["play", "plays", "played", "playing"], answer: 2 },
                { question: "They ____ here for 5 years.", options: ["live", "lives", "are living", "have lived"], answer: 3 },
                { question: "I ____ my homework before dinner.", options: ["finish", "finished", "had finished", "have finished"], answer: 2 },
                { question: "By next year, I ____ my degree.", options: ["complete", "will complete", "will have completed", "am completing"], answer: 2 }
            ],
            "Vocabulary": [
                { question: "Synonym of 'Benevolent':", options: ["Cruel", "Kind-hearted", "Selfish", "Rude"], answer: 1 },
                { question: "Antonym of 'Abundant':", options: ["Plentiful", "Scarce", "Rich", "Full"], answer: 1 },
                { question: "Meaning of 'Epitome':", options: ["Summary", "Perfect example", "Criticism", "Praise"], answer: 1 },
                { question: "Synonym of 'Pragmatic':", options: ["Idealistic", "Practical", "Theoretical", "Absurd"], answer: 1 },
                { question: "Antonym of 'Candid':", options: ["Frank", "Honest", "Deceitful", "Sincere"], answer: 2 }
            ]
        }
    },
    math: {
        name: "গণিত",
        topics: {
            "Percentage": [
                { question: "৫০ এর ২০% কত?", options: ["৫", "১০", "১৫", "২০"], answer: 1 },
                { question: "৮০ এর ২৫% কত?", options: ["১৫", "২০", "২৫", "৩০"], answer: 1 },
                { question: "প্রথম ১০ ফিবোনাচ্চি সংখ্যার যোগফল কত?", options: ["৫৫", "৫৩", "৫১", "৫৯"], answer: 1 },
                { question: "একটি ত্রিভুজের তিন কোণের সমষ্টি কত?", options: ["৯০°", "১৮০°", "২৭০°", "৩৬০°"], answer: 1 },
                { question: "৪৫ + ৩৭ = ?", options: ["৭২", "৮২", "৯২", "১০২"], answer: 1 }
            ],
            "Geometry": [
                { question: "বৃত্তের ব্যাস যদি 12 cm, ব্যাসার্ধ কত?", options: ["4 cm", "6 cm", "8 cm", "10 cm"], answer: 1 },
                { question: "আয়তক্ষেত্রের দৈর্ঘ্য 10 cm এবং উচ্চতা 5 cm, ক্ষেত্রফল কত?", options: ["50 cm²", "100 cm²", "150 cm²", "200 cm²"], answer: 0 },
                { question: "বর্গক্ষেত্রের breadth 8 cm, পরিসীমা কত?", options: ["24 cm", "32 cm", "40 cm", "48 cm"], answer: 1 },
                { question: "ত্রিভুজের একটি কোণ 90° হলে এটি কী?", options: ["সমকোণী ত্রিভুজ", "অসমকোণী ত্রিভুজ", "সমবহুভুজ ত্রিভুজ", "অসমবহুভুজ ত্রিভুজ"], answer: 0 },
                { question: "পিরামিডের base একটি বর্গক্ষেত্র, মোট পৃষ্ঠ কত?", options: ["৩", "৪", "৫", "৬"], answer: 2 }
            ]
        }
    },
    gk: {
        name: "সাধারণ জ্ঞান",
        topics: {
            "Bangladesh": [
                { question: "বাংলাদেশের স্বাধীনতা ঘোষণা করা হয় কত সালে?", options: ["১৯৬৯", "১৯৭১", "১৯৭৫", "১৯৮০"], answer: 1 },
                { question: "বাংলাদেশের জাতীয় ফুল কী?", options: ["গোলাপ", "পদ্ম", "শাপলা", "সূর্যমুখী"], answer: 2 },
                { question: "বাংলাদেশের জাতীয় পক্ষী কী?", options: ["দোয়েল", "ময়ূর", "বাজ", "পাঁউরি"], answer: 0 },
                { question: "বাংলাদেশের রাজধানী কোনটি?", options: ["চট্টগ্রাম", "খুলনা", "ঢাকা", "রাজশাহী"], answer: 2 },
                { question: "বাংলাদেশের বৃহত্তম নদী কোনটি?", options: ["মেঘনা", "যমুনা", "ব্রহ্মপুত্র", "পদ্মা"], answer: 2 }
            ],
            "World": [
                { question: "আন্তর্জাতিক শ্রেণিবিন্যাস দিন কত?", options: ["জুলাই ২৮", "অক্টোবর ২৪", "ডিসেম্বর ১০", "ফেব্রুয়ারি ২১"], answer: 1 },
                { question: "যুক্তরাষ্ট্রের মুদ্রা কী?", options: ["ডলার", "ইউরো", "পাউন্ড", "ইয়েন"], answer: 0 },
                { question: "কোন দেশে Meenakshi Amman Temple অবস্থিত?", options: ["নেপাল", "ভারত", "শ্রীলঙ্কা", "পাকিস্তান"], answer: 1 },
                { question: "যুক্তরাষ্ট্রের দুটি ন Carolyn capital?#", options: ["নিউইয়র্ক ও লস অ্যাঞ্জেলস", "ওয়াশিংটন ডিসি ও নিউইয়র্ক", "লস অ্যাঞ্জেলস ও চিকাগো", "হিউস্টন ও ফ্রান্সisco"], answer: 1 },
                { question: "অস্থায়ী সংস্থার সদরদপ্তর কোথায়?", options: ["জেনেভা", "নিউইয়র্ক", "প্যারিস", "লন্ডন"], answer: 1 }
            ]
        }
    },
    computer: {
        name: "কম্পিউটার",
        topics: {
            "Hardware": [
                { question: "CPU এর পুরোপুরি নাম কী?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"], answer: 0 },
                { question: "RAM এর TYPE কী?", options: ["Read Only Memory", "Random Access Memory", "Run Access Memory", "Read All Memory"], answer: 1 },
                { question: "Hard Disk কিসের ধরনের?", options: ["Primary Memory", "Secondary Memory", "Cache Memory", "Register"], answer: 1 },
                { question: "কোনটি output ডিভাইস?", options: ["Keyboard", "Mouse", "Printer", "Scanner"], answer: 2 },
                { question: "Motherboard এর কাজ কী?", options: ["Process data", "Store data", "Connect all components", "Display output"], answer: 2 }
            ],
            "Software": [
                { question: "OS এর পুরোপুরি নাম কী?", options: ["Operating Software", "Operating System", "Optical System", "Organized System"], answer: 1 },
                { question: "কোনটি operating system?", options: ["Microsoft Word", "Windows", "Photoshop", "Chrome"], answer: 1 },
                { question: "Compiler এর কাজ কী?", options: ["Execute program", "Translate high-level to machine", "Debug program", "Store data"], answer: 1 },
                { question: "Binary system এর base কত?", options: ["8", "10", "2", "16"], answer: 2 },
                { question: "1 Byte = কত Bit?", options: ["4", "8", "16", "32"], answer: 1 }
            ]
        }
    },
    bank: {
        name: "ব্যাংক",
        topics: {
            "Banking Awareness": [
                { question: "বাংলাদেশ ব্যাংক কবে প্রতিষ্ঠিত?", options: ["১৯৭১", "১৯৭২", "১৯৭৩", "১৯৭৫"], answer: 1 },
                { question: "সোনালী ব্যাংক PLC কবে প্রতিষ্ঠিত?", options: ["১৯৭০", "১৯৭২", "১৯৭৫", "১৯৯৫"], answer: 1 },
                { question: "অগ্রণী ব্যাংক Limited কবে প্রতিষ্ঠিত?", options: ["১৯৮৩", "১৯৮৫", "১৯৮৭", "১৯৮৯"], answer: 1 },
                { question: "রূপালী ব্যাংক Limited কবে প্রতিষ্ঠিত?", options: ["১৯৮৫", "১৯৮৬", "১৯৮৭", "১৯৮৮"], answer: 1 },
                { question: "জনতা ব্যাংক Limited কবে প্রতিষ্ঠিত?", options: ["১৯৮৬", "১৯৮৭", "১৯৮৮", "১৯৮৯"], answer: 1 }
            ],
            "Accounting": [
                { question: "ডেবিট side কোন account এ increases?", options: ["Asset", "Liability", "Capital", "Income"], answer: 0 },
                { question: "ক্রেডিট side of Liability increases?", options: ["Debit", "Credit", "Both", "None"], answer: 1 },
                { question: "Revenue account এর balance final Кињ类型?#", options: ["Debit", "Credit", "Both", "None"], answer: 1 },
                { question: "Capital = ?", options: ["Assets - Liabilities", "Liabilities - Assets", "Assets + Liabilities", "Assets × Liabilities"], answer: 0 },
                { question: " suspense account এর balance dome?#", options: ["Debit", "Credit", "Both", "None"], answer: 2 }
            ]
        }
    }
};

App.initLiveMcq = function () {

    const modal = document.getElementById("liveMcqModal");
    const toolBtn = document.getElementById("liveMcqToolBtn");
    const closeBtn = document.getElementById("liveMcqModalClose");
    const step1 = document.getElementById("liveMcqStep1");
    const step2 = document.getElementById("liveMcqStep2");
    const step3 = document.getElementById("liveMcqStep3");
    const step4 = document.getElementById("liveMcqStep4");
    const back1Btn = document.getElementById("liveMcqBack1");
    const back2Btn = document.getElementById("liveMcqBack2");
    const subjectTitle = document.getElementById("liveMcqSubjectTitle");
    const topicTitle = document.getElementById("liveMcqTopicTitle");
    const topicList = document.getElementById("liveMcqTopicList");
    const questionEl = document.getElementById("liveMcqQuestion");
    const optionsEl = document.getElementById("liveMcqOptions");
    const progressEl = document.getElementById("liveMcqProgress");
    const timerEl = document.getElementById("liveMcqTimer");
    const prevBtn = document.getElementById("liveMcqPrevBtn");
    const nextBtn = document.getElementById("liveMcqNextBtn");
    const submitBtn = document.getElementById("liveMcqSubmitBtn");
    const resultIcon = document.getElementById("liveMcqResultIcon");
    const resultScore = document.getElementById("liveMcqResultScore");
    const resultComment = document.getElementById("liveMcqResultComment");
    const retryBtn = document.getElementById("liveMcqRetryBtn");

    let currentSubject = null;
    let currentTopic = null;
    let currentQuestions = [];
    let currentIndex = 0;
    let answers = [];
    let score = 0;
    let timerInterval = null;
    let seconds = 0;

    toolBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("show");
        goToStep(1);
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove("show");
        clearTimer();
    }

    function goToStep(step) {
        step1.style.display = step === 1 ? "block" : "none";
        step2.style.display = step === 2 ? "block" : "none";
        step3.style.display = step === 3 ? "block" : "none";
        step4.style.display = step === 4 ? "block" : "none";
    }

    document.querySelectorAll(".live-mcq-subject").forEach(btn => {
        btn.addEventListener("click", () => {
            currentSubject = btn.dataset.subject;
            subjectTitle.textContent = "বিষয়: " + liveMcqData[currentSubject].name;
            topicList.innerHTML = "";
            const topics = liveMcqData[currentSubject].topics;
            Object.keys(topics).forEach(topicName => {
                const topicBtn = document.createElement("button");
                topicBtn.className = "live-mcq-topic";
                topicBtn.innerHTML = `
                    <i class="ri-folder-3-line"></i>
                    <span>${topicName}</span>
                    <span class="live-mcq-topic-count">${topics[topicName].length} MCQ</span>
                `;
                topicBtn.addEventListener("click", () => {
                    currentTopic = topicName;
                    topicTitle.textContent = "টপিক: " + topicName;
                    startQuiz();
                });
                topicList.appendChild(topicBtn);
            });
            goToStep(2);
        });
    });

    back1Btn.addEventListener("click", () => goToStep(1));
    back2Btn.addEventListener("click", () => goToStep(2));

    function startQuiz() {
        currentQuestions = [...liveMcqData[currentSubject].topics[currentTopic]];
        currentIndex = 0;
        answers = new Array(currentQuestions.length).fill(undefined);
        score = 0;
        seconds = 0;
        goToStep(3);
        startTimer();
        renderQuestion();
    }

    function startTimer() {
        clearTimer();
        updateTimer();
        timerInterval = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    }

    function clearTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function updateTimer() {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerEl.textContent = String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
    }

    function toBanglaNumber(num) {
        const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return String(num).split("").map(d => bn[parseInt(d)] || d).join("");
    }

    function renderQuestion() {
        const q = currentQuestions[currentIndex];
        questionEl.innerHTML = (currentIndex + 1) + ". " + q.question;
        progressEl.textContent = "প্রশ্ন " + toBanglaNumber(currentIndex + 1) + "/" + toBanglaNumber(currentQuestions.length);

        optionsEl.innerHTML = "";
        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "live-mcq-option";
            btn.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + i)}</span><span class="option-text">${opt}</span>`;
            if (answers[currentIndex] !== undefined && answers[currentIndex] === i) {
                btn.classList.add("selected");
            }
            btn.addEventListener("click", () => {
                answers[currentIndex] = i;
                renderQuestion();
            });
            optionsEl.appendChild(btn);
        });

        prevBtn.style.display = currentIndex === 0 ? "none" : "inline-flex";
        if (currentIndex === currentQuestions.length - 1) {
            nextBtn.style.display = "none";
            submitBtn.style.display = "inline-flex";
        } else {
            nextBtn.style.display = "inline-flex";
            submitBtn.style.display = "none";
        }

        nextBtn.disabled = answers[currentIndex] === undefined;
        nextBtn.style.opacity = answers[currentIndex] === undefined ? ".4" : "1";
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < currentQuestions.length - 1 && answers[currentIndex] !== undefined) {
            currentIndex++;
            renderQuestion();
        }
    });

    submitBtn.addEventListener("click", () => {
        score = 0;
        currentQuestions.forEach((q, i) => {
            if (answers[i] === q.answer) score++;
        });

        clearTimer();
        goToStep(4);

        resultScore.textContent = score + "/" + currentQuestions.length;
        
        const pct = score / currentQuestions.length;
        if (pct >= 0.9) {
            resultIcon.textContent = "🏆";
            resultComment.textContent = "অসাধারণ! পারফেক্ট স্কোর! আপনি মাস্টার!";
        } else if (pct >= 0.7) {
            resultIcon.textContent = "🌟";
            resultComment.textContent = "খুব ভালো! আরেকটু অনুশীলন করলেই পারফেক্ট হবে!";
        } else if (pct >= 0.5) {
            resultIcon.textContent = "👍";
            resultComment.textContent = "ভালো হয়েছে! আরও মনোযোগ দিয়ে পড়াশোনা করুন।";
        } else if (pct >= 0.3) {
            resultIcon.textContent = "📚";
            resultComment.textContent = "আরও প্রস্তুতি দরকার। নিয়মিত অনুশীলন করুন!";
        } else {
            resultIcon.textContent = "💪";
            resultComment.textContent = "চিন্তা নেই! প্রতিটি ভুল থেকে শেখা যায়। আবার চেষ্টা করুন!";
        }
    });

    retryBtn.addEventListener("click", () => {
        goToStep(1);
    });
};


/*=========================================================
            VOCABULARY MODAL
=========================================================*/

App.initVocab = function () {

    const modal = document.getElementById("vocabModal");
    const closeBtn = document.getElementById("vocabModalClose");
    const homeView = document.getElementById("vocabHome");
    const quizView = document.getElementById("vocabQuiz");
    const resultView = document.getElementById("vocabResult");
    const listBtn = document.getElementById("vocabListBtn");
    const gameBtn = document.getElementById("vocabGameBtn");
    const questionEl = document.getElementById("vocabQuizQuestion");
    const optionsEl = document.getElementById("vocabQuizOptions");
    const progressEl = document.getElementById("vocabQuizProgress");
    const scoreEl = document.getElementById("vocabQuizScore");
    const prevBtn = document.getElementById("vocabPrevBtn");
    const nextBtn = document.getElementById("vocabNextBtn");
    const submitBtn = document.getElementById("vocabSubmitBtn");
    const resultIcon = document.getElementById("vocabResultIcon");
    const resultScore = document.getElementById("vocabResultScore");
    const resultComment = document.getElementById("vocabResultComment");
    const retryBtn = document.getElementById("vocabRetryBtn");

    // Question Bank - 10 questions in exact order
    const vocabQuestions = [
        {
            exam: "Bangladesh Bank AD - 2023",
            question: "'ABATE' এর সমার্থক শব্দ কোনটি?",
            options: ["Increase", "Diminish", "Create", "Produce"],
            answer: 1
        },
        {
            exam: "Sonali Bank Officer - 2024",
            question: "'BENEvolENT' এর সমার্থক শব্দ কোনটি?",
            options: ["Cruel", "Kind-hearted", "Selfish", "Rude"],
            answer: 1
        },
        {
            exam: "Janata Bank Senior Officer - 2022",
            question: "'FRUGAL' এর বিপরীত শব্দ কোনটি?",
            options: ["Thrifty", "Economical", "Extravagant", "Careful"],
            answer: 2
        },
        {
            exam: "Agrani Bank Officer - 2023",
            question: "'VACILLATE' এর সমার্থক শব্দ কোনটি?",
            options: ["Waver", "Decide", "Firm", "Resolve"],
            answer: 0
        },
        {
            exam: "Rupali Bank - 2023",
            question: "'MELANCHOLY' এর সমার্থক শব্দ কোনটি?",
            options: ["Gloomy", "Joyful", "Cheerful", "Lively"],
            answer: 0
        },
        {
            exam: "Combined 5 Bank Officer - 2024",
            question: "'PRUDENT' এর সমার্থক শব্দ কোনটি?",
            options: ["Foolish", "Wise", "Careless", "Hasty"],
            answer: 1
        },
        {
            exam: "Bangladesh Bank Officer Cash - 2022",
            question: "'DELETERIOUS' এর সমার্থক শব্দ কোনটি?",
            options: ["Harmless", "Harmful", "Useful", "Beneficial"],
            answer: 1
        },
        {
            exam: "Sonali Bank - 2023",
            question: "'CANDID' এর বিপরীত শব্দ কোনটি?",
            options: ["Honest", "Frank", "Deceitful", "Sincere"],
            answer: 2
        },
        {
            exam: "Janata Bank - 2024",
            question: "'LACONIC' এর সমার্থক শব্দ কোনটি?",
            options: ["Wordy", "Brief", "Lengthy", "Talkative"],
            answer: 1
        },
        {
            exam: "Bangladesh Bank - 2024",
            question: "'MUNDANE' এর সমার্থক শব্দ কোনটি?",
            options: ["Extraordinary", "Ordinary", "Excellent", "Special"],
            answer: 1
        }
    ];

    let currentIndex = 0;
    let answers = [];
    let score = 0;

    // Helper: Bangla number
    function toBanglaNumber(num) {
        const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return String(num).split("").map(d => bn[parseInt(d)] || d).join("");
    }

    // Show specific view
    function showView(view) {
        homeView.style.display = "none";
        quizView.style.display = "none";
        resultView.style.display = "none";
        view.style.display = "block";
    }

    // Render question
    function renderQuestion() {
        const q = vocabQuestions[currentIndex];
        questionEl.textContent = (currentIndex + 1) + ". " + q.question + " (" + q.exam + ")";
        progressEl.textContent = "প্রশ্ন " + toBanglaNumber(currentIndex + 1) + "/" + toBanglaNumber(vocabQuestions.length);
        scoreEl.textContent = "Score: " + score;

        optionsEl.innerHTML = "";
        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "quiz-option";
            btn.textContent = String.fromCharCode(65 + i) + ". " + opt;
            if (answers[currentIndex] !== undefined && answers[currentIndex] === i) {
                btn.classList.add("selected");
            }
            btn.addEventListener("click", () => {
                answers[currentIndex] = i;
                renderQuestion();
            });
            optionsEl.appendChild(btn);
        });

        // Toggle nav buttons
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
        if (currentIndex === vocabQuestions.length - 1) {
            nextBtn.style.display = "none";
            submitBtn.style.display = "flex";
        } else {
            nextBtn.style.display = "flex";
            submitBtn.style.display = "none";
        }
    }

    // Open modal on Vocabulary tool click
    document.getElementById("vocabToolBtn").addEventListener("click", (e) => {
        e.preventDefault();
        showView(homeView);
        modal.classList.add("show");
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Start game
    gameBtn.addEventListener("click", () => {
        currentIndex = 0;
        answers = new Array(vocabQuestions.length).fill(undefined);
        score = 0;
        showView(quizView);
        renderQuestion();
    });

    // Navigation
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < vocabQuestions.length - 1) {
            currentIndex++;
            renderQuestion();
        }
    });

    // Submit
    submitBtn.addEventListener("click", () => {
        score = 0;
        vocabQuestions.forEach((q, i) => {
            if (answers[i] === q.answer) score++;
        });

        resultScore.textContent = score + "/" + vocabQuestions.length;

        const pct = score / vocabQuestions.length;
        if (pct === 1) {
            resultIcon.textContent = "🏆";
            resultComment.textContent = "অসাধারণ! পারফেক্ট স্কোর! আপনি Vocabulary Master!";
        } else if (pct >= 0.8) {
            resultIcon.textContent = "🌟";
            resultComment.textContent = "খুব ভালো! আর একটু practice করলে পারফেক্ট হবে!";
        } else if (pct >= 0.6) {
            resultIcon.textContent = "👍";
            resultComment.textContent = "ভালো হয়েছে! Regular practice রাখুন।";
        } else if (pct >= 0.4) {
            resultIcon.textContent = "📚";
            resultComment.textContent = "আরও প্রস্তুতি দরকার। Vocabulary দিয়ে দৈনিক practice করুন।";
        } else {
            resultIcon.textContent = "💪";
            resultComment.textContent = "চিন্তা নেই! প্রতিটি ভুল থেকে শেখা যায়। আবার চেষ্টা করুন!";
        }

        showView(resultView);
    });

    // Retry
    retryBtn.addEventListener("click", () => {
        showView(homeView);
    });

    // List button stays disabled
    listBtn.addEventListener("click", () => {
        // No action - disabled
    });
};


/*=========================================================
            BOOK INFO MODAL
=========================================================*/

App.initBookInfo = function () {

    const modal = document.getElementById("bookInfoModal");
    const closeBtn = document.getElementById("bookInfoClose");
    const buyBtn = document.getElementById("bookInfoBuyBtn");
    const titleEl = document.getElementById("bookInfoTitle");
    const descEl = document.getElementById("bookInfoDesc");
    const priceEl = document.getElementById("bookInfoPrice");
    const oldEl = document.getElementById("bookInfoOld");

    // Book descriptions
    const bookDescriptions = {
        "Bank Suggestions Book": "ব্যাংক জব পরীক্ষার জন্য সম্পূর্ণ সাজেশন ও গাইড। প্রতিটি ব্যাংকের পূর্ববর্তী প্রশ্ন বিশ্লেষণসহ গুরুত্বপূর্ণ টপিক কভার করা হয়েছে।",
        "BCS Preliminary Book": "BCS প্রিলিমিনারি পরীক্ষার জন্য পূর্ণাঙ্গ প্রস্তুতি গাইড। বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান সহ সব বিষয়ের সাজেশন।",
        "English Exclusive Notes": "ইংরেজি গ্রামার, Vocabulary ও Comprehension এর এক্সক্লুসিভ নোট। চাকরির পরীক্ষার জন্য অত্যন্ত কার্যকর।",
        "GK Book - Jakir Sir": "সাধারণ জ্ঞানের সম্পূর্ণ বই। বাংলাদেশ ও আন্তর্জাতিক বিষয়সহ গুরুত্বপূর্ণ তথ্য একত্রে সাজানো।",
        "Math Exclusive Notes": "গণিতের এক্সক্লুসিভ নোট। অঙ্কের শর্টকাট টেকনিক ও গুরুত্বপূর্ণ সূত্রসহ সহজ সমাধান পদ্ধতি।",
        "Shikhok Nibondhon Exclusive": "শিক্ষক নিবন্ধন পরীক্ষার জন্য এক্সক্লুসিভ প্রস্তুতি বই। বিগত বছরের প্রশ্ন ও সাজেশনসহ।"
    };

    // Open book info modal on Buy Now click
    document.querySelectorAll(".buy-now-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const bookName = btn.dataset.book || "বই";
            const bookPrice = btn.dataset.price || "৳0";
            const bookOld = btn.dataset.old || "৳0";
            titleEl.textContent = bookName;
            descEl.textContent = bookDescriptions[bookName] || "এই বইয়ের বিস্তারিত বিবরণ শীঘ্রই আসছে।";
            priceEl.textContent = bookPrice;
            oldEl.textContent = bookOld;
            modal.classList.add("show");
        });
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Buy button - close book modal and open enrollment modal
    buyBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        // Open the enrollment modal
        const enrollModal = document.getElementById("enrollModal");
        if (enrollModal) {
            enrollModal.classList.add("show");
            // Go to step 1
            document.getElementById("enrollStep1").style.display = "block";
            document.getElementById("enrollStep2").style.display = "none";
            document.getElementById("enrollStep3").style.display = "none";
            document.getElementById("enrollStep4").style.display = "none";
        }
    });
};


/*=========================================================
            COURSE INFO MODAL
=========================================================*/

App.initCourseInfo = function () {

    const modal = document.getElementById("courseInfoModal");
    const closeBtn = document.getElementById("courseInfoClose");
    const enrollBtn = document.getElementById("courseInfoEnrollBtn");
    const nameEl = document.getElementById("courseInfoName");
    const priceEl = document.getElementById("courseInfoPrice");

    // Open course info modal on Enroll Now click
    document.querySelectorAll(".enroll-now-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const courseName = btn.dataset.course || "কোর্স";
            const coursePrice = btn.dataset.price || "৳0";
            nameEl.textContent = courseName;
            priceEl.textContent = coursePrice;
            modal.classList.add("show");
        });
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Enroll Now button - close info modal and open payment modal
    enrollBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        // Open the enrollment modal
        const enrollModal = document.getElementById("enrollModal");
        if (enrollModal) {
            enrollModal.classList.add("show");
            // Go to step 1
            document.getElementById("enrollStep1").style.display = "block";
            document.getElementById("enrollStep2").style.display = "none";
            document.getElementById("enrollStep3").style.display = "none";
            document.getElementById("enrollStep4").style.display = "none";
        }
    });
};



/*=========================================================
            ENROLLMENT MODAL
=========================================================*/

App.initEnrollment = function () {

    // Courses by category
    const coursesByCategory = {
        bank: [
            { name: "Bank MCQ + Written Combo", price: 2499 },
            { name: "Bank Math Crash Course", price: 1499 },
            { name: "Bank English Paid Course", price: 1299 },
            { name: "Bank GK & Computer", price: 999 }
        ],
        primary: [
            { name: "Primary Teacher Complete", price: 1499 },
            { name: "Primary Math Masterclass", price: 999 },
            { name: "Primary English Course", price: 899 },
            { name: "Primary Question Bank Pack", price: 799 }
        ],
        somajseba: [
            { name: "Somaj Seba Complete Batch", price: 1699 },
            { name: "Shastho Sohokari Course", price: 1499 },
            { name: "Somaj Seba Question Bank", price: 899 }
        ],
        nibondhon: [
            { name: "Shikhok Nibondhon Complete", price: 1999 },
            { name: "Sebamulok Nibondhon Course", price: 1799 },
            { name: "Nibondhon Online Crash", price: 1299 }
        ],
        bcs: [
            { name: "BCS Math Crash Course", price: 1299 },
            { name: "BCS GK Premium", price: 899 },
            { name: "BCS English Course", price: 1099 },
            { name: "BCS Full Package", price: 2999 }
        ]
    };

    // Category titles
    const categoryTitles = {
        bank: "ব্যাংক কোর্স সমূহ",
        primary: "প্রাথমিক শিক্ষক কোর্স সমূহ",
        somajseba: "সমাজসেবা কোর্স সমূহ",
        nibondhon: "শিক্ষক নিবন্ধন কোর্স সমূহ",
        bcs: "BCS কোর্স সমূহ"
    };

    // DOM refs
    const modal = document.getElementById("enrollModal");
    const enrollBtn = document.getElementById("enrollBtn");
    const step1 = document.getElementById("enrollStep1");
    const step2 = document.getElementById("enrollStep2");
    const step3 = document.getElementById("enrollStep3");
    const step4 = document.getElementById("enrollStep4");
    const courseList = document.getElementById("enrollCourseList");
    const catTitle = document.getElementById("enrollCatTitle");

    let selectedCourse = null;
    let selectedMethod = null;
    let currentStep = 1;

    // Show modal
    function openModal() {
        modal.classList.add("show");
        goToStep(1);
    }

    // Close modal
    function closeModal() {
        modal.classList.remove("show");
        // Reset
        selectedCourse = null;
        selectedMethod = null;
        document.getElementById("manualPayment").style.display = "none";
        document.querySelectorAll(".payment-method").forEach(m => m.classList.remove("active"));
        document.getElementById("trxId").value = "";
        document.getElementById("senderMobile").value = "";
    }

    // Navigate steps
    function goToStep(step) {
        currentStep = step;
        step1.style.display = step === 1 ? "block" : "none";
        step2.style.display = step === 2 ? "block" : "none";
        step3.style.display = step === 3 ? "block" : "none";
        step4.style.display = step === 4 ? "block" : "none";
    }

    // Open modal on CTA button click
    enrollBtn.addEventListener("click", openModal);

    // Close buttons
    document.getElementById("enrollClose").addEventListener("click", closeModal);
    document.getElementById("enrollClose2").addEventListener("click", closeModal);
    document.getElementById("enrollClose3").addEventListener("click", closeModal);

    // Back buttons
    document.getElementById("enrollBack2").addEventListener("click", () => goToStep(1));
    document.getElementById("enrollBack3").addEventListener("click", () => goToStep(2));

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Category selection
    document.querySelectorAll(".enroll-category").forEach(cat => {
        cat.addEventListener("click", () => {
            const category = cat.dataset.category;
            catTitle.textContent = categoryTitles[category] || "কোর্স নির্বাচন";

            // Render courses
            courseList.innerHTML = "";
            (coursesByCategory[category] || []).forEach(course => {
                const item = document.createElement("div");
                item.className = "enroll-course-item";
                item.innerHTML = `
                    <div class="enroll-course-name">${course.name}</div>
                    <div class="enroll-course-price">৳${course.price}</div>
                `;
                item.addEventListener("click", () => {
                    selectedCourse = course;
                    // Show payment step
                    document.getElementById("paymentOrder").innerHTML = `
                        <p><strong>📚 কোর্স:</strong> ${course.name}</p>
                        <p><strong>💰 ফি:</strong> ৳${course.price}</p>
                    `;
                    document.getElementById("payAmount").textContent = "৳" + course.price;
                    document.getElementById("manualPayment").style.display = "none";
                    document.querySelectorAll(".payment-method").forEach(m => m.classList.remove("active"));
                    selectedMethod = null;
                    goToStep(3);
                });
                courseList.appendChild(item);
            });

            goToStep(2);
        });
    });

    // Payment method selection
    document.querySelectorAll(".payment-method").forEach(method => {
        method.addEventListener("click", () => {
            if (method.disabled) return;
            // Toggle active
            document.querySelectorAll(".payment-method").forEach(m => m.classList.remove("active"));
            method.classList.add("active");
            selectedMethod = method.dataset.method;
            // Show manual payment form for bKash/Nagad
            document.getElementById("manualPayment").style.display = "block";
        });
    });

    // Submit payment
    document.getElementById("paymentSubmitBtn").addEventListener("click", () => {
        const senderMobile = document.getElementById("senderMobile").value.trim();
        const trxId = document.getElementById("trxId").value.trim();
        if (!selectedMethod) {
            showToast('warning', 'পেমেন্ট মেথড নির্বাচন করুন!');
            return;
        }
        if (!senderMobile) {
            showToast('warning', 'আপনার মোবাইল নম্বর লিখুন!');
            return;
        }
        if (senderMobile.length < 11) {
            showToast('warning', 'সঠিক মোবাইল নম্বর লিখুন!');
            return;
        }
        if (!trxId) {
            showToast('warning', 'TRX ID লিখুন!');
            return;
        }
        // Show success
        goToStep(4);
    });

    // Done button
    document.getElementById("enrollDoneBtn").addEventListener("click", closeModal);
};



/*=========================================================
            DEMO EXAM / QUIZ
=========================================================*/

App.initQuiz = function () {

    // Question Bank - Bangla, English, Math mixed
    const questionBank = [
        // Bangla Questions
        { q: "বাংলাদেশের স্বাধীনতা ঘোষণা করা হয় কত সালে?", options: ["১৯৬৯", "১৯৭১", "১৯৭৫", "১৯৮০"], answer: 1 },
        { q: "বাংলা নববর্ষ পহেলা বৈশাখ কোন মাসে পালিত হয়?", options: ["চৈত্র", "বৈশাখ", "আষাঢ়", "ফাল্গুন"], answer: 1 },
        { q: "জাতীয় কবি কাজী নজরুল ইসলামের জন্ম কোন জেলায়?", options: ["চুরুলিয়া", "বর্ধমান", "ঢাকা", "চট্টগ্রাম"], answer: 0 },
        { q: "'আমার সোনার বাংলা' গানটি কার লেখা?", options: ["রবীন্দ্রনাথ ঠাকুর", "কাজী নজরুল ইসলাম", "জসীমউদ্দীন", "সুকান্ত ভট্টাচার্য"], answer: 0 },
        { q: "বাংলাদেশের জাতীয় ফুল কী?", options: ["গোলাপ", "পদ্ম", "শাপলা", "সূর্যমুখী"], answer: 2 },
        // English Questions
        { q: "What is the synonym of 'Abundant'?", options: ["Scarce", "Plentiful", "Rare", "Empty"], answer: 1 },
        { q: "Choose the correct spelling:", options: ["Recieve", "Receive", "Receeve", "Reciive"], answer: 1 },
        { q: "What is the antonym of 'Brave'?", options: ["Courageous", "Bold", "Cowardly", "Heroic"], answer: 2 },
        { q: "Fill in the blank: He ____ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1 },
        { q: "The opposite of 'Ancient' is:", options: ["Old", "Modern", "Aged", "Antique"], answer: 1 },
        // Math Questions
        { q: "১২ + ২৮ = ?", options: ["৩০", "৪০", "৫০", "৬০"], answer: 1 },
        { q: "১৫ × ৬ = ?", options: ["৬০", "৭০", "৮০", "৯০"], answer: 3 },
        { q: "১০০ ÷ ৪ = ?", options: ["২০", "২৫", "৩০", "৫০"], answer: 1 },
        { q: "একটি ত্রিভুজের তিন কোণের সমষ্টি কত?", options: ["৯০°", "১৮০°", "২৭০°", "৩৬০°"], answer: 1 },
        { q: "৫০ এর ২০% কত?", options: ["৫", "১০", "১৫", "২০"], answer: 1 },
        { q: "৬৪ এর বর্গমূল কত?", options: ["৬", "৭", "৮", "৯"], answer: 2 },
        { q: "পরবর্তী সংখ্যা: ২, ৪, ৬, ৮, ?", options: ["৯", "১০", "১১", "১২"], answer: 1 },
        { q: "৪৫ + ৩৭ = ?", options: ["৭২", "৮২", "৯২", "১০২"], answer: 1 },
        { q: "একটি ডজন = কতটি?", options: ["১০", "১২", "১৪", "১৬"], answer: 1 },
        { q: "৯ ✕ ৯ = ?", options: ["৭৯", "৮১", "৮৯", "৯১"], answer: 1 }
    ];

    // DOM refs
    const setupView = document.getElementById("examSetup");
    const quizView = document.getElementById("quizView");
    const resultView = document.getElementById("quizResult");
    const startBtn = document.getElementById("startExamBtn");
    const retryBtn = document.getElementById("retryBtn");
    const questionEl = document.getElementById("quizQuestion");
    const optionsEl = document.getElementById("quizOptions");
    const progressEl = document.getElementById("quizProgress");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    let currentQuestions = [];
    let currentIndex = 0;
    let answers = [];
    let score = 0;

    // Shuffle and pick 10 random questions
    function getRandomQuestions() {
        const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 10);
    }

    // Convert Bangla digits to English digits
    function toBanglaNumber(num) {
        const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        return String(num).split("").map(d => bn[parseInt(d)] || d).join("");
    }

    // Render current question
    function renderQuestion() {
        const q = currentQuestions[currentIndex];
        questionEl.textContent = (currentIndex + 1) + ". " + q.q;
        progressEl.textContent = "প্রশ্ন " + toBanglaNumber(currentIndex + 1) + "/" + toBanglaNumber(currentQuestions.length);

        optionsEl.innerHTML = "";
        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "quiz-option";
            btn.textContent = String.fromCharCode(65 + i) + ". " + opt;
            if (answers[currentIndex] !== undefined && answers[currentIndex] === i) {
                btn.classList.add("selected");
            }
            btn.addEventListener("click", () => {
                answers[currentIndex] = i;
                renderQuestion();
            });
            optionsEl.appendChild(btn);
        });

        // Toggle nav buttons
        prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
        if (currentIndex === currentQuestions.length - 1) {
            nextBtn.style.display = "none";
            submitBtn.style.display = "flex";
        } else {
            nextBtn.style.display = "flex";
            submitBtn.style.display = "none";
        }

        // Disable next if no answer selected
        nextBtn.disabled = answers[currentIndex] === undefined;
        nextBtn.style.opacity = answers[currentIndex] === undefined ? ".4" : "1";
    }

    // Start exam
    startBtn.addEventListener("click", () => {
        currentQuestions = getRandomQuestions();
        currentIndex = 0;
        answers = new Array(currentQuestions.length).fill(undefined);
        score = 0;
        setupView.style.display = "none";
        resultView.style.display = "none";
        quizView.style.display = "block";
        renderQuestion();
    });

    // Navigation
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            renderQuestion();
        }
    });

    // Submit and show result
    submitBtn.addEventListener("click", () => {
        score = 0;
        currentQuestions.forEach((q, i) => {
            if (answers[i] === q.answer) score++;
        });

        quizView.style.display = "none";
        resultView.style.display = "block";

        // Show result
        document.getElementById("resultScore").textContent = score + "/" + currentQuestions.length;
        document.getElementById("resultUser").textContent = "Jakir-এর ফলাফল";

        // Icon and comment based on score
        const icon = document.getElementById("resultIcon");
        const comment = document.getElementById("resultComment");
        const pct = score / currentQuestions.length;

        if (pct >= 0.9) {
            icon.textContent = "🏆";
            comment.textContent = "অসাধারণ Jakir! আপনি একজন মেধাবী শিক্ষার্থী। এই ধারা অব্যাহত রাখুন!";
        } else if (pct >= 0.7) {
            icon.textContent = "🌟";
            comment.textContent = "খুব ভালো Jakir! আরেকটু অনুশীলন করলেই পারফেক্ট!";
        } else if (pct >= 0.5) {
            icon.textContent = "👍";
            comment.textContent = "ভালো হয়েছে Jakir! আরও মনোযোগ দিয়ে পড়াশোনা করুন।";
        } else if (pct >= 0.3) {
            icon.textContent = "📚";
            comment.textContent = "আরও প্রস্তুতি দরকার Jakir। নিয়মিত অনুশীলন করুন, সফলতা আসবেই!";
        } else {
            icon.textContent = "💪";
            comment.textContent = "চিন্তা নেই Jakir! প্রতিটি ভুল থেকে শেখা যায়। আবার চেষ্টা করুন!";
        }
    });

    // Retry
    retryBtn.addEventListener("click", () => {
        resultView.style.display = "none";
        setupView.style.display = "block";
    });
};



/*=========================================================
            QUESTION BANK TABS
=========================================================*/

App.initQuestionBank = function () {

    const tabs = document.querySelectorAll(".qb-tab");
    const contents = document.querySelectorAll(".qb-content");

    function switchTab(tabId) {

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        document.querySelector(`.qb-tab[data-tab="${tabId}"]`)?.classList.add("active");
        document.getElementById("tab-" + tabId)?.classList.add("active");

    }

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            switchTab(tab.dataset.tab);

        });

    });

};


/*=========================================================
            EXAM MODAL / COUNTDOWN
=========================================================*/

App.initExamModal = function () {

    const modal = document.getElementById("examModal");

    const closeBtn = document.getElementById("examModalClose");

    const courseEl = document.getElementById("examModalCourse");

    const dateEl = document.getElementById("examModalDate");

    const timeEl = document.getElementById("examModalTime");

    const countdownEl = document.getElementById("examCountdown");

    let countdownInterval = null;

    // Open modal on exam link click

    document.querySelectorAll(".exam-link").forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const exam = link.dataset.exam;

            const date = link.dataset.date;

            const time = link.dataset.time;

            courseEl.textContent = "📚 " + exam;

            dateEl.textContent = "📅 " + date;

            timeEl.textContent = "⏰ " + time;

            // Parse exam time (e.g. "8:00 PM") into today's date

            const parts = time.match(/(\d+):(\d+)\s*(AM|PM)/i);

            if (!parts) return;

            let hours = parseInt(parts[1]);

            const mins = parseInt(parts[2]);

            const meridiem = parts[3].toUpperCase();

            if (meridiem === "PM" && hours !== 12) hours += 12;

            if (meridiem === "AM" && hours === 12) hours = 0;

            const now = new Date();

            const examTime = new Date(now);

            examTime.setHours(hours, mins, 0, 0);

            // If exam time already passed, show zero

            let diff = examTime - now;

            if (diff < 0) diff = 0;

            // Clear previous interval

            if (countdownInterval) clearInterval(countdownInterval);

            const updateCountdown = () => {

                const now2 = new Date();

                let diff2 = examTime - now2;

                if (diff2 < 0) diff2 = 0;

                const totalSeconds = Math.floor(diff2 / 1000);

                const days = Math.floor(totalSeconds / 86400);

                const hoursLeft = Math.floor((totalSeconds % 86400) / 3600);

                const minutesLeft = Math.floor((totalSeconds % 3600) / 60);

                const secondsLeft = totalSeconds % 60;

                const pad = (n) => String(n).padStart(2, "0");

                let text = "";

                if (days > 0) {

                    text += days + "d ";

                }

                text += pad(hoursLeft) + ":" + pad(minutesLeft) + ":" + pad(secondsLeft);

                countdownEl.textContent = text;

                if (totalSeconds <= 0) {

                    countdownEl.textContent = "00:00:00";

                    clearInterval(countdownInterval);

                }

            };

            updateCountdown();

            countdownInterval = setInterval(updateCountdown, 1000);

            // Show modal

            modal.classList.add("show");

        });

    });

    // Close on button click

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("show");

        if (countdownInterval) clearInterval(countdownInterval);

    });

    // Close on backdrop click

    modal.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.classList.remove("show");

            if (countdownInterval) clearInterval(countdownInterval);

        }

    });

};



/*=========================================================
            EVENTS
=========================================================*/

    window.addEventListener(

        "DOMContentLoaded",

        () => {

            App.init();

            App.initLiveMcq();

            App.initQuestionBank();

            App.initVocab();

            App.initBookInfo();

            App.initCourseInfo();

            App.initEnrollment();

            App.initQuiz();

            App.initExamModal();

        }

    );



/*=========================================================
    Module 3
    Final UI Interactions
=========================================================*/


//=========================================================
// SMOOTH SCROLL
//=========================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});





//=========================================================
// SCROLL TO TOP
//=========================================================

const scrollBtn = document.querySelector(".scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

if (scrollBtn) {

    scrollBtn.onclick = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

}





//=========================================================
// STICKY HEADER SHADOW
//=========================================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";

    } else {

        header.style.boxShadow = "";

    }

});





//=========================================================
// BOTTOM NAV ACTIVE
//=========================================================

document.querySelectorAll(".bottom-nav a").forEach(item => {

    item.addEventListener("click", () => {

        document.querySelectorAll(".bottom-nav a")

            .forEach(nav => nav.classList.remove("active"));

        item.classList.add("active");

    });

});





//=========================================================
// MOBILE MENU
//=========================================================

const menuBtn = document.querySelector(".menu-btn");

menuBtn?.addEventListener("click", () => {

    showToast('info', 'Sidebar/Menu Coming Soon');

});





//=========================================================
// SEARCH
//=========================================================

const searchBtn = document.querySelector(".ri-search-line")?.parentElement;

searchBtn?.addEventListener("click", () => {

    showToast('info', 'Search Coming Soon');

});





//=========================================================
// DARK MODE
//=========================================================

function enableDarkMode() {

    const enabled = !document.documentElement.classList.contains("dark");

    document.documentElement.classList.toggle("dark", enabled);
    document.body.classList.toggle("dark", enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");

}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");

}

// Double click logo to switch theme

document.querySelector(".logo")

    ?.addEventListener("dblclick", enableDarkMode);





//=========================================================
// INTERSECTION OBSERVER
//=========================================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

document.querySelectorAll(

    ".fade-up"

).forEach(el => {

    observer.observe(el);

});










//=========================================================
// LOADING EFFECT
//=========================================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});





//=========================================================
// WELCOME MESSAGE
//=========================================================

setTimeout(() => {

    console.log("🎉 Jakir Sir SMART Edu Portal Ready");

}, 500);





//=========================================================
// OPTIONAL DARK MODE CSS
//=========================================================

const darkCSS = `

body.dark{

background:#0F172A;

color:#fff;

}

body.dark .header,

body.dark .course-card,

body.dark .blog-card,

body.dark .pdf-card,

body.dark .video-card,

body.dark .tool,

body.dark .stat,

body.dark .routine-table{

background:#1E293B;

color:#fff;

}

body.dark .section-title a,

body.dark .price{

color:#60A5FA;

}

`;

const style = document.createElement("style");

style.innerHTML = darkCSS;

document.head.appendChild(style);





/*=========================================================
                FINISHED
=========================================================*/

console.log(

    "%cJakir Sir SMART Edu Portal Loaded Successfully 🚀",

    "color:#2563EB;font-size:16px;font-weight:bold"

);