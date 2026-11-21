// Onglet « Examens » (route #/exams, #/exams/<section>) : fiche officielle de chaque examen — durée, coût,
// nombre de questions, score, lieu de passage, langues, validité, rattrapage, inscription.
// Données statiques vérifiées sur les sites officiels Splunk, Pearson VUE et AWS le 21/11/2026 (voir SOURCES).

const CHECKED = "2026-11-21";

/** sec = section de l'appli (guide = SPLK-1001, practice = SPLK-1002, aws = SAA-C03) ; admin n'a pas encore d'onglet. */
const EXAMS = [
  {
    id: "guide", code: "SPLK-1001", name: "Splunk Core Certified User", vendor: "splunk",
    quick: { min: 60, q: 60, price: "130 $", pass: null },
    fr: {
      lead: "L'examen d'entrée Splunk : 60 QCM en 60 minutes, 130 $, sans prérequis.",
      rows: [
        ["Durée", "60 minutes, dont 3 minutes pour lire et accepter l'accord de certification Splunk"],
        ["Questions", "60 questions à choix multiples"],
        ["Coût", "130 $ par tentative (chaque nouvelle tentative est payante)"],
        ["Score de réussite", "Non publié par Splunk. Réussi/échoué affiché tout de suite (provisoire), confirmé après analyse statistique"],
        ["Langues", "Anglais et japonais (pas de français)"],
        ["Lieu", "Pearson VUE : centre d'examen ou en ligne depuis chez soi (OnVUE)"],
        ["Prérequis", "Aucun"],
        ["Validité", "3 ans, renouvelée si tu obtiens Power User"],
        ["Documents", "Examen à livre fermé : aucun support autorisé"],
      ],
      topics: [["Recherche de base", 22], ["Utiliser les champs dans les recherches", 20], ["Fondamentaux du langage SPL", 15],
        ["Commandes de transformation de base", 15], ["Rapports et tableaux de bord", 12], ["Lookups", 6], ["Bases de Splunk", 5], ["Rapports planifiés et alertes", 5]],
      tip: "La recherche et les champs pèsent 42 % de la note : ce sont les chapitres à maîtriser en priorité.",
    },
    en: {
      lead: "Splunk's entry exam: 60 multiple-choice questions in 60 minutes, $130, no prerequisite.",
      rows: [
        ["Duration", "60 minutes, including 3 minutes to read and accept the Splunk Certification Agreement"],
        ["Questions", "60 multiple-choice questions"],
        ["Cost", "$130 per attempt (each retake is paid)"],
        ["Passing score", "Not published by Splunk. Pass/fail shown right away (provisional), confirmed after statistical analysis"],
        ["Languages", "English and Japanese (no French)"],
        ["Where", "Pearson VUE: test center or online from home (OnVUE)"],
        ["Prerequisite", "None"],
        ["Validity", "3 years, renewed when you earn Power User"],
        ["Materials", "Closed book: no reference material allowed"],
      ],
      topics: [["Basic searching", 22], ["Using fields in searches", 20], ["Search language fundamentals", 15],
        ["Using basic transforming commands", 15], ["Creating reports and dashboards", 12], ["Creating and using lookups", 6], ["Splunk basics", 5], ["Scheduled reports and alerts", 5]],
      tip: "Searching and fields are 42% of the score: master those chapters first.",
    },
  },
  {
    id: "practice", code: "SPLK-1002", name: "Splunk Core Certified Power User", vendor: "splunk",
    quick: { min: 60, q: 65, price: "130 $", pass: null },
    fr: {
      lead: "La suite du User : 65 QCM en 60 minutes, 130 $. Objets de connaissance, macros, data models et CIM.",
      rows: [
        ["Durée", "60 minutes, dont 3 minutes pour l'accord de certification"],
        ["Questions", "65 questions à choix multiples (moins d'une minute par question)"],
        ["Coût", "130 $ par tentative"],
        ["Score de réussite", "Non publié par Splunk"],
        ["Langues", "Anglais et japonais (pas de français)"],
        ["Lieu", "Pearson VUE : centre d'examen ou en ligne (OnVUE)"],
        ["Prérequis", "Aucun (le User est recommandé avant)"],
        ["Validité", "3 ans ; obtenir l'Admin (SPLK-1003) la renouvelle"],
        ["Ouvre la voie à", "Advanced Power User, Enterprise Certified Admin, Cloud Certified Admin"],
      ],
      topics: [["Corréler des événements", 15], ["Filtrer et mettre en forme les résultats", 10], ["Créer et gérer des champs", 10],
        ["Alias de champs et champs calculés", 10], ["Tags et types d'événements", 10], ["Macros", 10], ["Workflow actions", 10],
        ["Modèles de données (data models)", 10], ["Common Information Model (CIM)", 10], ["Commandes de transformation pour les visualisations", 5]],
    },
    en: {
      lead: "The step after User: 65 multiple-choice questions in 60 minutes, $130. Knowledge objects, macros, data models and CIM.",
      rows: [
        ["Duration", "60 minutes, including 3 minutes for the certification agreement"],
        ["Questions", "65 multiple-choice questions (under a minute each)"],
        ["Cost", "$130 per attempt"],
        ["Passing score", "Not published by Splunk"],
        ["Languages", "English and Japanese (no French)"],
        ["Where", "Pearson VUE: test center or online (OnVUE)"],
        ["Prerequisite", "None (User is recommended first)"],
        ["Validity", "3 years; earning Admin (SPLK-1003) renews it"],
        ["Leads to", "Advanced Power User, Enterprise Certified Admin, Cloud Certified Admin"],
      ],
      topics: [["Correlating events", 15], ["Filtering and formatting results", 10], ["Creating and managing fields", 10],
        ["Field aliases and calculated fields", 10], ["Tags and event types", 10], ["Macros", 10], ["Workflow actions", 10],
        ["Data models", 10], ["Common Information Model (CIM)", 10], ["Transforming commands for visualizations", 5]],
    },
  },
  {
    id: "admin", code: "SPLK-1003", name: "Splunk Enterprise Certified Admin", vendor: "splunk",
    quick: { min: 60, q: 56, price: "130 $", pass: null },
    fr: {
      lead: "Le niveau administrateur : 56 QCM en 60 minutes, 130 $. Il faut déjà avoir le Power User.",
      rows: [
        ["Durée", "60 minutes, dont 3 minutes pour l'accord de certification"],
        ["Questions", "56 questions à choix multiples"],
        ["Coût", "130 $ par tentative"],
        ["Score de réussite", "Non publié par Splunk"],
        ["Lieu", "Pearson VUE : centre d'examen ou en ligne (OnVUE)"],
        ["Prérequis", "Splunk Core Certified Power User"],
        ["Programme", "Installation, licences, apps, fichiers de configuration, utilisateurs et rôles, ingestion de données, forwarders, recherche distribuée, clusters"],
        ["Validité", "3 ans"],
      ],
      note: "Pas encore d'onglet QCM dans l'appli pour cet examen.",
    },
    en: {
      lead: "The admin level: 56 multiple-choice questions in 60 minutes, $130. Power User is required first.",
      rows: [
        ["Duration", "60 minutes, including 3 minutes for the certification agreement"],
        ["Questions", "56 multiple-choice questions"],
        ["Cost", "$130 per attempt"],
        ["Passing score", "Not published by Splunk"],
        ["Where", "Pearson VUE: test center or online (OnVUE)"],
        ["Prerequisite", "Splunk Core Certified Power User"],
        ["Topics", "Installation, licenses, apps, configuration files, users and roles, getting data in, forwarders, distributed search, clusters"],
        ["Validity", "3 years"],
      ],
      note: "No quiz tab in the app for this exam yet.",
    },
  },
  {
    id: "aws", code: "SAA-C03", name: "AWS Certified Solutions Architect – Associate", vendor: "aws",
    quick: { min: 130, q: 65, price: "150 $ / 128 €", pass: "720/1000" },
    fr: {
      lead: "65 questions en 130 minutes, 150 $ (128 €), il faut 720 sur 1 000. L'examen existe en français.",
      rows: [
        ["Durée", "130 minutes ; +30 minutes avec l'aménagement « ESL +30 » si tu passes l'examen en anglais"],
        ["Questions", "65 : 50 notées + 15 non notées (non signalées)"],
        ["Format", "Choix unique (1 bonne réponse sur 4) ou choix multiple (2 bonnes ou plus sur 5 ou plus)"],
        ["Coût", "150 $ ou 128 € ; -50 % sur le prochain examen AWS une fois certifié"],
        ["Score de réussite", "720 sur une échelle de 100 à 1 000, score global ; pas de pénalité pour une mauvaise réponse : réponds à tout"],
        ["Résultat", "Sous 5 jours ouvrés, onglet Exam History du compte AWS Certification"],
        ["Langues", "Français (France), anglais, espagnol, portugais (Brésil), japonais, coréen, chinois"],
        ["Lieu", "Pearson VUE : centre d'examen ou en ligne (surveillant en anglais 24 h/24)"],
        ["Expérience conseillée", "Au moins 1 an de conception sur AWS ; sans expérience IT, AWS conseille Cloud Practitioner d'abord. Aucun prérequis obligatoire"],
        ["Validité", "3 ans ; repasser la dernière version, ou obtenir Solutions Architect – Professional"],
        ["Rattrapage", "14 jours après un échec, tentatives illimitées, chacune payante"],
        ["Report / annulation", "Jusqu'à 24 h avant, sans frais ; 2 reports maximum par rendez-vous"],
      ],
      topics: [["Concevoir des architectures sécurisées", 30], ["Concevoir des architectures résilientes", 26],
        ["Concevoir des architectures performantes", 24], ["Concevoir des architectures optimisées en coûts", 20]],
      tip: "Aucune version SAA-C04 annoncée. ESL +30 : à demander avant de réserver, dans le compte AWS Certification (« Request Exam Accommodations »).",
    },
    en: {
      lead: "65 questions in 130 minutes, $150 (€128), 720 out of 1,000 to pass. Available in French.",
      rows: [
        ["Duration", "130 minutes; +30 minutes with the \"ESL +30\" accommodation when taking it in English"],
        ["Questions", "65: 50 scored + 15 unscored (not identified)"],
        ["Format", "Multiple choice (1 correct out of 4) or multiple response (2+ correct out of 5+)"],
        ["Cost", "$150 or €128; 50% off your next AWS exam once certified"],
        ["Passing score", "720 on a 100–1,000 scale, compensatory; no penalty for guessing: answer everything"],
        ["Result", "Within 5 business days, Exam History tab of the AWS Certification account"],
        ["Languages", "French (France), English, Spanish, Portuguese (Brazil), Japanese, Korean, Chinese"],
        ["Where", "Pearson VUE: test center or online (English proctors 24/7)"],
        ["Recommended experience", "At least 1 year designing on AWS; with no IT background, AWS suggests Cloud Practitioner first. No mandatory prerequisite"],
        ["Validity", "3 years; pass the latest version, or earn Solutions Architect – Professional"],
        ["Retake", "14 days after a failure, unlimited attempts, each one paid"],
        ["Reschedule / cancel", "Up to 24 h before, free; at most 2 reschedules per appointment"],
      ],
      topics: [["Design secure architectures", 30], ["Design resilient architectures", 26],
        ["Design high-performing architectures", 24], ["Design cost-optimized architectures", 20]],
      tip: "No SAA-C04 announced. ESL +30: request it before booking, in the AWS Certification account (\"Request Exam Accommodations\").",
    },
  },
];

