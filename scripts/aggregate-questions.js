const fs = require('fs');
const path = require('path');

const SUBJECT_FILES = {
  bangla: [
    'data/t20/bangla/banglaAll.json',
    'data/t20/bangla/literature/modhdhojug.json',
    'data/t20/bangla/literature/muktijudhdhovashaandolon.json',
    'data/t20/bangla/literature/prachinjug.json',
    'data/t20/bangla/grammar/theory/pokritioprotoy.json',
    'data/t20/bangla/grammar/theory/karokobivokti.json',
    'data/t20/bangla/grammar/writing/writing.json',
    'data/t20/banglaBakaron/bakkotottoOproyog/bakkoShudhikoron.json',
    'data/t20/banglaBakaron/bakkotottoOproyog/sobdherOrthoOproyog.json',
    'data/t20/banglaBakaron/bakaronicUpadan/prokitiProttoy.json',
    'data/t20/banglaBakaron/bakaronicUpadan/karokBivokti.json',
    'data/t20/bangla Sahitto/chorjapodPrachinOmodhojug/chorjapodPrachinjug.json',
    'data/t20/bangla Sahitto/chorjapodPrachinOmodhojug/modhdhojugOsahittoKormo.json',
    'data/t20/bangla Sahitto/adhunikJugerSuchona/sahittoSomajAcademy.json',
    'data/t20/bangla Sahitto/19thSahittik/robindranathThakur.json',
  ],
  english: [
    'data/t20/english/literature/literature.json',
    'data/t20/english/grammar/spelling/spelling.json',
    'data/t20/english/grammar/verb/verb482.json',
    'data/t20/english/grammar/voice/voice.json',
    'data/t20/english/grammar/vocabulary/vocabulary.json',
    'data/t20/english/grammar/tense/tense.json',
    'data/t20/englishGrammer/partsOfSpeech/noun.json',
    'data/t20/englishGrammer/partsOfSpeech/pronoun.json',
    'data/t20/englishGrammer/partsOfSpeech/adjective.json',
    'data/t20/englishGrammer/partsOfSpeech/prepositionConjuctionInterjuction.json',
    'data/t20/englishGrammer/sentencesTransformations/narrationDgree.json',
    'data/t20/englishGrammer/wordsVocabulary/synonym.json',
    'data/t20/englishGrammer/wordsVocabulary/antonym.json',
    'data/t20/englishGrammer/idiomsPhrases/idiomsAndPhrases.json',
  ],
  gk: [
    'data/t20/GK/gkAll.json',
    'data/t20/GK/jonosumari/jonosumari.json',
    'data/t20/GK/bangladesherSongbidhan/bangladeher_songbidhan.json',
    'data/t20/GK/kheladhulaCholochitra/kheladhula_colochitra.json',
    'data/t20/GK/shilpoBanijjo/shilpo_banijjo.json',
    'data/t20/GK/orthoniti/orthonitibd.json',
    'data/t20/GK/gonomadhomProjukti/gonomadhom_projukti.json',
    'data/t20/GK/jatiyaBisoyboli/jatiyoBisoyaboli.json',
    'data/t20/GK/jatiyaBisoyboli/muktijhdhdo1971.json',
    'data/t20/GK/prothisthanSomuho/protisthan_somuho.json',
    'data/t20/GK/rajnoitikOsorkarBabostha/rajnoitikSorkar_babostha.json',
    'data/t20/gkInternational/currentWorld/currentWorld.json',
    'data/t20/gkInternational/nirapottaChuktti/nirapottaChuktti.json',
    'data/t20/gkInternational/antorjatikSongothon/UN_Jatisongho.json',
    'data/t20/sadharonBiggan/physics/physics_xyz.json',
    'data/t20/sadharonBiggan/biology/praniBidda.json',
    'data/t20/sadharonBiggan/chemistry/acidKharLobon.json',
    'data/t20/vugolPoribeshDM/vugol/vugol.json',
    'data/t20/vugolPoribeshDM/poribesh/bangladesher_poribesh.json',
  ],
};

const outDir = path.join('data', 't20_aggregate');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const [subject, files] of Object.entries(SUBJECT_FILES)) {
  const all = [];
  for (const file of files) {
    const fullPath = path.join(file);
    if (!fs.existsSync(fullPath)) {
      console.error('Missing:', fullPath);
      continue;
    }
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (Array.isArray(data)) {
        data.forEach((q) => {
          all.push({
            ...q,
            subject,
          });
        });
      }
    } catch (e) {
      console.error('Error reading', file, e.message);
    }
  }
  const outPath = path.join(outDir, subject + '.json');
  fs.writeFileSync(outPath, JSON.stringify(all));
  console.log(subject + ' -> ' + all.length + ' questions');
}
