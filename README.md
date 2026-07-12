# 🚀 Chandanapu Sathwik | Professional Developer Portfolio

> A premium, recruiter-ready developer portfolio showcasing full-stack competence, algorithmic foundations, and data science specialization. Engineered with React 19, Vite, Tailwind CSS v4, Three.js, and Framer Motion.

---

## 🔗 Live Link & Demo

* **Portfolio Website:** [https://sathwik27.vercel.app](https://sathwik27.vercel.app)
* **Local Development Port:** `http://localhost:5173`

---

## 🛠️ Technical Stack

This system is built using a modern, performant, and type-safe frontend toolchain:

### ⚙️ Core Architecture
* **React 19:** Building interfaces with standard hooks and React 19 concurrent features.
* **TanStack Start & Router:** File-system based router utilizing type-safe links and transitions.
* **TypeScript:** Ensuring end-to-end static typing across components and data grids.
* **Vite:** Next-generation frontend tooling providing fast modular bundling.

### 🎨 Visual & Interactions
* **Three.js:** Interactive 3D particle neural web rendering directly centered behind the avatar backdrop.
* **Framer Motion:** High-fidelity animations including a popping entry loader, scroll reveals, and floating dialog entries.
* **Web Speech API**: Supports browser-native SpeechRecognition (voice transcription to chatbot prompt) and SpeechSynthesis (read-aloud triggers).
* **Tailwind CSS v4:** Modern styling system defining custom theme properties, glassmorphism, and neon glows.
* **Lucide Icons:** Clean vector icon pack representing professional directories.

### 🔌 State & Helpers
* **FormSubmit.co API:** Fully wired zero-configuration AJAX contact form dispatching notifications directly to sathwik12006@gmail.com.
* **localStorage history:** Persistent key-value storage maintaining chat logs across sessions.

---

## ✨ Engineering Features

* **Popping Intro Loader:** Fullscreen entry graphic blocking interaction for `2.2s`, triggering a cinematic zoom-spring entrance.
* **3D Particle Canvas:** Interactive WebGL components reacting to cursor coordinates, giving a polished visual identity.
* **About Me Trait Cards:** Redesigned 2-column layout housing competitive achievements next to a 2x2 glassmorphic skill grid backed by abstract geometric primitives.
* **Sathwik Portfolio Guide Chatbot:** Customizable messenger assistant equipped with:
  - Timed welcome tooltip popover ("Hi! How can I assist you?") fading out automatically after 6 seconds.
  - Active transcript voice-to-text input + speak-along text-to-voice synthesizers.
  - History logs allowing recruiters to review previous conversations.
* **Responsive Multi-Section Navigation:** Sticky horizontal navbar tracking scroll positions and indicating section highlights with active springs.
* **Direct Copy Mail Hook:** Copy-to-clipboard tool featuring Sonner notifications, allowing recruiters to get contact addresses instantly.
* **Default Dark Mode:** Sleek royal violet and bright CSS neon palettes designed to work comfortably in dark environments.

---

## 📁 Repository Structure

```
src/
 ├── routes/
 │   ├── __root.tsx      # Application layout shell & metadata head injection
 │   ├── index.tsx       # Main page layout containing refactored portfolio sections
 │
 ├── components/
 │   ├── Hero/
 │   │   ├── Hero.tsx         # Left text layouts and profile avatar
 │   │   ├── Hero3D.tsx       # Centered webgl particle scene
 │   │   ├── StatsPanel.tsx   # Count-up profile indicators
 │   │   
 │   ├── AIChatbot.tsx        # Voice, history & dialogue assistant
 │   ├── IntroScreen.tsx      # Entry popping animation overlay
 │
 ├── assets/             # Vector icons, university logo & certificate assets
 ├── styles.css          # CSS theme definitions and glowing/glassmorphic custom utilities
```

---

## ⚡ Getting Started

### 🔧 Installation

Install local packages using Bun or NPM:
```bash
npm install
```

### ▶️ Run Locally

Initialize local dev server (default bindings: `http://localhost:5173`):
```bash
npm run dev
```

### 📦 Build Production Payload

Check compilation syntax and generate serverless build package:
```bash
npm run build
```

---

## ⭐ Support & Contact

Built and maintained by **Chandanapu Sathwik**. Feel free to contact via [LinkedIn](https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/) or email directly at [sathwik12006@gmail.com](mailto:sathwik12006@gmail.com). Let's collaborate!
