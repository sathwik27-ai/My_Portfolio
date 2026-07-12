# 🚀 Chandanapu Sathwik | Professional Developer Portfolio

> A premium, recruiter-ready developer portfolio showcasing full-stack competence, algorithmic foundations, and AI specialization. Engineered with React 19, Vite, TanStack Start, Tailwind CSS v4, Three.js, and OpenAI.

---

## 🔗 Live Link & Demo

* **Portfolio Website:** [https://sathwik27.vercel.app](https://sathwik27.vercel.app)
* **Local Development Port:** `http://localhost:5173`

---

## 🛠️ Technical Stack

This system is built using a modern, performant, and type-safe frontend toolchain:

### ⚙️ Core Architecture
* **React 19:** Building interfaces with standard hooks and React 19 concurrent features.
* **TanStack Start & Router:** File-system based router utilizing type-safe server functions.
* **TypeScript:** Ensuring end-to-end static typing across components and data grids.
* **Vite:** Next-generation frontend tooling providing fast modular bundling.

### 🎨 Visual & Interactions
* **Three.js:** Interactive 3D particle neural web rendering directly centered behind the avatar backdrop.
* **Framer Motion:** High-fidelity animations including a popping entry loader, scroll reveals, and floating dialog entries.
* **Web Speech API**: Supports browser-native SpeechRecognition (voice transcription to chatbot prompt) and SpeechSynthesis (read-aloud triggers).
* **Tailwind CSS v4:** Modern styling system defining custom theme properties, glassmorphism, and soft shadows.

### 🔌 State & AI Integrations
* **OpenAI API:** Context-aware LLM chatbot assistant driven by `gpt-4o-mini` securely routed through TanStack Start server functions.
* **FormSubmit.co:** Reliable native POST contact form submitting messages directly to `sathwik12006@gmail.com`.
* **localStorage history:** Persistent key-value storage maintaining chat logs across sessions.

---

## ✨ Engineering Features

* **Default Light Theme:** A clean, Stripe-like premium light interface using soft lavender backings (`#f8fafc` to `#eeebfb`), refined typography, and soft shadows over neon glows.
* **Dark Mode Toggle:** A sleek optional dark selector adapting Three.js nodes, line blending, and layout colors smoothly.
* **Popping Intro Loader:** Fullscreen entry graphic blocking interaction for `2.2s`, triggering a cinematic zoom-spring entrance.
* **3D Particle Canvas:** Interactive WebGL components reacting to cursor coordinates, giving a polished visual identity.
* **About Me Trait Cards:** Redesigned 2-column layout housing competitive achievements next to a 2x2 glassmorphic skill grid backed by abstract geometric primitives.
* **Advanced AI Chatbot:** Context-aware assistant representing Sathwik. Features:
  - Speech-To-Text transcriber and Text-To-Speech read aloud toggles.
  - Quick action suggestion chips.
  - Full local storage history caching.
  - Native fallback logic ensuring seamless offline or local development usage.
* **Direct Copy Mail Hook:** Copy-to-clipboard tool featuring Sonner notifications, allowing recruiters to get contact addresses instantly.

---

## 📁 Repository Structure

```
src/
 ├── routes/
 │   ├── __root.tsx      # Application layout shell & metadata head injection
 │   ├── index.tsx       # Main page layout containing portfolio sections & forms
 │
 ├── components/
 │   ├── Hero/
 │   │   ├── Hero.tsx         # Hero section layout and profile avatar
 │   │   ├── Hero3D.tsx       # Centered WebGL neural background observer
 │   │   ├── StatsPanel.tsx   # Count-up profile indicators
 │   │   
 │   ├── Chatbot/
 │   │   ├── Chatbot.tsx      # Floating bubble trigger and greeting dialogs
 │   │   ├── ChatUI.tsx       # Conversation frame, tabs, speech and text input controllers
 │   │   ├── useChat.ts       # Hook driving speech and local states
 │   │   └── chatService.ts   # Secure server-side OpenAI completions function
 │   │
 │   ├── IntroScreen.tsx      # Entry popping name animation overlay
 │
 ├── assets/             # Vector icons, university logo & certificate assets
 ├── styles.css          # CSS theme definitions and glowing/glassmorphic custom utilities
```

---

## ⚡ Getting Started

### 🔧 Installation

Install local packages using NPM:
```bash
npm install
```

### 🔑 Environment Configuration

Create a `.env` file at the root of the project to enable full advanced AI chatbot capabilities with OpenAI:
```env
OPENAI_API_KEY=your_openai_api_key_here
```
> **Note:** If no `OPENAI_API_KEY` is present, the chatbot will automatically transition to an offline simulation engine to ensure seamless navigation in local development.

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
