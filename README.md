# MyCertif : voix naturelles hors ligne

Fichiers téléchargés par l'application MyCertif (Paramètres > Voix) dans son dossier privé. Ils ne sont pas dans l'APK.

| Fichier | Contenu | Licence |
|---|---|---|
| engine-arm64-v8a.zip, engine-armeabi-v7a.zip | Moteur sherpa-onnx 1.12.14 (libsherpa-onnx-jni.so, onnxruntime lié statiquement, piper-phonemize et espeak-ng) | sherpa-onnx : Apache-2.0 ; ONNX Runtime : MIT ; espeak-ng : GPL-3.0 (sources : https://github.com/espeak-ng/espeak-ng, https://github.com/k2-fsa/sherpa-onnx) |
| espeak-ng-data.zip | Données de prononciation espeak-ng (français et anglais seulement) | GPL-3.0 |
| voice-fr.zip | Voix Piper fr_FR « siwis » (medium) | CC BY 4.0, jeu de données SIWIS (Yamagishi, Honnet et al.), modèle Piper par Michael Hansen (rhasspy/piper-voices) |
| voice-en.zip | Voix Piper en_US « kristin » (medium) | Domaine public (enregistrements LibriVox), modèle rhasspy/piper-voices |

voices.json décrit chaque fichier (taille, empreinte SHA-256) ; l'application vérifie l'empreinte après le téléchargement.
