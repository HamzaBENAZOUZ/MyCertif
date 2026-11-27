// Onglet « Paramètres » : voix (téléphone ou voix naturelle téléchargée), lecture à voix haute, mode express,
// affichage et application. Les réglages de lecture sont ceux de l'onglet Books (mêmes préférences).
// Voix naturelles : pont AndroidVoice de l'appli (NeuralVoice.java), fichiers sur la branche « voix » du dépôt.

const XP_KEY = "mycertif-express";
/** Réglages du mode express : délai pour répondre et attente avant la question suivante (secondes). */
export function xpSettings() {
  let o = {};
  try { o = JSON.parse(localStorage.getItem(XP_KEY)) || {}; } catch { o = {}; }
  const wait = [15, 30, 45, 60].includes(+o.wait) ? +o.wait : 30;
  const next = [2, 4, 6, 8].includes(+o.next) ? +o.next : 4;
  return { wait, next };
}
function setXp(k, v) {
  const o = xpSettings(); o[k] = v;
  try { localStorage.setItem(XP_KEY, JSON.stringify(o)); } catch { /* */ }
}

const FONT_KEY = "mycertif-font";
export const FONT_SIZES = [0.9, 1, 1.15, 1.3, 1.5];
/** Taille du texte de toute l'appli (1 = normale), appliquée par la variable CSS --ui-font. */
export function fontScale() {
  let v = 1;
  try { v = parseFloat(localStorage.getItem(FONT_KEY)) || 1; } catch { v = 1; }
  return FONT_SIZES.includes(v) ? v : 1;
}
export function setFontScale(v) {
  v = FONT_SIZES.includes(+v) ? +v : 1;
  try { if (v === 1) localStorage.removeItem(FONT_KEY); else localStorage.setItem(FONT_KEY, String(v)); } catch { /* */ }
  if (v === 1) document.documentElement.style.removeProperty("--ui-font");
  else document.documentElement.style.setProperty("--ui-font", v);
  document.documentElement.classList.toggle("fs-big", v >= 1.3);   // très grand texte : une seule colonne sur téléphone
}

