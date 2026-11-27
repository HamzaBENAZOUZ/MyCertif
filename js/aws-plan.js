// Onglet « Suivi » > cursus AWS : SAA-C03 (Solutions Architect Associate) puis SCS-C03 (Security Specialty).
// Contrairement au planning Splunk (dates figées), ce planning est CALCULÉ : liste de tâches (sections Udemy,
// résumés + QCM MyCertif, examens blancs, révisions) rangées dans les créneaux du rythme choisi.
// Changer le rythme, la date de début ou « recaler sur aujourd'hui » recalcule les dates ; les cases cochées
// suivent la tâche (id stable), pas la date. Données : clé « aws » de la ligne splunk_suivi (via js/suivi.js).

/* ------------------------------------------------------------------ contenu des formations */
// Sommaires Udemy relevés le 27/11/2026 : [n°, titre, sessions, minutes de vidéo]
const SAA = [
  [1, "Introduction - AWS Certified Solutions Architect Associate", 6, 15], [2, "Code & Slides Download", 1, 1], [3, "Getting started with AWS", 3, 13],
  [4, "IAM & AWS CLI", 20, 57], [5, "EC2 Fundamentals", 16, 97], [6, "EC2 - Solutions Architect Associate Level", 9, 35], [7, "EC2 Instance Storage", 14, 59],
  [8, "High Availability and Scalability: ELB & ASG", 17, 94], [9, "AWS Fundamentals: RDS + Aurora + ElastiCache", 14, 70], [10, "Route 53", 20, 85],
  [11, "Classic Solutions Architecture Discussions", 7, 43], [12, "Amazon S3 Introduction", 14, 50], [13, "Advanced Amazon S3", 8, 30], [14, "Amazon S3 Security", 17, 60],
  [15, "CloudFront & AWS Global Accelerator", 7, 33], [16, "AWS Storage Extras", 10, 37], [17, "Decoupling applications: SQS, SNS, Kinesis, Active MQ", 16, 81],
  [18, "Containers on AWS: ECS, Fargate, ECR & EKS", 11, 54], [19, "Serverless Overviews from a Solution Architect Perspective", 18, 83],
  [20, "Serverless Solution Architecture Discussions", 4, 16], [21, "Databases in AWS", 10, 25], [22, "Data & Analytics", 12, 48], [23, "Machine Learning", 12, 26],
  [24, "AWS Monitoring & Audit: CloudWatch, CloudTrail & Config", 18, 79], [25, "Identity and Access Management (IAM) - Advanced", 10, 49],
  [26, "AWS Security & Encryption: KMS, SSM Parameter Store, Shield, WAF", 21, 86], [27, "Networking - VPC", 38, 160], [28, "Disaster Recovery & Migrations", 11, 44],
  [29, "More Solution Architectures", 5, 27], [30, "Other Services", 15, 48], [31, "WhitePapers and Architectures", 4, 15], [32, "Preparing for the Exam + Practice Exam", 8, 17],
  [33, "Congratulations", 3, 9],
];
const SCS = [
  [1, "Important Course Information", 3, 4], [2, "Code and Slides Download", 1, 1], [3, "Domain 1 - Detection", 45, 172], [4, "Domain 2 - Incident Response", 25, 98],
  [5, "Domain 3 - Infrastructure Security", 48, 194], [6, "Domain 4 - Identity and Access Management", 45, 173], [7, "Domain 5 - Data Protection", 53, 192],
  [8, "Domain 6 - Security Foundations and Governance", 29, 99], [9, "Other Services", 23, 65], [10, "Exam Preparation", 4, 12], [11, "Congratulations", 3, 9],
];
// Chapitres MyCertif AWS (livre de D. Clinton + compléments Bonso / Neal Davis) : id → titre
const CH = {
  200: ["Test d'évaluation", "Assessment test"], 201: ["Introduction au cloud et à AWS", "Introduction to cloud computing and AWS"], 202: ["Services de calcul", "Compute services"],
  203: ["Stockage AWS", "AWS storage"], 204: ["Amazon VPC", "Amazon VPC"], 205: ["Bases de données", "Database services"], 206: ["IAM", "IAM"],
  207: ["CloudTrail, CloudWatch, Config", "CloudTrail, CloudWatch, Config"], 208: ["Route 53 et CloudFront", "Route 53 and CloudFront"],
  209: ["Ingestion et analyse de données", "Data ingestion and analytics"], 210: ["Architectures résilientes", "Resilient architectures"],
  211: ["Architectures performantes", "High-performing architectures"], 212: ["Architectures sécurisées", "Secure architectures"], 213: ["Architectures optimisées en coûts", "Cost-optimized architectures"],
};
const FACTOR = 1.5;   // vidéo × 1,5 = vidéo + refaire les hands-on + fiches

// Plan SAA : groupes de sections Udemy, puis le chapitre MyCertif qui consolide ce bloc
const SAA_PLAN = [
  { ph: 1, secs: [1, 2, 3], ch: [201] }, { ph: 1, secs: [4] }, { ph: 1, secs: [5] }, { ph: 1, secs: [6, 7] },
  { ph: 2, secs: [8] }, { ph: 2, secs: [9] }, { ph: 2, secs: [10] }, { ph: 2, secs: [11] },
  { ph: 3, secs: [12, 13] }, { ph: 3, secs: [14] }, { ph: 3, secs: [15], ch: [208] }, { ph: 3, secs: [16], ch: [203] },
  { ph: 4, secs: [17] }, { ph: 4, secs: [18] }, { ph: 4, secs: [19, 20], ch: [202] }, { ph: 4, secs: [21], ch: [205] },
  { ph: 5, secs: [22, 23], ch: [209] }, { ph: 5, secs: [24], ch: [207] }, { ph: 5, secs: [25], ch: [206] }, { ph: 5, secs: [26], ch: [212] },
  { ph: 6, secs: [27], ch: [204] }, { ph: 6, secs: [28], ch: [210] }, { ph: 6, secs: [29, 30], ch: [211] }, { ph: 6, secs: [31], ch: [213] },
];
const SCS_PLAN = [
  { ph: 9, secs: [1, 2, 3], ch: [207] }, { ph: 9, secs: [4] },
  { ph: 10, secs: [5], ch: [204] }, { ph: 10, secs: [6], ch: [206] },
  { ph: 11, secs: [7], ch: [212] }, { ph: 11, secs: [8, 9] },
];
const PHASES = {
  1: ["SAA 1 · Fondamentaux : IAM, EC2", "SAA 1 · Basics: IAM, EC2"], 2: ["SAA 2 · Haute dispo, RDS, Route 53", "SAA 2 · HA, RDS, Route 53"],
  3: ["SAA 3 · S3, CloudFront, stockage", "SAA 3 · S3, CloudFront, storage"], 4: ["SAA 4 · Découplage, conteneurs, serverless", "SAA 4 · Decoupling, containers, serverless"],
  5: ["SAA 5 · Data, monitoring, sécurité", "SAA 5 · Data, monitoring, security"], 6: ["SAA 6 · VPC, DR, architectures", "SAA 6 · VPC, DR, architectures"],
  7: ["SAA 7 · Examens blancs", "SAA 7 · Practice exams"], 8: ["Examen SAA-C03", "SAA-C03 exam"],
  9: ["SCS 1 · Détection, réponse aux incidents", "SCS 1 · Detection, incident response"], 10: ["SCS 2 · Infra, IAM", "SCS 2 · Infrastructure, IAM"],
  11: ["SCS 3 · Données, gouvernance", "SCS 3 · Data, governance"], 12: ["SCS 4 · Examens blancs", "SCS 4 · Practice exams"], 13: ["Examen SCS-C03", "SCS-C03 exam"],
};
const TYPES = ["cours", "qcm", "blanc", "revision", "examen"];
const TYPE_L = { cours: ["Cours", "Course"], qcm: ["QCM MyCertif", "MyCertif quiz"], blanc: ["Examen blanc", "Practice exam"], revision: ["Révision", "Review"], examen: ["Examen", "Exam"] };

