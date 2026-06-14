# 🧬 CellCycle 3D

Simulatore interattivo 3D della **divisione cellulare** — mitosi e meiosi.
Interactive 3D simulator of **cell division** — mitosis & meiosis.

### 🔴 [**Live demo → manzolo.github.io/CellCycle3D**](https://manzolo.github.io/CellCycle3D/)

![tech](https://img.shields.io/badge/React-18-61dafb) ![tech](https://img.shields.io/badge/Three.js-r169-000) ![tech](https://img.shields.io/badge/TypeScript-5-3178c6) ![tech](https://img.shields.io/badge/Vite-5-646cff)

## ✨ Cosa fa

- Cellula 3D procedurale (animale/vegetale): membrana shader, nucleo, cromosomi, fuso, centrosomi, mitocondri, Golgi.
- **Mitosi** e **Meiosi** complete (con crossing-over) — timeline cliccabile, play/pausa/step, velocità regolabile.
- Zoom e rotazione liberi, click su una struttura → pannello informativo.
- Cromosomi colorati per coppie omologhe, confronto Mitosi vs Meiosi, simulazione errore (nondisgiunzione).
- Contenuti IT/EN, livello liceo/università, dark mode. Riferimenti: Alberts, *MBoC*; *Campbell Biology*.

## 🚀 Avvio

```bash
make local-dev          # dev locale (Node 22+) → http://localhost:5173
```

Con Docker (build nginx in background):

```bash
make up                 # → http://localhost:8080
make down               # ferma
```

Dev server in container con hot-reload: `make dev`. Tutti i comandi: `make help`.

## 🌐 Deploy

Ad ogni push su `main`, il workflow [`deploy.yml`](.github/workflows/deploy.yml) pubblica
automaticamente su **GitHub Pages** (il base path è impostato dal nome del repo).

## 🧱 Stack

React 18 · TypeScript · Three.js (@react-three/fiber + drei) · shader GLSL · zustand · Vite.

Le animazioni sono guidate da `getLayout(mode, fase, progress)` in
[`src/three/layout.ts`](src/three/layout.ts); modello didattico 2n = 4.

---

🤖 Generato con [Claude Code](https://claude.com/claude-code)
