# 🧬 CellCycle 3D

Simulatore interattivo e immersivo della **divisione cellulare** (mitosi e meiosi) in 3D.
An interactive, immersive 3D simulator of **cell division** (mitosis & meiosis).

![tech](https://img.shields.io/badge/React-18-61dafb) ![tech](https://img.shields.io/badge/Three.js-r169-000) ![tech](https://img.shields.io/badge/TypeScript-5-3178c6) ![tech](https://img.shields.io/badge/Vite-5-646cff)

## ✨ Funzionalità / Features

- **Cellula 3D** procedurale: membrana (shader fresnel), nucleo, nucleolo, cromatina, cromosomi, fuso mitotico con particelle, centrosomi, mitocondri, apparato di Golgi.
- **Mitosi** completa: Interfase → Profase → Prometafase → Metafase → Anafase → Telofase → Citocinesi.
- **Meiosi** completa: Meiosi I (Profase I con **crossing-over**, Metafase I, Anafase I, Telofase I) + Meiosi II → 4 cellule aploidi.
- **Timeline / stepper** cliccabile, **Play / Pausa / step-by-step**, **velocità regolabile**.
- **Zoom e rotazione liberi** (OrbitControls); **click su una struttura** → pannello informativo.
- **Cromosomi colorati per coppie omologhe**; animazione del crossing-over.
- **Pannelli educativi** per ogni fase: cosa succede, eventi chiave, importanza biologica, errori comuni.
- **Confronto affiancato** Mitosi vs Meiosi.
- **Simula errore** (nondisgiunzione) per mostrare l'aneuploidia.
- **Cellula animale / vegetale**, livello **liceo / università**, lingua **IT / EN**, dark mode.

I contenuti seguono riferimenti universitari standard (Alberts, *Molecular Biology of the Cell*; *Campbell Biology*).

## 🚀 Avvio rapido / Quick start

### In locale (Node 22+)

```bash
make install     # npm install
make local-dev   # http://localhost:5173
```

### Con Docker (build di produzione su nginx, in detached)

```bash
make build       # build dell'immagine
make up          # avvia in background → http://localhost:8080
make logs        # segui i log
make down        # ferma e rimuove i container
make rebuild     # rebuild senza cache + up
```

### Dev server in container (hot-reload)

```bash
make dev         # http://localhost:5173 (detached)
make logs-dev
make dev-down
```

Tutti i target: `make help`.

| Variabile | Default | Descrizione |
|-----------|---------|-------------|
| `APP_PORT` | `8080` | Porta host per la build nginx |
| `DEV_PORT` | `5173` | Porta host per il dev server |
| `VITE_BASE` | `/` | Base path pubblico (per GitHub Pages) |

## 🌐 Deploy su GitHub Pages

Il workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builda e pubblica automaticamente ad ogni push su `main`.

1. Crea un repo su GitHub e fai push del progetto:
   ```bash
   git init && git add . && git commit -m "CellCycle 3D"
   git branch -M main
   git remote add origin https://github.com/<utente>/<repo>.git
   git push -u origin main
   ```
2. Su GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Al termine del workflow il sito è online su `https://<utente>.github.io/<repo>/`.

> Il `base` path viene impostato automaticamente dal nome del repository (`VITE_BASE`), quindi gli asset si caricano correttamente sotto la sotto-cartella di Pages.

## 🧱 Stack tecnico

- **React 18 + TypeScript**
- **Three.js** via **@react-three/fiber** + **@react-three/drei**
- **Shader GLSL** per la membrana cellulare
- **zustand** per lo stato
- **Vite** per build e dev server
- Animazioni guidate dai dati con interpolazione frame-rate independent

## 🗂️ Struttura

```
src/
├── data/         # fasi (mitosi/meiosi) e strutture — contenuti scientifici IT/EN
├── i18n/         # stringhe interfaccia
├── store/        # stato globale (zustand)
├── three/        # motore di layout 3D + shader membrana
└── components/
    ├── scene/    # componenti 3D (membrana, nuclei, cromosomi, fuso, organelli)
    └── ui/       # header, timeline, controlli, pannelli
```

## 📐 Modello

Per chiarezza didattica la cellula usa **2n = 4** (due coppie di omologhi).
Le animazioni sono guidate dalla funzione `getLayout(mode, phase, progress)` in
[`src/three/layout.ts`](src/three/layout.ts), che mappa ogni fase alle posizioni
di cromatidi, cellule, nuclei e fuso; i componenti interpolano dolcemente verso i target.

---

🤖 Progetto generato con [Claude Code](https://claude.com/claude-code)