// Tâche : { id, cert, ph, type, min, fr, en, src, ch?, long?, flex?, pt?, exam? }
function buildTasks() {
  const T = [];
  const add = t => T.push(t);
  const course = (cert, list, plan, srcFr) => {
    for (const g of plan) {
      const secs = g.secs.map(n => list.find(x => x[0] === n));
      const video = secs.reduce((a, x) => a + x[3], 0), work = Math.round(video * FACTOR);
      const parts = Math.max(1, Math.round(work / 60)), each = Math.max(15, Math.round(work / parts / 5) * 5);
      const label = secs.map(x => `${x[0]}. ${x[1]}`).join(" + ");
      const nSess = secs.reduce((a, x) => a + x[2], 0);
      for (let k = 1; k <= parts; k++) {
        const p = parts > 1 ? ` (${k}/${parts})` : "";
        add({ id: `${cert}-s${g.secs.join("_")}-${k}`, cert, ph: g.ph, type: "cours", min: each,
          fr: `Vidéos + hands-on${p} : ${label}`, en: `Videos + hands-on${p}: ${label}`,
          src: `${srcFr} · ${nSess} sessions · ${fmtMin(video)} de vidéo`, srcEn: `${srcFr} · ${nSess} lectures · ${fmtMin(video)} of video` });
      }
      for (const c of g.ch || []) add(cert === "saa"
        ? { id: `${cert}-ch${c}`, cert, ph: g.ph, type: "qcm", min: 45, ch: c,
            fr: `Lire le résumé MyCertif « ${CH[c][0]} » (avec les compléments Neal Davis) puis faire le QCM du chapitre : viser ≥ 80 %`,
            en: `Read the MyCertif summary “${CH[c][1]}” (with the Neal Davis notes) then take the chapter quiz: aim for ≥ 80 %`, src: "MyCertif · AWS_CH" + String(c - 200).padStart(2, "0") }
        : { id: `${cert}-ch${c}`, cert, ph: g.ph, type: "qcm", min: 30, ch: c,
            fr: `Rafraîchir les bases SAA utiles ici : QCM MyCertif « ${CH[c][0]} » en mode mélangé`,
            en: `Refresh the SAA basics used here: MyCertif quiz “${CH[c][1]}” shuffled`, src: "MyCertif · AWS_CH" + String(c - 200).padStart(2, "0") });
    }
  };
  const flexTrio = (cert, ph, k) => {
    add({ id: `${cert}-rv${k}a`, cert, ph, type: "revision", min: 45, flex: true,
      fr: "Révision ciblée : mode « Mes erreurs » de MyCertif sur l'onglet AWS + relire les slides des services ratés",
      en: "Targeted review: MyCertif “My mistakes” mode on the AWS tab + re-read the slides of the services you missed", src: "MyCertif + slides Udemy (PDF)" });
    add({ id: `${cert}-rv${k}b`, cert, ph, type: "revision", min: 45, flex: true,
      fr: "Révision par domaine : QCM « domaine » MyCertif (30 questions) puis fiche des pièges notés",
      en: "Review by domain: MyCertif “domain” quiz (30 questions) then your notes on the traps", src: "MyCertif" });
    add({ id: `${cert}-rv${k}c`, cert, ph, type: "revision", min: 45, flex: true,
      fr: "Hands-on de consolidation : refaire dans la console AWS le lab du service le plus raté au dernier examen blanc, puis tout supprimer",
      en: "Consolidation hands-on: redo in the AWS console the lab of the service you missed most in the last practice exam, then delete everything", src: "AWS Free Tier" });
  };
  const blanc = (cert, ph, id, nameFr, nameEn, q, min, src) => {
    add({ id: `${cert}-${id}`, cert, ph, type: "blanc", min, long: true, pt: id,
      fr: `${nameFr} : passage chronométré (${q} questions, ${min} min), sans pause ni aide. Noter le score`, en: `${nameEn}: timed run (${q} questions, ${min} min), no breaks, no help. Record the score`, src });
    add({ id: `${cert}-${id}-c1`, cert, ph, type: "revision", min: 60,
      fr: `${nameFr} : correction, partie 1. Lire l'explication de CHAQUE question (même les justes) et noter chaque service mal compris`,
      en: `${nameEn}: review part 1. Read the explanation of EVERY question (even the right ones) and write down each service you misunderstood`, src });
    add({ id: `${cert}-${id}-c2`, cert, ph, type: "revision", min: 45,
      fr: `${nameFr} : correction, partie 2, puis revoir les sections Udemy des points faibles`, en: `${nameEn}: review part 2, then rewatch the Udemy sections on weak points`, src });
  };

  /* ===== SAA-C03 ===== */
  add({ id: "saa-start", cert: "saa", ph: 1, type: "revision", min: 45,
    fr: "Démarrage : faire le test d'évaluation MyCertif AWS (35 Q) pour mesurer le point de départ, créer le compte AWS Free Tier et une alerte AWS Budgets à 5 $",
    en: "Kick-off: take the MyCertif AWS assessment test (35 Q) to measure your starting point, create the AWS Free Tier account and a $5 AWS Budgets alert", src: "MyCertif · AWS_TEST", ch: 200 });
  course("saa", SAA, SAA_PLAN, "Ultimate AWS SAA-C03 (Maarek)");
  add({ id: "saa-s32", cert: "saa", ph: 7, type: "cours", min: 30, fr: "Vidéos : 32. Preparing for the Exam (conseils, ESL +30 min, bon de -50 %)", en: "Videos: 32. Preparing for the Exam (tips, ESL +30 min, 50% voucher)", src: "Ultimate AWS SAA-C03 (Maarek) · 8 sessions · 17 min" });
  add({ id: "saa-bilan", cert: "saa", ph: 7, type: "revision", min: 60, flex: true,
    fr: "Bilan MyCertif : refaire tous les chapitres AWS sous 80 % (onglet Progression : tableau des chapitres)", en: "MyCertif check: redo every AWS chapter under 80 % (Progress tab: chapter table)", src: "MyCertif" });
  blanc("saa", 7, "pe0", "Examen blanc du cours Ultimate", "Ultimate course practice exam", 65, 130, "Ultimate AWS SAA-C03 (Maarek) · section 32");
  for (let k = 1; k <= 6; k++) {
    flexTrio("saa", 7, k);
    blanc("saa", 7, "pt" + k, `Practice Test #${k}`, `Practice Test #${k}`, 65, 130, "Practice Exams SAA-C03 (Maarek & Singh)");
  }
  add({ id: "saa-final", cert: "saa", ph: 8, type: "revision", min: 60,
    fr: "Révision finale : relire les 13 encadrés « À retenir pour l'examen » de MyCertif + tes notes de correction",
    en: "Final review: re-read the 13 MyCertif “Exam essentials” boxes + your review notes", src: "MyCertif" });
  add({ id: "saa-logi", cert: "saa", ph: 8, type: "revision", min: 30,
    fr: "Logistique : vérifier la convocation, la pièce d'identité, et (si OnVUE) faire le test système de Pearson VUE. Se coucher tôt",
    en: "Logistics: check the booking, your ID, and (if OnVUE) run the Pearson VUE system test. Go to bed early", src: "Pearson VUE" });
  add({ id: "saa-exam", cert: "saa", ph: 8, type: "examen", min: 160, long: true, exam: "saa",
    fr: "PASSAGE de l'examen AWS SAA-C03 (65 Q, 130 min + 30 min ESL si demandé)", en: "SAA-C03 EXAM (65 Q, 130 min + 30 min ESL if requested)", src: "Pearson VUE · 150 $" });

  /* ===== SCS-C03 ===== */
  add({ id: "scs-mini", cert: "scs", ph: 9, type: "blanc", min: 70, pt: "mini",
    fr: "Diagnostic : Mini Practice Test SCS-C03 (35 Q, ~70 min) pour voir ce que la SAA t'a déjà apporté", en: "Diagnostic: SCS-C03 Mini Practice Test (35 Q, ~70 min) to see what the SAA already gave you",
    src: "Practice Exams SCS-C03 (Maarek & Singh)" });
  course("scs", SCS, SCS_PLAN, "Ultimate AWS SCS-C03 (Maarek)");
  add({ id: "scs-s10", cert: "scs", ph: 12, type: "cours", min: 30, fr: "Vidéos : 10. Exam Preparation + 11. Congratulations", en: "Videos: 10. Exam Preparation + 11. Congratulations", src: "Ultimate AWS SCS-C03 (Maarek) · 7 sessions · 21 min" });
  for (let k = 1; k <= 3; k++) {
    flexTrio("scs", 12, k);
    blanc("scs", 12, "pt" + k, `Main Practice Test #${k}`, `Main Practice Test #${k}`, 65, 170, "Practice Exams SCS-C03 (Maarek & Singh)");
  }
  add({ id: "scs-final", cert: "scs", ph: 13, type: "revision", min: 60,
    fr: "Révision finale : tes notes de correction + les tableaux KMS / IAM / logs du cours", en: "Final review: your review notes + the KMS / IAM / logging tables of the course", src: "Ultimate AWS SCS-C03 (Maarek)" });
  add({ id: "scs-logi", cert: "scs", ph: 13, type: "revision", min: 30,
    fr: "Logistique : convocation, pièce d'identité, test système OnVUE. Vérifier que le bon de -50 % est appliqué", en: "Logistics: booking, ID, OnVUE system test. Check that the 50% voucher was applied", src: "Pearson VUE" });
  add({ id: "scs-exam", cert: "scs", ph: 13, type: "examen", min: 200, long: true, exam: "scs",
    fr: "PASSAGE de l'examen AWS SCS-C03 (65 Q, 170 min + 30 min ESL, en anglais)", en: "SCS-C03 EXAM (65 Q, 170 min + 30 min ESL, in English)", src: "Pearson VUE · 300 $ (150 $ avec le bon -50 %)" });
  return T;
}
function fmtMin(m) { const h = Math.floor(m / 60), r = m % 60; return h ? `${h} h${r ? " " + String(r).padStart(2, "0") : ""}` : `${r} min`; }
const TASKS = buildTasks();
const BY_ID = new Map(TASKS.map((t, i) => [t.id, i]));
const PTS = { saa: ["pe0", "pt1", "pt2", "pt3", "pt4", "pt5", "pt6"], scs: ["mini", "pt1", "pt2", "pt3"] };

