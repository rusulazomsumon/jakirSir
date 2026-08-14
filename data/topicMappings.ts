export interface SubTopic {
  name: string
  slug: string
}

export interface Category {
  name: string
  topics: SubTopic[]
}

export interface SubjectData {
  title: string
  categories: Category[]
}

const topic = (name: string, slug: string): SubTopic => ({ name, slug })
const cat = (name: string, ...topics: SubTopic[]): Category => ({ name, topics })

export const subjectTopicsData: Record<string, SubjectData> = {
  bangla: {
    title: 'বাংলা',
    categories: [
      cat('সাধারণ বাংলা', topic('বাংলা সমগ্র', 'banglaAll')),
      cat('ব্যাকরণ', topic('তত্ত্ব ও পদ্ধতি: কারক-বিভক্তি', 'grammar/theory/karokobivokti'), topic('পদরূপতত্ত্ব', 'grammar/theory/pokritioprotoy'), topic('লেখন', 'grammar/writing/writing')),
      cat('সাহিত্য', topic('প্রাচীন বাংলা সাহিত্য', 'literature/prachinjug'), topic('মুক্তিযুদ্ধ ও ভাষা আন্দোলন', 'literature/muktijudhdhovashaandolon'), topic('মধ্যযুগের বাংলা সাহিত্য', 'literature/modhdhojug'))
    ]
  },
  banglaBakaron: {
    title: 'বাংলা ব্যাকরণ',
    categories: [
      cat('ব্যাকরণিক উপাদান', topic('কারক-বিভক্তি', 'bakaronicUpadan/karokBivokti'), topic('ক্রিয়া-কাল ও আবিদ্যা', 'bakaronicUpadan/kriyarKalOvab'), topic('নিয়ম-বিধান ও নিষেধ', 'bakaronicUpadan/ntoBidhanOshtoBidhan'), topic('উপসর্গ-উপসর্গ', 'bakaronicUpadan/onusorgoUposorgo'), topic('প্রকৃতি-প্রত্যয়', 'bakaronicUpadan/prokitiProttoy'), topic('সংধি-বিচ্ছেদ', 'bakaronicUpadan/shondhiBichched'), topic('সমাস', 'bakaronicUpadan/somash')),
      cat('বাক্যতত্ত্ব ও অপপ্রয়োগ', topic('বাক্য প্রকারণ', 'bakkotottoOproyog/bakkoProkoron'), topic('বাক্য শুদ্ধিকরণ', 'bakkotottoOproyog/bakkoShudhikoron'), topic('ইংরেজি-বাংলা অনুবাদ', 'bakkotottoOproyog/en2bnOnubad'), topic('শব্দের অর্থ ও প্রয়োগ', 'bakkotottoOproyog/sobdherOrthoOproyog')),
      cat('শব্দার্থ ও অভিধান', topic('বাগধারা', 'shobdarthoObidhito/bagdhara'), topic('বানান শুদ্ধিকরণ', 'shobdarthoObidhito/bananShudhikoron'), topic('বিপরীত শব্দ', 'shobdarthoObidhito/biporitSobddo'), topic('ছন্দ ও আলংকার', 'shobdarthoObidhito/chondoOolonkor'), topic('এক কথায় প্রকাশ', 'shobdarthoObidhito/ekKothayProkash'), topic('পরিভাষিক শব্দ', 'shobdarthoObidhito/parivashikSobddo'), topic('পত্র লেখন', 'shobdarthoObidhito/potroLikhon'), topic('প্রবাদ-প্রবচন', 'shobdarthoObidhito/probadProchonon'), topic('সমার্থক শব্দ', 'shobdarthoObidhito/shamorthokShobdo')),
      cat('শব্দ রূপতা', topic('বচন', 'shobdoOruptotto/bochon'), topic('পদ প্রকারণ', 'shobdoOruptotto/podProkaron'), topic('পদাসক্তি নির্দেশক', 'shobdoOruptotto/podasritoNirdeshok'), topic('পুরুষ-অস্ত্রি Bachok শব্দ', 'shobdoOruptotto/purusOstribachokSobdo'), topic('পুরুষ ও দruit শব্দ', 'shobdoOruptotto/purushOdirutoSobdo'), topic('শব্দের শ্রেণীবিভাগ', 'shobdoOruptotto/sobdherSrenibivag')),
      cat('ভাষা ও দর্শন বিজ্ঞান', topic('ব্যাকরণ বিষয়ক গ্রন্থ', 'vashaOdhonniBiggan/bakaronBisoyokGrontho'), topic('ধ্বনির পরিবর্তন', 'vashaOdhonniBiggan/dbonniOborno'), topic('ধ্বনির পরিবর্তন', 'vashaOdhonniBiggan/dhonnirPoriborton'), topic('যতি-চিহ্ন', 'vashaOdhonniBiggan/jotiChedChinho'), topic('ভাষা ও বাংলা ভাষা', 'vashaOdhonniBiggan/vashaObanglaVasha'))
    ]
  },
  banglaSahitto: {
    title: 'বাংলা সাহিত্য',
    categories: [
      cat('১৮শ শতকের সাহিত্যিক', topic('মাইকেল মধুসূদন দত্ত', '19thSahittik/michelBonkim'), topic('মীর মশারফ আহমেদ', '19thSahittik/mirMosarofKaykobad'), topic('রবীন্দ্রনাথ ঠাকুর', '19thSahittik/robindranathThakur')),
      cat('আধুনিক যুগের সূচনা', topic('গোদের ইতিহাস ও আলোচনা', 'adhunikJugerSuchona/godderItihasFortUliyamOchapakhana'), topic('সাহিত্য সমাজ একাডেমি', 'adhunikJugerSuchona/sahittoSomajAcademy')),
      cat('চর্যাপদ থেকে মধ্যযুগের সাহিত্য', topic('চর্যাপদ থেকে মধ্যযুগ', 'chorjapodPrachinOmodhojug/chorjapodPrachinjug'), topic('মধ্যযুগের সাহিত্য কর্ম', 'chorjapodPrachinOmodhojug/modhdhojugOsahittoKormo'), topic('প্রাচীন জাতি লিপি ও জন্ম', 'chorjapodPrachinOmodhojug/prachinJugLipiOjonmmokotha')),
      cat('সাহিত্যের ধারা ও abidhito', topic('৫২ ও ৭১ সাহিত্য', 'shahittorDharaObidhito/52and71sahitto'), topic('বিখ্যাত উক্তি', 'shahittorDharaObidhito/bikhatUkti'), topic('কব্ব ছোটগল্প জীবনচরিত', 'shahittorDharaObidhito/kabboChotogolpoJibonCharit'), topic('পত্রিকা সময়iki সম্পাদক', 'shahittorDharaObidhito/potrikaSamoyikiSompadok'), topic('উপাধি চন্দনাম', 'shahittorDharaObidhito/upadhiChondonam'), topic('উপন্যাস নাটক প্রবন্ধ', 'shahittorDharaObidhito/uponnashNatokProbondho'))
    ]
  },
  english: {
    title: 'ইংরেজি',
    categories: [
      cat('গ্রামার', topic('বানান', 'grammar/spelling/spelling'), topic('টেন্স', 'grammar/tense/tense'), topic('ক্রিয়া: 482টি', 'grammar/verb/verb482'), topic('ভোকাবুলারি গল্প', 'grammar/vocabulary/stories/storyvocabulary'), topic('ভোকাবুলারি গল্প ২', 'grammar/vocabulary/stories/vocastory'), topic('ভোকাবুলারি', 'grammar/vocabulary/vocabulary'), topic('ভয়েস', 'grammar/voice/voice')),
      cat('সাহিত্য', topic('ইংরেজি সাহিত্য', 'literature/literature'))
    ]
  },
  englishGrammer: {
    title: 'ইংরেজি গ্রামার',
    categories: [
      cat('কালাজ বা ক্রিয়া绑定', topic('ক্লাউজ', 'caluse/clause')),
      cat('গ্রামার করেকশন', topic('ক্রিয়ার সঠিক রূপ', 'grammerCurrection/rightFormOfVerb'), topic('টেন্স', 'grammerCurrection/tense')),
      cat('ইডিয়ম & ফ্রেজ', topic('ইডিয়ম এবং ফ্রেজ', 'idiomsPhrases/idiomsAndPhrases')),
      cat('শব্দের parts of speech', topic('বিশেষণ', 'partsOfSpeech/adjective'), topic('লিঙ্গ ও সংখ্যা', 'partsOfSpeech/genderNumber'), topic('নাউন', 'partsOfSpeech/noun'), topic('প্রিপোজিশন-কনজUNCTION-ইন্টারজেকশন', 'partsOfSpeech/prepositionConjuctionInterjuction'), topic('প্রোনাউন', 'partsOfSpeech/pronoun'), topic('ভার্ব ও মোডাল', 'partsOfSpeech/verbAndModal')),
      cat('বাক্য রূপান্তর', topic('কন্ডিশনাল সেন্টেন্স', 'sentencesTransformations/conditionalSentence'), topic('নারেশন ডিগ্রি', 'sentencesTransformations/narrationDgree'), topic('ভয়েস চেঞ্জ', 'sentencesTransformations/voiceChange')),
      cat('শব্দভান্ডার', topic('অ্যান্টনিম', 'wordsVocabulary/antonym'), topic('সঠিক বানান', 'wordsVocabulary/correctSpelling'), topic('গ্রুপ ভার্ব', 'wordsVocabulary/groupVerb'), topic('ওয়ানওয়ার্ড সাবস্টিটিউশন', 'wordsVocabulary/oneWordSubstitution'), topic('সিনোনিম', 'wordsVocabulary/synonym'))
    ]
  },
  englishLiturature: {
    title: 'ইংরেজি সাহিত্য',
    categories: [
      cat('সাহিত্যিক যুগ', topic('১৯শ শতকের সাহিত্য', '19thCenturyLiturature/19thCenturyLiturature'), topic('২০শ শতকের মডার্নিজম', '20thModernism/20thModernism'), topic('সাহিত্যিক রূপ', 'LiteraryForms/LiteraryForms'), topic('অ্যাংলো-স্যাক্সন থেকে নিও-ক্লাসিক্যাল', 'angloSaxon2Neoclassical/angloSaxon2Neoclassical')),
      cat('প্রখ্যাত উক্তি', topic('ফ্যামাস কোটেশনস', 'famousQuotations/famousQuotations')),
      cat('উপন্যাসিক ও লেখক', topic('উইলিয়াম শেক্সপিয়র', 'williamShakespeare/williamShakespeare'))
    ]
  },
  ict: {
    title: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    categories: [
      cat('সাধারণ ICT', topic('ICT 701', 'ict701'), topic('ICT 704', 'ict704'), topic('ICT 705', 'ict705'), topic('ICT 706', 'ict706'), topic('ICT 710', 'ict710'), topic('ICT 720', 'ict720'), topic('ICT 730', 'ict730'), topic('ICT 740', 'ict740'), topic('ICT 750', 'ict750'), topic('ICT সমগ্র', 'ictAll'))
    ]
  },
  GK: {
    title: 'সাধারণ জ্ঞান',
    categories: [
      cat('বাংলাদেশ', topic('এ_TO_Z বাংলাদেশ ১', 'AtoZbd1'), topic('বাংলাদেশের সংবিধান', 'bangladesherSongbidhan/bangladeher_songbidhan'), topic('বাংলাদেশ জ্ঞান সমগ্র', 'gkAll'), topic('গণমাধ্যম প্রযুক্তি', 'gonomadhomProjukti/gonomadhom_projukti'), topic('জাতীয় বিষয়বলি', 'jatiyaBisoyboli/jatiyoBisoyaboli'), topic('কিস্তি সংস্কৃতি', 'jatiyaBisoyboli/kistiSongskriti'), topic('মুক্তিযুদ্ধ ১৯৭১', 'jatiyaBisoyboli/muktijhdhdo1971'), topic('প্রাচীন ও বর্তমান ইতিহাস', 'jatiyaBisoyboli/prachin_bortomanHistory'), topic('প্রথম মহিলা বাংলাদেশ', 'jatiyaBisoyboli/prothom_mohilaBD'), topic('ভাষা আন্দোলন', 'jatiyaBisoyboli/vashaAnddolon'), topic('জাতীয় অর্জন', 'jatiyoOrjon/jatiyoOrjonBD'), topic('জনসংখ্যা', 'jonesumari/jonesumari'), topic('খেলাধুলা চলচিত্র', 'kheladhulaCholochitra/kheladhula_colochitra'), topic('কৃষি সম্পদ', 'krisijSompod/krishij_sompod'), topic('অর্থনীতি', 'orthoniti/orthonitibd'), topic('প্রতিষ্ঠান সমূহ', 'prothisthanSomuho/protisthan_somuho'), topic('রাজনৈতিক ও সরকার ব্যবস্থা', 'rajnoitikOsorkarBabostha/rajnoitikSorkar_babostha'), topic('শিল্প ও বাণিজ্য', 'shilpoBanijjo/shilpo_banijjo'))
    ]
  },
  gkInternational: {
    title: 'আন্তর্জাতিক সাধারণ জ্ঞান',
    categories: [
      cat('আন্তর্জাতিক সংস্থান', topic('জাতিসংঘ', 'antorjatikSongothon/UN_Jatisongho'), topic('আন্তর্জাতিক রাজনৈতিক jot', 'antorjatikSongothon/int_rajnoitikJot'), topic('মানব ও অধিকার সংস্থা', 'antorjatikSongothon/manobOdhikarSongstha'), topic('অর্থনৈতিক চুক্তি সংস্থা', 'antorjatikSongothon/orthonoitikCuktiSonstha')),
      cat('বর্তমান বিশ্ব', topic('বর্তমান বিশ্ব', 'currentWorld/currentWorld')),
      cat('আন্তর্জাতিক পরিবেশ', topic('আন্তর্জাতিক পরিবেশ', 'internationalEnviroment/internationalEnviroment')),
      cat('ইতিহাস ও রাজনীতি অঞ্চল', topic('বৈশ্বিক ইতিহাস', 'itihasVurajnitiOnchol/boishhikItihas'), topic('ইতিহাস ও রাজনীতি', 'itihasVurajnitiOnchol/itihasVurajnitiOnchol'), topic('নতুন পুরাতন নাম', 'itihasVurajnitiOnchol/notunPuratonNam'), topic('বিরাজনীতি', 'itihasVurajnitiOnchol/vurajniti')),
      cat('নিরাপত্তা চুক্তি', topic('নিরাপত্তা চুক্তি', 'nirapottaChuktti/nirapottaChuktti'), topic('রাজনৈতিক কূটনৈতিক পরিবার', 'nirapottaChuktti/rajnotikKutnitikPorivasha'))
    ]
  },
  noikotaMS: {
    title: 'নৈকত্য মোড়ক সিস্টেম',
    categories: [
      cat('মূল্যবোধ', topic('৯০২: মূল্যবোধ', 'mullobodh902')),
      cat('নৈতিকতা', topic('৯০১: নৈতিকতা', 'noitikota901')),
      cat('সুশাসন', topic('৯০৩: সুশাসন', 'sushason903'))
    ]
  },
  sadharonBiggan: {
    title: 'সাধারণ বিজ্ঞান',
    categories: [
      cat('জীববিজ্ঞান', topic('কোষ ও টিস্যু জেনেটিক্স', 'biology/koshTisueGenetics'), topic('প্রাণি বিদ্যা', 'biology/praniBidda'), topic('পতঙ্গ অনুবিজ্ঞান', 'biology/puttiOnubiggan'), topic('রোগ শাস্ত্র', 'biology/rogShastho'), topic('শরীরত্ব ও মানবদেহ', 'biology/sorirtottoManobdeh'), topic('উদ্ভিদ বিজ্ঞান', 'biology/udvhidBiggan')),
      cat('রসায়ন', topic('অ্যাসিড-ক্ষার-লবণ', 'chemistry/acidKharLobon'), topic('বিক্রিয়া ও তড়িৎকোষ', 'chemistry/bikriyaoToritKosh'), topic('ধাতু-খনিজ পদার্থ', 'chemistry/dhatuKhonijPodartho'), topic('ফলিত রসায়ন', 'chemistry/folitRosayon'), topic('জৈব ও অজৈব রসায়ন', 'chemistry/joiboOjoiboChemistry'), topic('পদার্থের গঠন ও অবস্থান', 'chemistry/podartherGothonObosthan')),
      cat('পদার্থবিজ্ঞান', topic('আলোক বিজ্ঞান', 'physics/alok_biggan'), topic('বিদ্যুৎ চুম্বকত্ব', 'physics/biddut_choumbokotto'), topic('বলবিদ্যা ও সক্তি', 'physics/bolbidda_sokti'), topic('পদার্থবিজ্ঞান XYZ', 'physics/physics_xyz'), topic('পরিমাপ যন্ত্রপাতি', 'physics/porimap_jontropati'), topic('পরমাণু তেজস্ক্রিয়তা & অaparikhতা', 'physics/pormanutejoskriyota_apikhikota'), topic('তরঙ্গ ও তাপ', 'physics/toronggo_tap')),
      cat('বিশ্বায়ন', topic('পৃথিবী ও মহাকাশ', 'uniqueTopics/Pritibi_mohakash'))
    ]
  },
  vugolPoribeshDM: {
    title: 'ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা',
    categories: [
      cat('দুর্যোগ ব্যবস্থাপনা', topic('প্রাকৃতিক দুর্যোগ ব্যবস্থাপনা', 'durjogBabosthapona/prakitikDurjogBabosthapona')),
      cat('পরিবেশ', topic('ভূতপরিবেশ', 'poribesh/vouto_Poribesh'), topic('বাংলাদেশের পরিবেশ', 'poribesh/bangladesher_poribesh'), topic('আবহাওয়া জলবায়ু', 'poribesh/abohaoyaJolobayu')),
      cat('ভূগোল', topic('ভূগোল', 'vugol/vugol'))
    ]
  }
}