const PRACTICAL = {
  fr: {
    reg: "// INSCRIPTION",
    regs: [
      ["Splunk", "Crée ton compte sur Cisco CertMetrics (un identifiant Splunk n'est plus nécessaire), puis réserve chez Pearson VUE. Paiement à la réservation ou par voucher, au moins 24 h avant le créneau.", "https://cp.certmetrics.com/cisco/en/login"],
      ["AWS", "Connecte-toi au compte AWS Certification, demande d'abord l'aménagement ESL +30 si tu passes en anglais, puis réserve chez Pearson VUE depuis ce compte.", "https://www.aws.training/certification"],
    ],
    name: "Dans les deux cas, le nom du compte doit être exactement celui de ta pièce d'identité.",
    where: "// EN CENTRE OU EN LIGNE",
    whereRows: [
      ["Centre Pearson VUE", "Plusieurs centres en France : recherche de centres sur la page Splunk de Pearson VUE ou depuis le compte AWS. Une pièce d'identité avec photo + une seconde pièce au même nom (Splunk) ; une pièce officielle, carte d'identité européenne acceptée (AWS)."],
      ["En ligne (OnVUE)", "Chez toi, pièce calme, bureau dégagé, webcam. Fais le test système avant le jour J sur le même ordinateur et au même endroit (droits administrateur nécessaires). Si l'ordinateur ne passe pas le jour J, c'est compté comme une absence : examen perdu."],
    ],
    rules: "// RÈGLES À CONNAÎTRE",
    head: ["", "Splunk", "AWS"],
    ruleRows: [
      ["Report / annulation", "Au moins 48 h avant, sinon examen perdu", "Au moins 24 h avant, 2 reports maximum"],
      ["Rattrapage", "7 jours après le 1er échec, 14 jours après le 2e, puis 28 et 56 jours ; refus possible au-delà de 6 tentatives", "14 jours, tentatives illimitées"],
      ["Résultat", "Réussi/échoué tout de suite, badge Credly par e-mail", "Sous 5 jours ouvrés"],
      ["Renouvellement", "Cycle de 3 ans depuis la certification la plus haute, 90 jours de grâce ; passer un niveau au-dessus ou repasser le même examen la dernière année", "3 ans ; repasser la dernière version ou obtenir le niveau Professional"],
      ["Remises", "Pack 5 examens pour 500 $ (voucher valable environ 1 an)", "-50 % sur l'examen suivant"],
      ["Temps en plus", "Seulement sur demande individuelle d'aménagement, avant la première réservation", "ESL +30 pour les non-anglophones"],
    ],
  },
  en: {
    reg: "// REGISTRATION",
    regs: [
      ["Splunk", "Create your account on Cisco CertMetrics (a Splunk ID is no longer needed), then book with Pearson VUE. Pay when booking or with a voucher, at least 24 h before the slot.", "https://cp.certmetrics.com/cisco/en/login"],
      ["AWS", "Sign in to the AWS Certification account, request the ESL +30 accommodation first if you take it in English, then book with Pearson VUE from that account.", "https://www.aws.training/certification"],
    ],
    name: "In both cases, the account name must match your ID exactly.",
    where: "// TEST CENTER OR ONLINE",
    whereRows: [
      ["Pearson VUE test center", "Several centers in France: use the center search on Pearson VUE's Splunk page or from the AWS account. Photo ID + a second ID with the same name (Splunk); a government ID, EU ID card accepted (AWS)."],
      ["Online (OnVUE)", "At home, quiet room, clear desk, webcam. Run the system test before exam day on the same computer and location (admin rights needed). If the computer fails on exam day, it counts as a no-show: the exam is lost."],
    ],
    rules: "// RULES TO KNOW",
    head: ["", "Splunk", "AWS"],
    ruleRows: [
      ["Reschedule / cancel", "At least 48 h before, otherwise the fee is lost", "At least 24 h before, 2 reschedules max"],
      ["Retake", "7 days after the 1st failure, 14 days after the 2nd, then 28 and 56 days; may be denied beyond 6 attempts", "14 days, unlimited attempts"],
      ["Result", "Pass/fail right away, Credly badge by email", "Within 5 business days"],
      ["Renewal", "3-year cycle from your highest certification, 90-day grace; pass a higher level or retake the same exam in the last year", "3 years; pass the latest version or earn Professional"],
      ["Discounts", "Bundle of 5 exams for $500 (voucher valid about 1 year)", "50% off the next exam"],
      ["Extra time", "Only as an individual accommodation, requested before the first booking", "ESL +30 for non-native English speakers"],
    ],
  },
};