/* ------------------------------------------------------------------ rythmes */
// minutes par jour, du lundi au dimanche
const PRESETS = {
  leger: { d: [60, 0, 0, 60, 0, 150, 60], fr: "Léger", en: "Light" },
  normal: { d: [60, 0, 60, 60, 0, 180, 60], fr: "Normal", en: "Normal" },
  intensif: { d: [60, 60, 60, 60, 0, 180, 150], fr: "Intensif", en: "Intensive" },
};
const DAY_OPTS = [0, 45, 60, 75, 90, 120, 150, 180, 240];
const HOLIDAYS = ["12-24", "12-25", "12-31", "01-01"];

const EXAMS = {
  saa: { code: "SAA-C03", name: "AWS Certified Solutions Architect – Associate", q: 65, dur: 130, pass: "720 / 1000", price: 150,
    lang: { fr: "Français disponible (ou anglais + 30 min ESL)", en: "French available (or English + 30 min ESL)" },
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
  scs: { code: "SCS-C03", name: "AWS Certified Security – Specialty", q: 65, dur: 170, pass: "750 / 1000", price: 300,
    lang: { fr: "Pas de français : anglais (demander l'aménagement ESL + 30 min)", en: "No French: English (request the ESL + 30 min accommodation)" },
    domains: "Détection 16 % · Réponse aux incidents 14 % · Sécurité de l'infra 18 % · IAM 20 % · Protection des données 18 % · Gouvernance 14 %",
    url: "https://aws.amazon.com/certification/certified-security-specialty/" },
};
const RES = [
  { fr: "Ultimate AWS Certified Solutions Architect Associate (Udemy)", u: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
  { fr: "Practice Exams SAA-C03 – 6 × 65 Q (Udemy)", u: "https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate/" },
  { fr: "Ultimate AWS Certified Security Specialty SCS-C03 (Udemy)", u: "https://www.udemy.com/course/ultimate-aws-certified-security-specialty/" },
  { fr: "Practice Exams SCS-C03 – mini 35 + 3 × 65 Q (Udemy)", u: "https://www.udemy.com/course/practice-exams-aws-certified-security-specialty/" },
  { fr: "Guide officiel de l'examen SAA-C03", en: "Official SAA-C03 exam guide", u: "https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html" },
  { fr: "Guide officiel de l'examen SCS-C03", en: "Official SCS-C03 exam guide", u: "https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html" },
  { fr: "Compte AWS Certification (inscription, ESL, bon -50 %)", en: "AWS Certification account (booking, ESL, 50% voucher)", u: "https://www.aws.training/certification" },
  { fr: "Avantages AWS Certification (bon de -50 % sur l'examen suivant)", en: "AWS Certification benefits (50% off the next exam)", u: "https://aws.amazon.com/certification/benefits/" },
  { fr: "AWS Free Tier (pour les hands-on)", en: "AWS Free Tier (for the hands-on)", u: "https://aws.amazon.com/free/" },
];

/* ------------------------------------------------------------------ textes */
const L = {
  fr: {
    title: "Cursus AWS", tabPlan: "Planning", tabProg: "Progression", tabExams: "Examens", tabBudget: "Budget", tabRes: "Ressources",
    settings: "Réglages du planning", rhythm: "Rythme", custom: "Personnalisé", startDate: "Date de début", perWeek: "par semaine",
    holidays: "Pas de séance le 24, 25, 31 décembre et le 1er janvier", gap: "Pause entre les deux certifications", gapDays: "jours",
    replan: "Recaler sur aujourd'hui", replanHelp: "Les séances non faites repartent d'aujourd'hui (en retard ou en avance, le planning se recale).",
    replanDone: "Planning recalé à partir d'aujourd'hui", unanchor: "Annuler le recalage", reset: "Tout décocher",
    confirmReset: "Décocher toutes les séances du cursus AWS et effacer les notes et scores ?", resetDone: "Cursus remis à zéro",
    search: "Rechercher une séance…", allPhases: "Toutes les phases", allTypes: "Tous les types", hideDone: "Masquer les séances faites", gotoNext: "Aller à la prochaine séance",
    week: "Semaine", sessions: "séances", tasks: "tâches", late: "en retard", note: "Note", addNote: "+ note", noteph: "Tes notes…", noResults: "Aucune séance ne correspond aux filtres.",
    open: "Ouvrir", launch: "Lancer le QCM", best: "meilleur", never: "pas encore fait", score: "Score %", scoreph: "ex. 78",
    kTasks: "Tâches faites", kHours: "Heures faites", kLate: "En retard", kNext: "Prochain examen", of: "sur", inDays: "dans {n} j", today: "aujourd'hui",
    nextTitle: "Prochaine séance", markDone: "Tout marquer comme fait", nothingLeft: "Tout est fait. Bravo, double certifié !", byPhase: "Progression par phase",
    phase: "Phase", total: "TOTAL", ptTitle: "Scores des examens blancs", ptHelp: "Objectif : ≥ 80 % sur chaque Practice Test avant l'examen (Maarek garantit la réussite à ≥ 90 %). Saisis le score dans la séance.",
    chTitle: "QCM MyCertif AWS (meilleur score)", chHelp: "Calculé à partir de ton historique MyCertif. Vert : ≥ 80 %.",
    mile: "Jalon", mBook: "Réserver l'examen {c} pour le {d} (environ 3 semaines avant)", mEsl: "Demander une fois pour toutes l'aménagement ESL (+30 min) dans ton compte AWS Certification",
    mVoucher: "Récupérer le bon de -50 % (compte AWS Certification > Benefits) pour payer la SCS-C03 150 $ au lieu de 300 $", mCyber: "Soldes Udemy jusqu'au 30/11/2026 : acheter les 4 cours maintenant",
    plannedDate: "Date prévue par le planning", bookedDate: "Date réservée", margin: "Marge", ahead: "{n} j d'avance", behind: "{n} j de retard sur le planning", registered: "Inscrit", passed: "Réussi",
    fmt: "Format", passMark: "Score de réussite", price: "Prix", language: "Langue", domains: "Domaines",
    examNote: "Vérifié le 27/11/2026 sur aws.amazon.com. Repassage possible après 14 jours. Résultat sous 5 jours ouvrés. Certification valable 3 ans.",
    budgetIntro: "Prix Udemy relevés le 27/11/2026 (soldes Cyber Week jusqu'au 30/11). Prix des examens : aws.amazon.com. Le taux de change est réglable.",
    rate: "Taux de change (1 $ = x €)", item: "Poste", amount: "Montant", inEur: "En €", total2: "TOTAL (tout réussi du 1er coup, avec le bon -50 %)", retake: "Par repassage éventuel",
    resNote: "Les durées viennent des sommaires Udemy (SAA 27 h 25 de vidéo, SCS 16 h 57). Chaque séance compte 1,5 × la vidéo : le temps de refaire les hands-on et de prendre des notes.",
    synced: "Synchronisé", syncing: "Synchronisation…", offline: "Hors ligne : enregistré ici", err: "Erreur de synchronisation", local: "Enregistré sur cet appareil",
    end: "Fin du cursus", hTotal: "h de travail", h: "h", free: "Créneau libre (rattrapage)",
  },
  en: {
    title: "AWS path", tabPlan: "Schedule", tabProg: "Progress", tabExams: "Exams", tabBudget: "Budget", tabRes: "Resources",
    settings: "Schedule settings", rhythm: "Pace", custom: "Custom", startDate: "Start date", perWeek: "per week",
    holidays: "No session on Dec 24, 25, 31 and Jan 1", gap: "Break between the two certifications", gapDays: "days",
    replan: "Re-plan from today", replanHelp: "Sessions not done restart from today (late or ahead, the schedule follows).",
    replanDone: "Schedule re-planned from today", unanchor: "Undo re-plan", reset: "Uncheck all",
    confirmReset: "Uncheck every AWS session and clear notes and scores?", resetDone: "Path reset",
    search: "Search sessions…", allPhases: "All phases", allTypes: "All types", hideDone: "Hide completed sessions", gotoNext: "Go to next session",
    week: "Week", sessions: "sessions", tasks: "tasks", late: "overdue", note: "Note", addNote: "+ note", noteph: "Your notes…", noResults: "No session matches the filters.",
    open: "Open", launch: "Start the quiz", best: "best", never: "not done yet", score: "Score %", scoreph: "e.g. 78",
    kTasks: "Tasks done", kHours: "Hours done", kLate: "Overdue", kNext: "Next exam", of: "of", inDays: "in {n} d", today: "today",
    nextTitle: "Next session", markDone: "Mark all done", nothingLeft: "All done. Congratulations, double certified!", byPhase: "Progress by phase",
    phase: "Phase", total: "TOTAL", ptTitle: "Practice exam scores", ptHelp: "Goal: ≥ 80 % on every Practice Test before the exam (Maarek guarantees a pass at ≥ 90 %). Enter the score in the session.",
    chTitle: "MyCertif AWS quizzes (best score)", chHelp: "Computed from your MyCertif history. Green: ≥ 80 %.",
    mile: "Milestone", mBook: "Book the {c} exam for {d} (about 3 weeks ahead)", mEsl: "Request the ESL accommodation (+30 min) once in your AWS Certification account",
    mVoucher: "Get the 50% voucher (AWS Certification account > Benefits) to pay $150 instead of $300 for SCS-C03", mCyber: "Udemy sale until 30 Nov 2026: buy the 4 courses now",
    plannedDate: "Date from the schedule", bookedDate: "Booked date", margin: "Margin", ahead: "{n} d ahead", behind: "{n} d behind the schedule", registered: "Registered", passed: "Passed",
    fmt: "Format", passMark: "Passing score", price: "Price", language: "Language", domains: "Domains",
    examNote: "Checked on 27 Nov 2026 on aws.amazon.com. Retake after 14 days. Results within 5 business days. Valid 3 years.",
    budgetIntro: "Udemy prices noted on 27 Nov 2026 (Cyber Week sale until 30 Nov). Exam prices: aws.amazon.com. The exchange rate can be adjusted.",
    rate: "Exchange rate ($1 = x €)", item: "Item", amount: "Amount", inEur: "In €", total2: "TOTAL (all passed first time, with the 50% voucher)", retake: "Per possible retake",
    resNote: "Durations come from the Udemy outlines (SAA 27 h 25 of video, SCS 16 h 57). Each session counts 1.5 × the video: time to redo the hands-on and take notes.",
    synced: "Synced", syncing: "Syncing…", offline: "Offline: saved here", err: "Sync error", local: "Saved on this device",
    end: "Path ends", hTotal: "h of work", h: "h", free: "Free slot (catch-up)",
  },
};
const BUDGET = [
  { fr: "Udemy – Ultimate AWS SAA-C03", en: "Udemy – Ultimate AWS SAA-C03", amt: 24.99, cur: "€", st: { fr: "Prix soldé au 27/11", en: "Sale price on 27 Nov" } },
  { fr: "Udemy – Practice Exams SAA-C03", en: "Udemy – Practice Exams SAA-C03", amt: 24.99, cur: "€", st: { fr: "Prix soldé au 27/11", en: "Sale price on 27 Nov" } },
  { fr: "Udemy – Ultimate AWS SCS-C03", en: "Udemy – Ultimate AWS SCS-C03", amt: 24.99, cur: "€", st: { fr: "Estimation (prix absent de la page envoyée)", en: "Estimate (price missing from the page sent)" } },
  { fr: "Udemy – Practice Exams SCS-C03", en: "Udemy – Practice Exams SCS-C03", amt: 12.99, cur: "€", st: { fr: "Prix soldé au 27/11", en: "Sale price on 27 Nov" } },
  { fr: "Examen SAA-C03", en: "SAA-C03 exam", amt: 150, cur: "$", st: { fr: "Vérifié aws.amazon.com", en: "Checked aws.amazon.com" } },
  { fr: "Examen SCS-C03 (300 $ − bon de 50 % après la SAA)", en: "SCS-C03 exam ($300 − 50% voucher after the SAA)", amt: 150, cur: "$", st: { fr: "Vérifié aws.amazon.com", en: "Checked aws.amazon.com" } },
  { fr: "AWS Free Tier pour les hands-on (avec alerte Budgets)", en: "AWS Free Tier for the hands-on (with a Budgets alert)", amt: 0, cur: "€", st: { fr: "Gratuit si tu nettoies après chaque lab", en: "Free if you clean up after each lab" } },
];

/* ------------------------------------------------------------------ état */
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseD = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (b, n) => { const d = new Date(b); d.setDate(d.getDate() + n); return d; };
const todayD = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function defaultAws() {
  return { v: 1, start: "2026-11-30", preset: "normal", days: PRESETS.normal.d.slice(), hol: true, gap: 7, rate: 0.86,
    done: {}, notes: {}, scores: {}, anchor: null, exams: { saa: {}, scs: {} } };
}
export function normalizeAws(s) {
  const o = defaultAws();
  if (!s || typeof s !== "object") return o;
  if (typeof s.start === "string" && DATE_RE.test(s.start)) o.start = s.start;
  if (PRESETS[s.preset] || s.preset === "custom") o.preset = s.preset;
  if (Array.isArray(s.days) && s.days.length === 7 && s.days.every(n => DAY_OPTS.includes(n)) && s.days.some(n => n > 0)) o.days = s.days.slice();
  if (o.preset !== "custom") o.days = PRESETS[o.preset].d.slice();
  if (typeof s.hol === "boolean") o.hol = s.hol;
  if (Number.isInteger(s.gap) && s.gap >= 0 && s.gap <= 60) o.gap = s.gap;
  if (typeof s.rate === "number" && isFinite(s.rate) && s.rate > 0) o.rate = s.rate;
  for (const k of ["done", "notes", "scores"]) if (s[k] && typeof s[k] === "object") for (const id in s[k]) {
    if (!BY_ID.has(id)) continue; const v = s[k][id];
    if (k === "done" && (v === true || typeof v === "number")) o.done[id] = v === true ? 1 : v;
    if (k === "notes" && typeof v === "string" && v.trim()) o.notes[id] = v.slice(0, 5000);
    if (k === "scores" && typeof v === "number" && v >= 0 && v <= 100) o.scores[id] = v;
  }
  if (s.anchor && DATE_RE.test(s.anchor.date || "") && BY_ID.has(s.anchor.id)) o.anchor = { date: s.anchor.date, id: s.anchor.id };
  if (s.exams) for (const c of ["saa", "scs"]) { const x = s.exams[c] || {}; o.exams[c] = { registered: !!x.registered, passed: !!x.passed, ...(DATE_RE.test(x.date || "") ? { date: x.date } : {}) }; }
  return o;
}

/* ------------------------------------------------------------------ calcul du planning */
// Range les tâches dans les créneaux (jour → minutes). Une tâche « long » attend un créneau assez grand ;
// en attendant, les créneaux trop courts prennent une tâche « flex » plus loin dans la même certification.
export function schedule(S) {
  const cap = d => { if (S.hol && HOLIDAYS.includes(iso(d).slice(5))) return 0; return S.days[(d.getDay() + 6) % 7] || 0; };
  const maxCap = Math.max(...S.days);
  const sessions = [];   // { date, tasks: [idx], min, free? }
  const at = new Array(TASKS.length).fill(null);
  const queue = TASKS.map((t, i) => i);
  const anchorIdx = S.anchor ? BY_ID.get(S.anchor.id) : -1;
  let d = parseD(S.start), guard = 0, examEnd = null, anchored = anchorIdx < 0, gapDone = false;
  const place = (ses, qi) => { const i = queue[qi]; ses.tasks.push(i); ses.min += TASKS[i].min; at[i] = sessions.length; queue.splice(qi, 1); return TASKS[i]; };
  // tâche « flex » à avancer : seulement avant la prochaine tâche longue (une révision ne passe pas devant l'examen blanc suivant)
  const flexAt = (cert, room) => { for (let n = 1; n < queue.length; n++) { const x = TASKS[queue[n]]; if (x.cert !== cert || x.long) return -1; if (x.flex && x.min <= room + 10) return n; } return -1; };
  while (queue.length && guard++ < 5000) {
    if (!anchored && queue[0] >= anchorIdx) { anchored = true; d = parseD(S.anchor.date); }
    if (!gapDone && TASKS[queue[0]].cert === "scs") { gapDone = true; if (examEnd) { const st = addDays(examEnd, 1 + S.gap); if (st > d) d = st; } }
    const c = cap(d);
    if (c > 0) {
      const ses = { date: new Date(d), tasks: [], min: 0 }, cert = TASKS[queue[0]].cert;
      while (queue.length && TASKS[queue[0]].cert === cert && ses.min < c) {
        const h = TASKS[queue[0]], room = c - ses.min;
        if (!ses.tasks.length) {
          if (h.long && h.min > c + 10 && c < Math.min(maxCap, h.min)) {   // un créneau plus long viendra : on y garde la tâche longue
            const j = flexAt(cert, room); if (j > 0) { place(ses, j); continue; } break;
          }
          if (place(ses, 0).exam) { examEnd = new Date(d); break; }
          continue;
        }
        if (h.exam) break;
        if (h.min <= room + 10) { place(ses, 0); continue; }
        if (h.long) { const j = flexAt(cert, room); if (j > 0) { place(ses, j); continue; } }
        break;
      }
      sessions.push(ses.tasks.length ? ses : { ...ses, free: true });
    }
    d = addDays(d, 1);
  }
  return { sessions, at };
}

/* ------------------------------------------------------------------ module */
export function createAwsPlan({ getLang, esc, toast, getData, setData, statusOf, startChapter, chapterBest, onSwitch }) {
  let S = normalizeAws(getData());
  let tab = (() => { try { return localStorage.getItem("mycertif-aws-tab") || "plan"; } catch { return "plan"; } })();
  let root = null, openWeeks = null, plan = null;
  const filters = { q: "", phase: "", type: "", hide: false };
  const lang = () => (getLang() === "en" ? "en" : "fr");
  const t = (k, v) => { let s = L[lang()][k] ?? k; if (v) for (const x in v) s = s.replace(`{${x}}`, v[x]); return s; };
  const tl = o => (lang() === "en" ? o.en || o.fr : o.fr);
  const locale = () => (lang() === "fr" ? "fr-FR" : "en-GB");
  const fmtShort = d => d.toLocaleDateString(locale(), { day: "2-digit", month: "2-digit", year: "numeric" });
  const fmtDow = d => d.toLocaleDateString(locale(), { weekday: "short" });
  const fmtLong = d => d.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const num = (n, dg = 1) => Number(n).toLocaleString(locale(), { maximumFractionDigits: dg });
  const num2 = n => Number(n).toLocaleString(locale(), { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });
  const money = (n, cur) => (cur === "$" ? (lang() === "fr" ? num2(n) + " $" : "$" + num2(n)) : (lang() === "fr" ? num2(n) + " €" : "€" + num2(n)));
  const pct = n => Math.round(n * 100) + " %";
  const phL = p => PHASES[p][lang() === "en" ? 1 : 0];
  const typeL = x => TYPE_L[x][lang() === "en" ? 1 : 0];
  const isDone = i => !!S.done[TASKS[i].id];

  function save() { setData(JSON.parse(JSON.stringify(S))); plan = null; }
  function reload() { S = normalizeAws(getData()); plan = null; openWeeks = null; if (root) render(); }
  const P = () => plan || (plan = schedule(S));
  const dateOf = i => { const p = P(); return p.at[i] == null ? null : p.sessions[p.at[i]].date; };
  const weekOf = d => Math.floor((d - parseD(S.start)) / 864e5 / 7) + 1;

  function stats() {
    let n = 0, m = 0, M = 0, late = 0; const today = todayD();
    TASKS.forEach((x, i) => { M += x.min; if (isDone(i)) { n++; m += x.min; } else { const d = dateOf(i); if (d && d < today) late++; } });
    return { n, N: TASKS.length, h: m / 60, H: M / 60, late };
  }
  const nextIndex = () => TASKS.findIndex((x, i) => !isDone(i));
  const examDate = c => dateOf(BY_ID.get(c + "-exam"));
  const weeklyMin = () => S.days.reduce((a, b) => a + b, 0) - 0;

  /* ---------- rendu ---------- */
  const TABS = [["plan", "tabPlan"], ["prog", "tabProg"], ["exams", "tabExams"], ["budget", "tabBudget"], ["res", "tabRes"]];
  function render(el) {
    if (el) root = el;
    if (!root) return;
    const s = stats(), st = statusOf();
    const p = Math.round((s.n / s.N) * 100);
    const e1 = examDate("saa"), e2 = examDate("scs");
    root.innerHTML = `
    <section class="sv aw">
      <div class="sv-head">
        <div class="sv-ring" style="--p:${p}"><span class="mono">${p}%</span></div>
        <div class="sv-head-txt">
          <p class="mono kicker">&gt; aws certification path --saa-c03 --then scs-c03</p>
          <h1 class="glitch">${esc(t("title"))}</h1>
          <p class="muted sv-sub">SAA-C03 ${e1 ? "· " + esc(fmtShort(e1)) : ""} → SCS-C03 ${e2 ? "· " + esc(fmtShort(e2)) : ""} · ${s.n}/${s.N} ${esc(t("tasks"))}
            <span class="sv-status mono ${st}">${st ? (st === "synced" || st === "local" ? "✓ " : st === "syncing" ? "⟳ " : "⚠ ") + esc(t(st)) : ""}</span></p>
        </div>
      </div>
      <div class="seg sv-tabs" role="tablist">${TABS.map(([k, l]) => `<button class="seg-btn" role="tab" data-aw-tab="${k}" aria-pressed="${tab === k}" aria-selected="${tab === k}">${esc(t(l))}</button>`).join("")}</div>
      <div id="aw-body">${tab === "plan" ? planHtml() : tab === "prog" ? progHtml() : tab === "exams" ? examsHtml() : tab === "budget" ? budgetHtml() : resHtml()}</div>
    </section>`;
    bind();
  }

  function settingsHtml() {
    const wm = weeklyMin(), DAYS = lang() === "fr" ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const presetBtn = k => { const pr = PRESETS[k], h = pr.d.reduce((a, b) => a + b, 0) / 60; return `<button class="seg-btn" data-preset="${k}" aria-pressed="${S.preset === k}">${esc(tl(pr))} · ${num(h)} ${t("h")}</button>`; };
    return `<details class="panel sv-settings" ${S.preset === "custom" ? "open" : ""}><summary class="mono">⚙ ${esc(t("settings"))} <span class="muted">· ${num(wm / 60)} ${t("h")} ${esc(t("perWeek"))} · ${esc(fmtShort(parseD(S.start)))}</span></summary>
      <div class="sv-set-row">
        <div class="sv-field"><span class="mono">${esc(t("rhythm"))}</span><div class="seg sv-scen">${Object.keys(PRESETS).map(presetBtn).join("")}<button class="seg-btn" data-preset="custom" aria-pressed="${S.preset === "custom"}">${esc(t("custom"))}</button></div></div>
        <label class="sv-field"><span class="mono">${esc(t("startDate"))}</span><input type="date" id="aw-start" value="${S.start}"></label>
      </div>
      <div class="aw-days">${DAYS.map((dn, k) => `<label class="sv-field"><span class="mono">${dn}</span><select data-day="${k}">${DAY_OPTS.map(m => `<option value="${m}" ${S.days[k] === m ? "selected" : ""}>${m ? (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}` : `${m}min`) : "—"}</option>`).join("")}</select></label>`).join("")}</div>
      <div class="sv-set-row">
        <label class="sv-chk"><input type="checkbox" id="aw-hol" ${S.hol ? "checked" : ""}> ${esc(t("holidays"))}</label>
        <label class="sv-field"><span class="mono">${esc(t("gap"))}</span><select id="aw-gap">${[0, 3, 7, 14, 21].map(n => `<option value="${n}" ${S.gap === n ? "selected" : ""}>${n} ${esc(t("gapDays"))}</option>`).join("")}</select></label>
      </div>
      <div class="sv-set-row aw-actions">
        <button class="btn btn-primary btn-sm" id="aw-replan">↻ ${esc(t("replan"))}</button>
        ${S.anchor ? `<button class="btn btn-ghost btn-sm" id="aw-unanchor">${esc(t("unanchor"))}</button>` : ""}
        <button class="btn btn-ghost btn-sm" id="aw-reset">${esc(t("reset"))}</button>
      </div>
      <p class="muted small">${esc(t("replanHelp"))}</p>
    </details>`;
  }

  function milestones() {
    // jalons affichés en tête de la semaine où ils tombent
    const out = [], today = todayD();
    out.push({ d: parseD(S.start), txt: t("mCyber"), until: parseD("2026-11-30") });
    out.push({ d: parseD(S.start), txt: t("mEsl") });
    for (const c of ["saa", "scs"]) { const e = examDate(c); if (e && !(S.exams[c] || {}).registered) out.push({ d: addDays(e, -21), txt: t("mBook", { c: EXAMS[c].code, d: fmtShort(e) }) }); }
    const e1 = examDate("saa"); if (e1) out.push({ d: addDays(e1, 7), txt: t("mVoucher") });
    return out.filter(m => !m.until || today <= m.until);
  }

  function taskHtml(i, sessIdx) {
    const x = TASKS[i], done = isDone(i), note = S.notes[x.id] || "";
    let extra = "";
    if (x.ch && startChapter) {
      const b = chapterBest(x.ch);
      extra += `<button class="btn btn-ghost btn-xs" data-aw-ch="${x.ch}">▶ ${esc(t("launch"))}</button><span class="mono small ${b >= 80 ? "aw-ok" : "muted"}">${b >= 0 ? `${esc(t("best"))} ${b} %` : esc(t("never"))}</span>`;
    }
    if (x.pt) extra += `<label class="aw-score mono small">${esc(t("score"))} <input type="number" min="0" max="100" inputmode="numeric" data-aw-score="${x.id}" value="${S.scores[x.id] ?? ""}" placeholder="${esc(t("scoreph"))}"></label>`;
    return `<div class="aw-task${done ? " done" : ""}" id="aw-t-${i}">
      <label class="sv-cb"><input type="checkbox" data-aw-done="${i}" ${done ? "checked" : ""} aria-label="${esc(tl(x))}"><span></span></label>
      <div class="aw-tbody"><div class="sv-content"><span class="sv-badge mono aw-t-${x.type}">${esc(typeL(x.type))}</span>${esc(tl(x))} <span class="mono muted small">· ${fmtMin(x.min)}</span></div>
        <div class="muted small">${esc(lang() === "en" ? x.srcEn || x.src : x.src)}</div>
        ${extra ? `<div class="aw-extra">${extra}</div>` : ""}
        ${note ? `<div class="sv-note-prev mono">${esc(note)}</div>` : ""}</div>
      <div class="sv-notecell"><button class="btn btn-ghost btn-xs${note ? " on" : ""}" data-aw-note="${i}">${note ? "✎ " + esc(t("note")) : esc(t("addNote"))}</button></div>
    </div>`;
  }

  function planHtml() {
    const p = P(), q = filters.q.trim().toLowerCase(), today = todayD();
    const weeks = new Map();
    p.sessions.forEach((s, k) => { const w = weekOf(s.date); if (!weeks.has(w)) weeks.set(w, []); weeks.get(w).push(k); });
    const ni = nextIndex(), nw = ni >= 0 && dateOf(ni) ? weekOf(dateOf(ni)) : null;
    if (openWeeks === null) { openWeeks = new Set(); if (nw !== null) { openWeeks.add(nw); openWeeks.add(nw + 1); } }
    const ms = milestones();
    let html = "", shown = 0;
    for (const [w, ks] of weeks) {
      const allT = ks.flatMap(k => p.sessions[k].tasks);
      if (!allT.length) continue;
      const visT = new Set(allT.filter(i => {
        const x = TASKS[i];
        if (filters.phase && String(x.ph) !== filters.phase) return false; if (filters.type && x.type !== filters.type) return false; if (filters.hide && isDone(i)) return false;
        if (q) { const hay = [x.fr, x.en, x.src, phL(x.ph), typeL(x.type), S.notes[x.id] || ""].join(" ").toLowerCase(); if (!hay.includes(q)) return false; }
        return true;
      }));
      if (!visT.size) continue; shown += visT.size;
      const dn = allT.filter(isDone).length, first = p.sessions[ks[0]].date, monday = addDays(parseD(S.start), (w - 1) * 7);
      const hrs = allT.reduce((a, i) => a + TASKS[i].min, 0) / 60;
      const phases = [...new Set(allT.map(i => TASKS[i].ph))].map(phL).join(" · ");
      const open = q || filters.phase || filters.type || openWeeks.has(w);
      const wms = ms.filter(m => m.d >= monday && m.d < addDays(monday, 7) || (w === weeks.keys().next().value && m.d < monday));
      html += `<details class="sv-week" data-week="${w}" ${open ? "open" : ""}><summary>
        <span class="sv-wk-title mono">${esc(t("week"))} ${w}</span><span class="sv-wk-meta mono muted">${fmtShort(monday)} – ${fmtShort(addDays(monday, 6))} · ${ks.filter(k => p.sessions[k].tasks.length).length} ${esc(t("sessions"))} · ${num(hrs)} ${t("h")}</span>
        <span class="sv-wk-phase mono">${esc(phases)}</span><span class="sv-wk-prog mono"><span class="bar"><span style="width:${(dn / allT.length) * 100}%"></span></span>${dn}/${allT.length}</span></summary>
        ${wms.map(m => `<div class="aw-mile mono">★ ${esc(t("mile"))} · ${esc(m.txt)}</div>`).join("")}`;
      for (const k of ks) {
        const s = p.sessions[k];
        const tv = s.tasks.filter(i => visT.has(i));
        if (!tv.length && !(s.free && !q && !filters.phase && !filters.type && !filters.hide)) continue;
        const sDone = s.tasks.length && s.tasks.every(isDone), late = !sDone && s.tasks.length && s.date < today, isT = s.date.getTime() === today.getTime();
        const exam = s.tasks.some(i => TASKS[i].exam);
        html += `<div class="aw-sess${sDone ? " done" : ""}${isT ? " today" : ""}${exam ? " exam" : ""}${s.free ? " free" : ""}">
          <div class="aw-sh"><div class="sv-date mono"><span class="sv-dow">${esc(fmtDow(s.date))}</span> ${fmtShort(s.date)}</div>
          <div class="sv-dur mono">${s.free ? "" : fmtMin(s.min)}</div>${late ? `<span class="sv-late mono">${esc(t("late"))}</span>` : ""}</div>
          ${s.free ? `<div class="muted small mono aw-free">${esc(t("free"))}</div>` : tv.map(i => taskHtml(i, k)).join("")}
        </div>`;
      }
      html += `</details>`;
    }
    const phs = [...new Set(TASKS.map(x => x.ph))];
    return `${settingsHtml()}
      <div class="sv-filters">
        <input type="search" id="aw-q" placeholder="${esc(t("search"))}" value="${esc(filters.q)}">
        <select id="aw-phase"><option value="">${esc(t("allPhases"))}</option>${phs.map(x => `<option value="${x}" ${filters.phase === String(x) ? "selected" : ""}>${esc(phL(x))}</option>`).join("")}</select>
        <select id="aw-type"><option value="">${esc(t("allTypes"))}</option>${TYPES.map(x => `<option value="${x}" ${filters.type === x ? "selected" : ""}>${esc(typeL(x))}</option>`).join("")}</select>
        <label class="sv-chk"><input type="checkbox" id="aw-hide" ${filters.hide ? "checked" : ""}> ${esc(t("hideDone"))}</label>
        <button class="btn btn-ghost btn-sm" id="aw-goto">${esc(t("gotoNext"))}</button>
      </div>
      <div id="aw-weeks">${shown ? html : `<div class="panel muted mono" style="text-align:center">${esc(t("noResults"))}</div>`}</div>`;
  }

  function ptChart(c) {
    const ids = PTS[c].map(k => `${c}-${k}`), W = 320, H = 150, bw = W / ids.length;
    const bars = ids.map((id, k) => { const v = S.scores[id]; const h = v == null ? 0 : (v / 100) * (H - 30);
      const lab = id.split("-")[1].replace("pt", "#").replace("pe0", "C").replace("mini", "M");
      return `<g><rect x="${k * bw + 6}" y="${H - 18 - h}" width="${bw - 12}" height="${h}" rx="4" class="${v >= 80 ? "aw-bar-ok" : "aw-bar"}"></rect>
        <text x="${k * bw + bw / 2}" y="${H - 4}" text-anchor="middle" class="aw-ax">${lab}</text>
        ${v != null ? `<text x="${k * bw + bw / 2}" y="${H - 22 - h}" text-anchor="middle" class="aw-val">${v}</text>` : ""}</g>`; }).join("");
    const y80 = H - 18 - 0.8 * (H - 30);
    return `<svg viewBox="0 0 ${W} ${H}" class="aw-chart" role="img" aria-label="${esc(EXAMS[c].code)}"><line x1="0" x2="${W}" y1="${y80}" y2="${y80}" class="aw-80"></line><text x="${W - 2}" y="${y80 - 3}" text-anchor="end" class="aw-ax">80 %</text>${bars}</svg>`;
  }

  function progHtml() {
    const s = stats(), today = todayD();
    let nextExam = null;
    for (const c of ["saa", "scs"]) { if ((S.exams[c] || {}).passed) continue; const d = S.exams[c].date ? parseD(S.exams[c].date) : examDate(c); if (d) { nextExam = { c, d }; break; } }
    const kpi = (l, v, sub = "") => `<div class="stat"><span class="stat-val mono">${v}</span><span class="stat-lbl">${esc(l)}</span>${sub ? `<span class="stat-lbl">${sub}</span>` : ""}</div>`;
    const ni = nextIndex();
    let next;
    if (ni < 0) next = `<p>${esc(t("nothingLeft"))}</p>`;
    else {
      const p = P(), k = p.at[ni], ses = p.sessions[k], d = ses.date;
      next = `<div class="aw-next-h mono muted small">${esc(fmtLong(d))} · ${fmtMin(ses.min)}${d < today ? ` <span class="sv-late">${esc(t("late"))}</span>` : ""}</div>
        ${ses.tasks.filter(i => !isDone(i)).map(i => taskHtml(i, k)).join("")}
        <button class="btn btn-primary btn-sm" id="aw-mark-next" data-sess="${k}">✓ ${esc(t("markDone"))}</button>`;
    }
    let rowsH = "", tot = { n: 0, d: 0, h: 0, hd: 0 };
    for (const ph of [...new Set(TASKS.map(x => x.ph))]) {
      let n = 0, d = 0, h = 0, hd = 0; TASKS.forEach((x, i) => { if (x.ph !== ph) return; n++; h += x.min; if (isDone(i)) { d++; hd += x.min; } });
      tot.n += n; tot.d += d; tot.h += h; tot.hd += hd;
      rowsH += `<tr><td>${esc(phL(ph))}</td><td class="num">${d}/${n}</td><td class="num">${num(hd / 60)}/${num(h / 60)}</td><td class="num">${pct(h ? hd / h : 0)}</td></tr>`;
    }
    const chs = Object.keys(CH).map(Number).filter(c => c > 200);
    const chGrid = chs.map(c => { const b = chapterBest(c); return `<button class="aw-chip mono ${b >= 80 ? "ok" : b >= 0 ? "ko" : ""}" data-aw-ch="${c}" title="${esc(CH[c][lang() === "en" ? 1 : 0])}">CH${String(c - 200).padStart(2, "0")}<b>${b >= 0 ? b + "%" : "–"}</b></button>`; }).join("");
    const days = nextExam ? Math.round((nextExam.d - today) / 864e5) : null;
    return `<div class="stats sv-stats">
        ${kpi(t("kTasks"), `${s.n}<small>/${s.N}</small>`)}
        ${kpi(t("kHours"), `${num(s.h)}<small> ${t("h")}</small>`, `${t("of")} ${num(s.H)} ${t("h")} · ${pct(s.h / s.H)}`)}
        ${kpi(t("kLate"), `${s.late}`)}
        ${kpi(t("kNext"), nextExam ? esc(EXAMS[nextExam.c].code) : "—", nextExam ? esc(fmtShort(nextExam.d)) + " · " + esc(days === 0 ? t("today") : t("inDays", { n: days })) : "")}
      </div>
      <div class="sv-grid">
        <div class="panel sv-span"><h3 class="section-title mono">// ${esc(t("nextTitle"))}</h3>${next}</div>
        <div class="panel"><h3 class="section-title mono">// ${esc(t("ptTitle"))}</h3>
          <div class="aw-charts"><div><p class="mono small">SAA-C03</p>${ptChart("saa")}</div><div><p class="mono small">SCS-C03</p>${ptChart("scs")}</div></div>
          <p class="muted small">${esc(t("ptHelp"))}</p></div>
        <div class="panel"><h3 class="section-title mono">// ${esc(t("chTitle"))}</h3><div class="aw-chips">${chGrid}</div><p class="muted small">${esc(t("chHelp"))}</p></div>
        <div class="panel sv-span"><h3 class="section-title mono">// ${esc(t("byPhase"))}</h3><div class="sv-tw"><table><thead><tr><th>${esc(t("phase"))}</th><th class="num">${esc(t("tasks"))}</th><th class="num">${esc(t("h"))}</th><th class="num">%</th></tr></thead>
          <tbody>${rowsH}<tr class="sv-total"><td>${esc(t("total"))}</td><td class="num">${tot.d}/${tot.n}</td><td class="num">${num(tot.hd / 60)}/${num(tot.h / 60)}</td><td class="num">${pct(tot.hd / tot.h)}</td></tr></tbody></table></div></div>
      </div>`;
  }

  function examsHtml() {
    return `<div class="sv-exams">${["saa", "scs"].map(c => { const e = EXAMS[c], st = S.exams[c] || {}, pd = examDate(c);
      let margin = "";
      if (st.date && pd) { const n = Math.round((parseD(st.date) - pd) / 864e5); margin = n >= 0 ? t("ahead", { n }) : t("behind", { n: -n }); }
      return `<div class="panel sv-exam${st.passed ? " passed" : ""}"><p class="ch-num mono">${esc(e.code)}</p><h3>${esc(e.name)}</h3>
        <p><span class="muted">${esc(t("plannedDate"))} : </span><strong>${pd ? esc(fmtLong(pd)) : "—"}</strong></p>
        <label class="sv-field"><span class="mono">${esc(t("bookedDate"))}</span><input type="date" data-aw-booked="${c}" value="${st.date || ""}"></label>
        ${margin ? `<p class="small mono ${margin.includes("retard") || margin.includes("behind") ? "aw-warn" : "aw-ok"}">${esc(t("margin"))} : ${esc(margin)}</p>` : ""}
        <p class="muted small">${esc(t("fmt"))} : ${e.q} Q · ${e.dur} min<br>${esc(t("passMark"))} : ${e.pass}<br>${esc(t("price"))} : ${money(e.price, "$")}<br>${esc(t("language"))} : ${esc(e.lang[lang()])}${e.domains ? `<br>${esc(t("domains"))} : ${esc(e.domains)}` : ""}</p>
        <a class="btn btn-ghost btn-xs" href="${e.url}" target="_blank" rel="noopener">aws.amazon.com ↗</a>
        <div class="sv-checks"><label class="sv-chk"><input type="checkbox" data-aw-exam="${c}" data-k="registered" ${st.registered ? "checked" : ""}> ${esc(t("registered"))}</label>
        <label class="sv-chk"><input type="checkbox" data-aw-exam="${c}" data-k="passed" ${st.passed ? "checked" : ""}> ${esc(t("passed"))}</label></div></div>`; }).join("")}</div>
      <p class="scenario">${esc(t("examNote"))}</p>`;
  }

  function budgetHtml() {
    let tot = 0;
    const body = BUDGET.map(b => { const eur = b.cur === "$" ? b.amt * S.rate : b.amt; tot += eur;
      return `<tr><td>${esc(tl(b))}<div class="muted small sv-src">${esc(tl(b.st))}</div></td><td class="num">${money(b.amt, b.cur)}</td><td class="num">${money(eur, "€")}</td></tr>`; }).join("");
    return `<div class="panel"><p class="muted small">${esc(t("budgetIntro"))}</p>
      <label class="sv-field sv-rate"><span class="mono">${esc(t("rate"))}</span><input type="number" id="aw-rate" step="0.01" min="0" value="${S.rate}"></label>
      <div class="sv-tw"><table><thead><tr><th>${esc(t("item"))}</th><th class="num">${esc(t("amount"))}</th><th class="num">${esc(t("inEur"))}</th></tr></thead>
      <tbody>${body}<tr class="sv-total"><td>${esc(t("total2"))}</td><td></td><td class="num">${money(tot, "€")}</td></tr>
      <tr><td class="muted">${esc(t("retake"))} SAA / SCS</td><td class="num muted">${money(150, "$")} / ${money(300, "$")}</td><td class="num muted">${money(150 * S.rate, "€")} / ${money(300 * S.rate, "€")}</td></tr></tbody></table></div></div>`;
  }

  function resHtml() {
    return `<div class="sv-res">${RES.map(r => `<a class="panel sv-res-item" href="${esc(r.u)}" target="_blank" rel="noopener"><strong>${esc(tl(r))}</strong><span class="mono muted small">${esc(r.u.replace(/^https:\/\/(www\.)?/, "").split("/")[0])} ↗</span></a>`).join("")}</div>
      <p class="scenario">${esc(t("resNote"))}</p>`;
  }

  /* ---------- événements ---------- */
  function rerenderKeepScroll() { const y = scrollY; render(); scrollTo(0, y); }
  function bind() {
    const on = (sel, ev, fn) => { const el = root.querySelector(sel); if (el) el.addEventListener(ev, fn); };
    const keepOpen = () => { const d = root.querySelector(".sv-settings"); if (d) d.open = true; };
    root.querySelectorAll("[data-aw-tab]").forEach(b => (b.onclick = () => { tab = b.dataset.awTab; try { localStorage.setItem("mycertif-aws-tab", tab); } catch {} render(); scrollTo({ top: 0 }); }));
    root.querySelectorAll("[data-preset]").forEach(b => (b.onclick = () => { S.preset = b.dataset.preset; if (PRESETS[S.preset]) S.days = PRESETS[S.preset].d.slice(); openWeeks = null; save(); render(); keepOpen(); }));
    root.querySelectorAll("[data-day]").forEach(sel => sel.addEventListener("change", () => {
      const days = S.days.slice(); days[+sel.dataset.day] = +sel.value; if (!days.some(n => n > 0)) { sel.value = S.days[+sel.dataset.day]; return; }
      S.days = days; S.preset = Object.keys(PRESETS).find(k => PRESETS[k].d.join() === days.join()) || "custom"; openWeeks = null; save(); render(); keepOpen(); }));
    on("#aw-start", "change", e => { if (DATE_RE.test(e.target.value)) { S.start = e.target.value; openWeeks = null; save(); render(); keepOpen(); } });
    on("#aw-hol", "change", e => { S.hol = e.target.checked; save(); render(); keepOpen(); });
    on("#aw-gap", "change", e => { S.gap = +e.target.value; save(); render(); keepOpen(); });
    on("#aw-replan", "click", () => { const i = nextIndex(); if (i < 0) return; const td = todayD(), st = parseD(S.start); S.anchor = { date: iso(td > st ? td : st), id: TASKS[i].id }; openWeeks = null; save(); render(); toast(t("replanDone"), "ok"); });
    on("#aw-unanchor", "click", () => { S.anchor = null; openWeeks = null; save(); render(); keepOpen(); });
    on("#aw-reset", "click", () => { if (!confirm(t("confirmReset"))) return; S.done = {}; S.notes = {}; S.scores = {}; S.anchor = null; save(); render(); toast(t("resetDone"), "ok"); });
    on("#aw-q", "input", e => { filters.q = e.target.value; const pos = e.target.selectionStart; rerenderKeepScroll(); const q = root.querySelector("#aw-q"); q.focus(); q.setSelectionRange(pos, pos); });
    on("#aw-phase", "change", e => { filters.phase = e.target.value; rerenderKeepScroll(); });
    on("#aw-type", "change", e => { filters.type = e.target.value; rerenderKeepScroll(); });
    on("#aw-hide", "change", e => { filters.hide = e.target.checked; rerenderKeepScroll(); });
    on("#aw-goto", "click", () => {
      const i = nextIndex(); if (i < 0) { toast(t("nothingLeft"), "ok"); return; }
      Object.assign(filters, { q: "", phase: "", type: "", hide: false }); openWeeks.add(weekOf(dateOf(i))); render();
      const el = root.querySelector("#aw-t-" + i); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("flash"); }
    });
    on("#aw-mark-next", "click", e => { const s = P().sessions[+e.target.dataset.sess]; const now = Date.now(); s.tasks.forEach(i => { S.done[TASKS[i].id] = now; }); save(); render(); });
    on("#aw-rate", "change", e => { const v = parseFloat(e.target.value); if (isFinite(v) && v > 0) { S.rate = v; save(); render(); } });
    root.querySelectorAll("details.sv-week").forEach(d => d.addEventListener("toggle", () => { const w = +d.dataset.week; d.open ? openWeeks.add(w) : openWeeks.delete(w); }));
    root.querySelectorAll("[data-aw-done]").forEach(cb => cb.addEventListener("change", () => {
      const id = TASKS[+cb.dataset.awDone].id; if (cb.checked) S.done[id] = Date.now(); else delete S.done[id]; save(); rerenderKeepScroll(); }));
    root.querySelectorAll("[data-aw-ch]").forEach(b => (b.onclick = () => startChapter(+b.dataset.awCh)));
    root.querySelectorAll("[data-aw-score]").forEach(inp => inp.addEventListener("change", () => {
      const v = inp.value === "" ? null : Math.max(0, Math.min(100, Math.round(+inp.value))); const id = inp.dataset.awScore;
      if (v == null || !isFinite(v)) delete S.scores[id]; else { S.scores[id] = v; if (!S.done[id]) S.done[id] = Date.now(); }
      save(); rerenderKeepScroll(); }));
    root.querySelectorAll("[data-aw-booked]").forEach(inp => inp.addEventListener("change", () => {
      const c = inp.dataset.awBooked, x = S.exams[c] || (S.exams[c] = {}); if (DATE_RE.test(inp.value)) { x.date = inp.value; x.registered = true; } else delete x.date; save(); render(); }));
    root.querySelectorAll("[data-aw-exam]").forEach(cb => cb.addEventListener("change", () => {
      const x = S.exams[cb.dataset.awExam] || (S.exams[cb.dataset.awExam] = {}); x[cb.dataset.k] = cb.checked; save(); render(); }));
    root.querySelectorAll("[data-aw-note]").forEach(b => (b.onclick = () => {
      const i = +b.dataset.awNote, id = TASKS[i].id, row = b.closest(".aw-task"), ex = row.querySelector(".sv-note");
      if (ex) { ex.remove(); return; }
      const prev = row.querySelector(".sv-note-prev"); if (prev) prev.hidden = true;
      const div = document.createElement("div"); div.className = "sv-note";
      div.innerHTML = `<textarea placeholder="${esc(t("noteph"))}"></textarea>`; row.querySelector(".aw-tbody").appendChild(div);
      const ta = div.querySelector("textarea"); ta.value = S.notes[id] || ""; ta.focus();
      ta.addEventListener("input", () => { const v = ta.value; if (v.trim()) S.notes[id] = v; else delete S.notes[id]; save();
        b.classList.toggle("on", !!v.trim()); b.textContent = v.trim() ? "✎ " + t("note") : t("addNote"); });
      ta.addEventListener("blur", () => setTimeout(() => { if (document.activeElement !== b && root.contains(ta)) rerenderKeepScroll(); }, 150));
    }));
  }

  return { render, reload, detach: () => { root = null; } };
}
export const _test = { TASKS, schedule, normalizeAws, defaultAws, PRESETS };