const TX = {
  fr: {
    title: "Paramètres", sub: "Voix, lecture à voix haute, mode express et affichage.",
    voice: "// VOIX", voiceDesc: "Choisis pour chaque langue la voix du téléphone ou une voix naturelle hors ligne. Le choix vaut pour les livres, les QCM, le mode express et Android Auto.",
    fr: "Français", en: "Anglais", native: "Voix du téléphone", neural: "Voix naturelle", nameFr: "Siwis (féminine, France)", nameEn: "Kristin (féminine, États-Unis)",
    dl: "Télécharger ({mb} Mo)", dling: "Téléchargement… {p} %", cancel: "Annuler", rm: "Supprimer", rmConfirm: "Supprimer la voix naturelle {l} ? Elle pourra être téléchargée de nouveau.",
    installed: "Installée sur le téléphone ({mb} Mo)", notInst: "Pas encore téléchargée", tryV: "🔊 Essayer",
    phoneVoice: "Voix du téléphone utilisée", auto: "Automatique (la meilleure)", noApp: "Les voix naturelles hors ligne sont disponibles dans l'application Android MyCertif.",
    oldApp: "Mets à jour l'application pour utiliser les voix naturelles.", noAbi: "Ce téléphone n'est pas compatible avec les voix naturelles (processeur).",
    err: "Échec du téléchargement : {e}. Vérifie la connexion puis réessaie.", errLoad: "La voix naturelle n'a pas pu démarrer ({e}) : la voix du téléphone est utilisée.",
    lic: "Voix libres Piper : Siwis (CC BY 4.0), Kristin (domaine public). Moteur sherpa-onnx (Apache 2.0) et espeak-ng (GPL 3.0).",
    sample: "Bonjour ! Voici la voix qui lira tes livres et tes questions. Le D N S de Route 53 traduit les noms de domaine.",
    sampleEn: "Hello! This is the voice that will read your books and questions. Amazon Route 53 is a highly available DNS service.",
    read: "// LECTURE À VOIX HAUTE", speed: "Vitesse de la voix", gap: "Pause entre les phrases", none: "aucune",
    chain: "Enchaîner automatiquement le chapitre suivant", awake: "Garder l'écran allumé pendant l'écoute",
    carAuto: "Android Auto : préparer tous les livres et cours automatiquement", carFr: "Android Auto : lire en français les chapitres en anglais", carFrDesc: "La voiture traduit le chapitre pendant l'écoute (traducteur du téléphone si Android en a un, sinon Google en ligne : le texte du chapitre lui est envoyé). Une fois traduit, le chapitre est gardé et se relit sans réseau.",
    carAutoDesc: "Dans la voiture : Livres (chaque livre et ses chapitres) et Certifications (chaque chapitre en quiz audio). Mis à jour à chaque ouverture de l'appli.",
    xp: "// MODE EXPRESS", xpWait: "Temps pour répondre", xpNext: "Attente avant la question suivante",
    disp: "// AFFICHAGE", lang: "Langue de l'interface", theme: "Thème", dark: "Sombre", light: "Clair",
    font: "Taille du texte", fontDesc: "Agrandit ou réduit tout le texte de l'application (sur ce téléphone, cette tablette ou cette télé).",
    fonts: ["Petite", "Normale", "Grande", "Très grande", "Énorme"], fontPrev: "Aperçu : voici la taille des questions et des livres.",
    bfont: "Taille du texte des livres", bfontDesc: "Agrandit seulement le texte des livres, pas l'appli. Aussi réglable dans le livre (A− / A+, ⚙ ou Aa) ou en pinçant l'écran.",
    sumArch: "Résumés archivés", sumArchDesc: "Les cours archivés depuis l'onglet Résumé sont masqués de cet onglet (rien n'est supprimé, la progression est gardée).", sumRestore: "Désarchiver", sumNone: "Aucun cours archivé.", sumRestored: "« {c} » est de retour dans l'onglet Résumé.",
    app: "// APPLICATION", ver: "Version", check: "Vérifier les mises à jour", upToDate: "L'application est à jour.", site: "site web",
  },
  en: {
    title: "Settings", sub: "Voices, reading aloud, express mode and display.",
    voice: "// VOICES", voiceDesc: "For each language, choose the phone's voice or an offline natural voice. The choice applies to books, quizzes, express mode and Android Auto.",
    fr: "French", en: "English", native: "Phone voice", neural: "Natural voice", nameFr: "Siwis (female, France)", nameEn: "Kristin (female, United States)",
    dl: "Download ({mb} MB)", dling: "Downloading… {p}%", cancel: "Cancel", rm: "Delete", rmConfirm: "Delete the {l} natural voice? You can download it again later.",
    installed: "Installed on the phone ({mb} MB)", notInst: "Not downloaded yet", tryV: "🔊 Try",
    phoneVoice: "Phone voice used", auto: "Automatic (best one)", noApp: "Offline natural voices are available in the MyCertif Android app.",
    oldApp: "Update the app to use natural voices.", noAbi: "This phone is not compatible with natural voices (processor).",
    err: "Download failed: {e}. Check the connection and try again.", errLoad: "The natural voice could not start ({e}): the phone's voice is used.",
    lic: "Free Piper voices: Siwis (CC BY 4.0), Kristin (public domain). sherpa-onnx engine (Apache 2.0) and espeak-ng (GPL 3.0).",
    sample: "Bonjour ! Voici la voix qui lira tes livres et tes questions. Le D N S de Route 53 traduit les noms de domaine.",
    sampleEn: "Hello! This is the voice that will read your books and questions. Amazon Route 53 is a highly available DNS service.",
    read: "// READING ALOUD", speed: "Voice speed", gap: "Pause between sentences", none: "none",
    chain: "Automatically continue with the next chapter", awake: "Keep the screen on while listening",
    carAuto: "Android Auto: prepare all books and courses automatically", carFr: "Android Auto: read English chapters in French", carFrDesc: "The car translates the chapter while you listen (the phone's translator if Android has one, otherwise Google online: the chapter's text is sent to it). Once translated, the chapter is kept and plays again without network.",
    carAutoDesc: "In the car: Books (each book and its chapters) and Certifications (each chapter as an audio quiz). Updated every time the app opens.",
    xp: "// EXPRESS MODE", xpWait: "Time to answer", xpNext: "Wait before the next question",
    disp: "// DISPLAY", lang: "Interface language", theme: "Theme", dark: "Dark", light: "Light",
    font: "Text size", fontDesc: "Makes all the text in the app bigger or smaller (on this phone, tablet or TV).",
    fonts: ["Small", "Normal", "Large", "Extra large", "Huge"], fontPrev: "Preview: this is the size of questions and books.",
    bfont: "Book text size", bfontDesc: "Makes only the books' text bigger, not the app. Also adjustable inside a book (A− / A+, ⚙ or Aa) or by pinching the screen.",
    sumArch: "Archived summaries", sumArchDesc: "Courses archived from the Summaries tab are hidden there (nothing is deleted, progress is kept).", sumRestore: "Unarchive", sumNone: "No archived course.", sumRestored: "“{c}” is back in the Summaries tab.",
    app: "// APPLICATION", ver: "Version", check: "Check for updates", upToDate: "The app is up to date.", site: "website",
  },
};
const DL_MB = 58;   // taille d'une voix (le moteur, 8 Mo, est téléchargé avec la première)