const SOURCES = [
  ["Splunk Core Certified User", "https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-user.html"],
  ["Splunk Core Certified Power User", "https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html"],
  ["Splunk Enterprise Certified Admin", "https://www.splunk.com/en_us/training/certification-track/splunk-enterprise-certified-admin.html"],
  ["Splunk FAQ", "https://www.splunk.com/en_us/training/faq.html"],
  ["Splunk Candidate Handbook", "https://www.splunk.com/content/dam/splunk2/en_us/pdfs/training/splunk-certification-candidate-handbook.pdf"],
  ["Pearson VUE – Splunk", "https://www.pearsonvue.com/us/en/splunk.html"],
  ["AWS Solutions Architect – Associate", "https://aws.amazon.com/certification/certified-solutions-architect-associate/"],
  ["AWS SAA-C03 exam guide", "https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf"],
  ["AWS – before testing", "https://aws.amazon.com/certification/policies/before-testing/"],
  ["AWS – after testing", "https://aws.amazon.com/certification/policies/after-testing/"],
];

const TX = {
  fr: { title: "Examens", sub: "Durée, coût, questions, lieu de passage et règles de chaque examen.", checked: "Vérifié sur les sites officiels le {d}. Revérifie le prix au moment de réserver.",
    min: "min", q: "questions", pass: "pour réussir", noPass: "score non publié", topics: "Répartition des thèmes", all: "Tous les examens", sources: "// SOURCES", inApp: "Dans l'appli" },
  en: { title: "Exams", sub: "Duration, cost, questions, where to take it and the rules for each exam.", checked: "Checked on official sites on {d}. Check the price again when booking.",
    min: "min", q: "questions", pass: "to pass", noPass: "score not published", topics: "Topic weights", all: "All exams", sources: "// SOURCES", inApp: "In the app" },
};

const fmtDate = (d, L) => new Date(d + "T12:00:00").toLocaleDateString(L === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Résumé court pour l'accueil (durée · questions · coût) de la section affichée, ou null. */
export function examQuick(sec, lang) {
  const e = EXAMS.find(x => x.id === sec); if (!e) return null;
  const T = TX[lang === "fr" ? "fr" : "en"];
  return { code: e.code, name: e.name, line: `${e.quick.min} ${T.min} · ${e.quick.q} ${T.q} · ${e.quick.price}${e.quick.pass ? " · " + e.quick.pass : ""}` };
}

/** ctx : { app, esc, getLang, hash, hasSec(k) } */
export function renderExams(ctx) {
  const { app, esc } = ctx;
  const L = ctx.getLang() === "fr" ? "fr" : "en";
  const T = TX[L], P = PRACTICAL[L];
  const focus = (ctx.hash || "").replace(/^#\/?exams\/?/, "");
  const card = e => {
    const d = e[L];
    return `<section class="panel ex-card" id="ex-${e.id}">
      <p class="kicker mono">${esc(e.code)}${ctx.hasSec(e.id) ? ` · <span class="accent">${esc(T.inApp)}</span>` : ""}</p>
      <h2>${esc(e.name)}</h2>
      <div class="ex-quick">
        <span class="stat"><span class="stat-val mono">${e.quick.min}<small> ${esc(T.min)}</small></span></span>
        <span class="stat"><span class="stat-val mono">${e.quick.q}<small> ${esc(T.q)}</small></span></span>
        <span class="stat"><span class="stat-val mono">${esc(e.quick.price)}</span></span>
        <span class="stat"><span class="stat-val mono">${e.quick.pass ? esc(e.quick.pass) + `<small> ${esc(T.pass)}</small>` : `<small>${esc(T.noPass)}</small>`}</span></span>
      </div>
      <p>${esc(d.lead)}</p>
      <div class="table-wrap"><table class="ex-table"><tbody>${d.rows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table></div>
      ${d.topics ? `<h3 class="mono ex-h">${esc(T.topics)}</h3><ul class="ex-topics">${d.topics.map(([k, p]) =>
        `<li><span>${esc(k)}</span><span class="bar"><span style="width:${p * 3}%"></span></span><span class="mono">${p} %</span></li>`).join("")}</ul>` : ""}
      ${d.tip ? `<p class="hint">${esc(d.tip)}</p>` : ""}
      ${d.note ? `<p class="muted small">${esc(d.note)}</p>` : ""}
    </section>`;
  };
  app.innerHTML = `<section class="exams">
    <header class="bk-head"><div><p class="kicker mono">// exams</p><h1>${esc(T.title)}</h1><p class="muted">${esc(T.sub)}</p>
      <p class="muted small">${esc(T.checked.replace("{d}", fmtDate(CHECKED, L)))}</p></div></header>
    <nav class="seg ex-jump" aria-label="${esc(T.all)}">${EXAMS.map(e => `<a class="seg-btn mono" href="#/exams/${e.id}" aria-pressed="${e.id === focus}">${esc(e.code)}</a>`).join("")}</nav>
    ${EXAMS.map(card).join("")}
    <section class="panel">
      <h3 class="mono">${esc(P.reg)}</h3>
      ${P.regs.map(([k, v, u]) => `<p><strong>${esc(k)}</strong> : ${esc(v)} <a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https:\/\//, "").split("/")[0])}</a></p>`).join("")}
      <p class="muted small">${esc(P.name)}</p>
      <h3 class="mono">${esc(P.where)}</h3>
      <div class="table-wrap"><table class="ex-table"><tbody>${P.whereRows.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table></div>
      <h3 class="mono">${esc(P.rules)}</h3>
      <div class="table-wrap"><table class="ex-table"><thead><tr>${P.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${P.ruleRows.map(r => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>
    </section>
    <section class="panel">
      <h3 class="mono">${esc(T.sources)}</h3>
      <ul class="ex-src">${SOURCES.map(([k, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(k)}</a></li>`).join("")}</ul>
    </section>
  </section>`;
  if (focus) { const el = document.getElementById("ex-" + focus); if (el) setTimeout(() => el.scrollIntoView({ block: "start" }), 0); }
  else window.scrollTo(0, 0);
}