/**
 * ctx : { app, esc, getLang, setLang, theme(), setTheme(th), books(), tts, version, checkUpdate(), toast, rerender() }
 */
export function renderSettings(ctx) {
  const { app, esc } = ctx;
  const L = ctx.getLang() === "fr" ? "fr" : "en";
  const T = (k, v = {}) => String(TX[L][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x] ?? "");
  const AV = window.AndroidVoice && typeof window.AndroidVoice.status === "function" ? window.AndroidVoice : null;
  const inApp = /SplunkAppVersion\//.test(navigator.userAgent);
  const B = ctx.books(), P = B.prefs();
  const seg = (name, items, cur) => `<div class="seg" role="group">${items.map(([v, lab]) =>
    `<button class="seg-btn mono" data-${name}="${v}" aria-pressed="${String(v) === String(cur)}">${esc(lab)}</button>`).join("")}</div>`;

  let st = {};
  const readSt = () => { try { st = AV ? JSON.parse(AV.status() || "{}") : {}; } catch { st = {}; } };
  readSt();

  const voiceCard = lang => {
    const v = st[lang] || {}, busy = st.busy === lang, other = st.busy && st.busy !== lang;
    const name = lang === "fr" ? T("nameFr") : T("nameEn");
    const phoneVs = (ctx.tts.voices ? ctx.tts.voices(lang) : []);
    const curPhone = (P.vname || {})[lang] || "";
    return `<div class="set-voice" data-vl="${lang}">
      <h4 class="mono">${esc(T(lang))}</h4>
      ${AV ? `<div class="set-row">${seg("eng-" + lang, [["native", T("native")], ["neural", T("neural") + " · " + name]], v.installed && v.use === "neural" ? "neural" : "native")}</div>
      <p class="muted small mono">${busy ? esc(T("dling", { p: st.pct || 0 })) : v.installed ? esc(T("installed", { mb: v.mb || DL_MB })) : esc(T("notInst"))}</p>
      ${busy ? `<div class="set-bar"><span style="width:${st.pct || 0}%"></span></div>` : ""}
      <div class="row">
        ${busy ? `<button class="btn btn-ghost btn-sm" data-vcancel>${esc(T("cancel"))}</button>`
          : v.installed ? `<button class="btn btn-ghost btn-sm" data-vtry="${lang}">${esc(T("tryV"))}</button><button class="btn btn-ghost btn-sm" data-vrm="${lang}">🗑 ${esc(T("rm"))}</button>`
          : `<button class="btn btn-primary btn-sm" data-vdl="${lang}" ${other || !st.abi ? "disabled" : ""}>📥 ${esc(T("dl", { mb: st.engine ? DL_MB : DL_MB + 8 }))}</button>`}
      </div>` : ""}
      ${phoneVs.length ? `<label class="set-row"><span class="muted small">${esc(T("phoneVoice"))}</span>
        <select data-pvoice="${lang}"><option value="">${esc(T("auto"))}</option>${phoneVs.map(x => `<option value="${esc(x.id)}" ${x.id === curPhone ? "selected" : ""}>${esc(x.label)}</option>`).join("")}</select>
        ${AV ? "" : `<button class="btn btn-ghost btn-sm" data-vtry="${lang}">${esc(T("tryV"))}</button>`}</label>` : ""}
    </div>`;
  };

  const paint = () => {
    readSt();
    const xp = xpSettings();
    app.innerHTML = `<section class="settings">
      <header class="bk-head"><div><p class="kicker mono">// settings</p><h1>${esc(T("title"))}</h1><p class="muted">${esc(T("sub"))}</p></div></header>

      <section class="panel set-sec">
        <h3 class="mono">${esc(T("voice"))}</h3>
        <p class="muted">${esc(T("voiceDesc"))}</p>
        ${!AV ? `<p class="hint mono">${esc(inApp ? T("oldApp") : T("noApp"))}</p>` : !st.abi ? `<p class="hint mono">${esc(T("noAbi"))}</p>` : ""}
        ${st.error && st.error !== "cancel" ? `<p class="hint mono set-err">${esc((st.busy ? T("err") : (st.fr && st.fr.installed) || (st.en && st.en.installed) ? T("errLoad") : T("err")).replace("{e}", st.error))}</p>` : ""}
        <div class="set-voices">${voiceCard("fr")}${voiceCard("en")}</div>
        ${AV ? `<p class="muted small">${esc(T("lic"))}</p>` : ""}
      </section>

      <section class="panel set-sec">
        <h3 class="mono">${esc(T("read"))}</h3>
        <div class="set-row"><span>${esc(T("speed"))}</span>${seg("rate", B.RATES.map(x => [x, x + "×"]), P.rate)}</div>
        <div class="set-row"><span>${esc(T("gap"))}</span>${seg("gap", B.GAPS.map(x => [x, x ? String(x).replace(".", L === "fr" ? "," : ".") + " s" : T("none")]), P.gap)}</div>
        <label class="set-row set-check"><input type="checkbox" id="set-chain" ${P.chain ? "checked" : ""}> <span>${esc(T("chain"))}</span></label>
        <label class="set-row set-check"><input type="checkbox" id="set-awake" ${P.awake ? "checked" : ""}> <span>${esc(T("awake"))}</span></label>
        ${window.AndroidCar ? `<label class="set-row set-check"><input type="checkbox" id="set-car" ${P.carAuto !== false ? "checked" : ""}> <span>${esc(T("carAuto"))}</span></label>
        <p class="muted">${esc(T("carAutoDesc"))}</p>
        <label class="set-row set-check"><input type="checkbox" id="set-carfr" ${P.carFr !== false ? "checked" : ""}> <span>${esc(T("carFr"))}</span></label>
        <p class="muted">${esc(T("carFrDesc"))}</p>` : ""}
      </section>

      <section class="panel set-sec">
        <h3 class="mono">${esc(T("xp"))}</h3>
        <div class="set-row"><span>${esc(T("xpWait"))}</span>${seg("xpwait", [15, 30, 45, 60].map(x => [x, x + " s"]), xp.wait)}</div>
        <div class="set-row"><span>${esc(T("xpNext"))}</span>${seg("xpnext", [2, 4, 6, 8].map(x => [x, x + " s"]), xp.next)}</div>
      </section>

      <section class="panel set-sec">
        <h3 class="mono">${esc(T("disp"))}</h3>
        <div class="set-row"><span>${esc(T("lang"))}</span>${seg("ulang", [["fr", "Français"], ["en", "English"]], L)}</div>
        <div class="set-row"><span>${esc(T("theme"))}</span>${seg("theme", [["dark", T("dark")], ["light", T("light")]], ctx.theme())}</div>
        <div class="set-row set-font"><span>${esc(T("font"))}</span>${seg("ufont", FONT_SIZES.map((x, i) => [x, TX[L].fonts[i]]), fontScale())}</div>
        <p class="muted small">${esc(T("fontDesc"))}</p>
        <p class="set-font-prev">${esc(T("fontPrev"))}</p>
        <div class="set-row set-font"><span>${esc(T("bfont"))}</span>${seg("bfont", B.BF_PRE.map(x => [x, Math.round(x * 100) + " %"]), P.font)}</div>
        <p class="muted small">${esc(T("bfontDesc"))}</p>
      </section>

      <section class="panel set-sec">
        <h3 class="mono">🗄️ ${esc(T("sumArch"))}</h3>
        <p class="muted">${esc(T("sumArchDesc"))}</p>
        ${B.sumArchived ? (B.sumArchived().length ? `<ul class="arch-list">${B.sumArchived().map(x => `<li><span class="mono">${esc(x.name)}</span>
          <button class="btn btn-ghost btn-sm" data-sum-restore="${esc(x.k)}">↩️ ${esc(T("sumRestore"))}</button></li>`).join("")}</ul>`
          : `<p class="muted small mono">${esc(T("sumNone"))}</p>`) : ""}
      </section>

      <section class="panel set-sec">
        <h3 class="mono">${esc(T("app"))}</h3>
        <div class="set-row"><span>${esc(T("ver"))}</span><span class="mono">${esc(ctx.version || T("site"))}</span></div>
        ${inApp ? `<button class="btn btn-ghost btn-sm" id="set-upd">🔄 ${esc(T("check"))}</button>` : ""}
      </section>
    </section>`;
    bind();
  };

  const sample = lang => (lang === "fr" ? TX[L].sample : TX[L].sampleEn);
  const bind = () => {
    app.querySelectorAll("[data-vdl]").forEach(b => b.onclick = () => { AV.download(b.dataset.vdl); });
    app.querySelectorAll("[data-vcancel]").forEach(b => b.onclick = () => AV.cancel());
    app.querySelectorAll("[data-sum-restore]").forEach(b => b.onclick = () => {
      const x = B.sumArchived().find(y => y.k === b.dataset.sumRestore); B.sumRestore(b.dataset.sumRestore);
      if (ctx.toast && x) ctx.toast(T("sumRestored", { c: x.name }), "ok"); paint();
    });
    app.querySelectorAll("[data-vrm]").forEach(b => b.onclick = () => {
      if (confirm(T("rmConfirm", { l: T(b.dataset.vrm).toLowerCase() }))) AV.remove(b.dataset.vrm);
    });
    app.querySelectorAll("[data-vtry]").forEach(b => b.onclick = () => {
      const l = b.dataset.vtry; ctx.tts.stop(); ctx.tts.speak(sample(l), l, P.rate, () => {}, (P.vname || {})[l] || "");
    });
    for (const l of ["fr", "en"]) app.querySelectorAll(`[data-eng-${l}]`).forEach(b => b.onclick = () => {
      const want = b.getAttribute(`data-eng-${l}`);
      if (want === "neural" && !(st[l] && st[l].installed)) { if (st.abi && !st.busy) AV.download(l); return; }
      AV.setEngine(l, want); paint();
    });
    app.querySelectorAll("[data-pvoice]").forEach(s => s.onchange = () => { B.setVoice(s.dataset.pvoice, s.value); });
    app.querySelectorAll("[data-rate]").forEach(b => b.onclick = () => { B.setPref("rate", +b.dataset.rate); paint(); });
    app.querySelectorAll("[data-gap]").forEach(b => b.onclick = () => { B.setPref("gap", +b.dataset.gap); paint(); });
    const ch = app.querySelector("#set-chain"); ch.onchange = () => B.setPref("chain", ch.checked);
    const aw = app.querySelector("#set-awake"); aw.onchange = () => B.setPref("awake", aw.checked);
    const cf = app.querySelector("#set-carfr"); if (cf) cf.onchange = () => B.setPref("carFr", cf.checked);
    const ca = app.querySelector("#set-car"); if (ca) ca.onchange = () => { B.setPref("carAuto", ca.checked); if (ca.checked) B.carSyncAll(); };
    app.querySelectorAll("[data-xpwait]").forEach(b => b.onclick = () => { setXp("wait", +b.dataset.xpwait); paint(); });
    app.querySelectorAll("[data-xpnext]").forEach(b => b.onclick = () => { setXp("next", +b.dataset.xpnext); paint(); });
    app.querySelectorAll("[data-ulang]").forEach(b => b.onclick = () => { ctx.setLang(b.dataset.ulang); });
    app.querySelectorAll("[data-theme]").forEach(b => b.onclick = () => { ctx.setTheme(b.dataset.theme); paint(); });
    app.querySelectorAll("[data-bfont]").forEach(b => b.onclick = () => { B.setPref("font", +b.dataset.bfont); paint(); });
    app.querySelectorAll("[data-ufont]").forEach(b => b.onclick = () => {
      const y = b.getBoundingClientRect().top;          // garde le bouton sous le doigt après le changement de taille
      setFontScale(+b.dataset.ufont); paint();
      const nb = app.querySelector(`[data-ufont="${b.dataset.ufont}"]`);
      if (nb) { window.scrollBy(0, nb.getBoundingClientRect().top - y); nb.focus({ preventScroll: true }); }
    });
    const up = app.querySelector("#set-upd");
    if (up) up.onclick = async () => { up.disabled = true; const newer = await ctx.checkUpdate(); up.disabled = false; if (!newer) ctx.toast(T("upToDate"), "ok"); };
  };

  // progression du téléchargement envoyée par l'appli
  window.__voiceState = () => { if (document.querySelector(".settings")) paint(); };
  paint();
}
