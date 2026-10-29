# 🌿 Chandanapu Sathwik — Personal Developer Portfolio

> An art-directed, highly performant developer portfolio built to showcase full-stack engineering, algorithmic problem solving, and AI systems development. Powered by React 19, TanStack Start, Three.js, Tailwind CSS v4, and dual bespoke themes: **Juicy Pastels** (Light) & **Midnight Garden** (Dark).

---

## 🔗 Live Links & Profiles

* **Live Portfolio:** [https://sathwik27.vercel.app](https://sathwik27.vercel.app/)
* **GitHub Profile:** [https://github.com/sathwik27-ai](https://github.com/sathwik27-ai)
* **LinkedIn:** [https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/](https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/)
* **LeetCode Profile:** [https://leetcode.com/u/Sathwik-1234/](https://leetcode.com/u/Sathwik-1234/)
* **CodeChef Profile:** [https://www.codechef.com/users/sathwik_27_06](https://www.codechef.com/users/sathwik_27_06)
* **Codeforces Profile:** [https://codeforces.com/profile/sathwik_27_06](https://codeforces.com/profile/sathwik_27_06)

---

## 🎨 Distinctive Visual Identity & Theming

The portfolio features a custom, cohesive design system that deliberately avoids the generic AI website aesthetic (no oversaturated purple/blue neon glows or identical glassmorphism).

### ☀️ Light Theme: "Juicy Pastels"
* **Background & Surfaces:** Warm cream (`#FAF8F2`), crisp white cards (`#FFFFFF`), and sage-tinted secondary surfaces (`#F1F3EB`).
* **Accents:** Curated soft pastel palette inspired by mint (`#CDEBDD`), peach (`#FFD7C2`), sage (`#8DB7A1`), butter yellow (`#F5E6A8`), and soft lavender (`#DCD5F4`).
* **Typography & Contrast:** Deep charcoal (`#242923`) and muted sage charcoal (`#626960`), providing WCAG AAA / AA contrast (> 12:1 for titles, > 4.8:1 for body text).

### 🌙 Dark Theme: "Midnight Garden"
* **Background & Surfaces:** Deep charcoal with organic green undertones (`#171C19`), warm slate cards (`#202823`), and elevated surfaces (`#252F29`).
* **Accents:** Luminous sage (`#A7C8AD`), soft teal (`#8CCBC0`), and restrained coral highlights (`#E9A18D`).
* **Typography & Contrast:** Warm off-white (`#F1F0E8`) and readable muted green-grey (`#BEC7BE`), providing contrast ratios exceeding 8.5:1.

---

## ✨ Signature Features & Animations

1. **Enhanced Name-Reveal Intro Screen:**
   * A signature opening reveal introducing Sathwik with radiant, art-directed gradient typography (deep emerald transitioning to vibrant warm coral in light mode; luminous off-white and soft teal in dark mode).
   * Soft concentric orbital rings and multi-layered ambient pastel blooms (mint, peach, and golden butter).
   * Fully respects `prefers-reduced-motion` and includes click-to-skip so visitors are never trapped on a loading screen.

2. **Hero Section 3D Kinetic Sculpture:**
   * Custom Three.js composition featuring a faceted icosahedron core, delicate geodesic wireframe armatures, and orbital satellite nodes.
   * Real-time theme synchronization updating material shaders, lighting, and ambient colors during theme toggles.
   * Smooth, damped pointer parallax with touch-device and `prefers-reduced-motion` awareness.

3. **Tactile 3D Project Cards:**
   * Interactive perspective tilt (`perspective(850px) rotateX(...) rotateY(...)`) on card hover with dynamic sheen reflections.
   * Clean fallback on mobile and touch devices to ensure battery efficiency and smooth scrolling.

4. **Floating 3D Background Crystals in Home Section (`FloatingBackground3D`):**
   * Scoped exclusively to the Home / Hero page: a lightweight background Three.js scene featuring 12 delicate geometric polyhedrons (octahedrons, icosahedrons, tetrahedrons, toruses, and dodecahedrons) drifting and bobbing at depth.
   * Completely isolated from other sections (About Me, Skills, Achievements, Projects, and Contact Form remain completely clean and uncluttered).
   * Features translucent metallic facets with outer wireframe halos, subtle mouse parallax, and real-time palette shifts between light and dark themes.

5. **Restored Animated Progress-Bar Skills Section:**
   * Restored the intuitive animated progress-bar and percentage rating visual design that visitors love, combined with elegant glassmorphic cards and category icons.
   * Exclusively features the verified technical stack from Chandanapu Sathwik's professional resume:
     * **Programming Languages:** C++, Python, SQL, C, JavaScript, R
     * **Web Development:** Tailwind CSS, HTML & CSS, React.js, Next.js, Flask & FastAPI, Node.js & Express.js, Bootstrap
     * **Databases:** PostgreSQL, MySQL, Supabase, MongoDB, Neo4j, Firebase
     * **Tools & Platforms:** VS Code, Git, Jupyter & Colab, Power BI, Tableau, Docker
     * **Core Coursework:** Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems (OS), Computer Networks (CN)

6. **FormSubmit.co Email Notification Pipeline (with Resilient Failover):**
   * Configured with **FormSubmit.co** (`https://formsubmit.co/sathwik12006@gmail.com`) via AJAX JSON API with `_captcha="false"`, `_template="table"`, and custom subject headers.
   * Features resilient automatic failover dispatch to ensure messages are never dropped during Cloudflare origin drops or server downtime.
   * Includes client-side guardrails ensuring test submissions use valid visitor email addresses to prevent self-mail loop filters.
   * Features a prominent **"Or Connect Directly Via Email"** section below the submit button with two 1-click alternatives:
     * **"Compose in Gmail"** (opens a pre-filled Gmail composer in the web browser)
     * **"Compose in Mail App"** (triggers the device's native mail client)
     * Direct email display: `sathwik12006@gmail.com`.

---

## 💻 Featured Projects (All 8 Deployed Applications + Research)

All deployed projects specified in the portfolio are verified and linked with live deployments and open-source repositories:

| # | Project Name | Category | Tech Stack | Live Deployment | Source Repository |
|---|---|---|---|---|---|
| 1 | **Autonomous Fraud Investigation System** ⭐ *(Focus)* | AI/ML | Python, FastAPI, Neo4j, LangGraph, Next.js | [Live Demo](https://autonomous-fraud-investigation.vercel.app/) | [GitHub](https://github.com/sathwik27-ai/Autonomous_Fraud_Investigation) |
| 2 | **GridPulse — EV Charging & Grid Simulation** ⭐ *(Focus)* | AI/ML | Python, SciPy, NumPy, React, Vite | [Live Demo](https://grid-pulse-pi.vercel.app/) | [GitHub](https://github.com/sathwik27-ai/GridPulse) |
| 3 | **Adaptive Fitness Companion** ⭐ *(Focus)* | Web | React 18, Node.js, Express, MongoDB Atlas | [Live Demo](https://adaptive-fitness-seven.vercel.app/) | [GitHub](https://github.com/sathwik27-ai/adaptive-fitness) |
| 4 | **SleepSense — Focus & Fatigue Companion** | AI/ML | React, TypeScript, MediaPipe, PostgreSQL, JWT | [Live Demo](https://sleep-sense-2706.vercel.app/) | [GitHub](https://github.com/sathwik27-ai/SleepSense) |
| 5 | **Student Dropout Risk Prediction** | AI/ML | Next.js 15, TypeScript, Scikit-Learn, JWT Auth | [Live Demo](https://student-dropout-risk-prediction-sigma.vercel.app) | [GitHub](https://github.com/sathwik27-ai/Student-Dropout-Risk-Prediction) |
| 6 | **Trevia — AI Travel Planner** | AI/ML | Next.js 16, TypeScript, Tailwind CSS, Gemini API | [Live Demo](https://trevia-project.vercel.app) | [GitHub](https://github.com/sathwik27-ai/Trevia-project) |
| 7 | **Book Bank Management** | Web | TanStack Start, React 19, Supabase, PostgreSQL | [Live Demo](https://book-bank-management.vercel.app) | [GitHub](https://github.com/sathwik27-ai/Book_Bank_Management) |
| 8 | **SkyCast Weather — World Weather Explorer** | Web | Python, Flask, OpenWeather API, Leaflet, Plotly | [Live Demo](https://sky-cast-weather-nine.vercel.app/) | [GitHub](https://github.com/sathwik27-ai/SkyCast_Weather) |
| 9 | **Face Recognition Attendance System** | AI/ML | Python, Flask, InsightFace, ONNX Runtime, OpenCV | *Repository available* | [GitHub](https://github.com/sathwik27-ai/Face-Recognition-Attendance) |

---

## 🎓 Academic Credentials & Certifications

* **B.Tech in Computer Science & Engineering (Data Science):**
  * VNR Vignana Jyothi Institute of Engineering & Technology (VNRVJIET), Hyderabad (2024–2028)
  * **SGPA: 9.53** (NAAC A++ Accredited)
* **Intermediate (MPC):** Narayana Junior College, Hyderabad (2022–2024) — **98.5%**
* **Secondary School Certificate (SSC):** Siddhartha E/M High School (2021–2022) — **CGPA 10.0**
* **Certifications:**
  * Deloitte Data Analytics Job Simulation (Forage)
  * Accenture Software Engineering Job Simulation (Forage)
  * 100 Days of Code: Python Pro Bootcamp (Udemy)
  * Python Essentials I Certification (Cisco Networking Academy)
  * Turing Cup 2K26 Finalist (VNRVJIET Coding Arena)

---

## 🛠️ Technology Stack

* **Framework & Core:** React 19, TanStack Start, TanStack Router, TypeScript 5.8
* **Styling & Design System:** Tailwind CSS v4, custom `@theme inline` CSS custom properties, Oklab color-mixing, Outfit typography
* **3D Graphics & Animations:** Three.js, GSAP 3.15, ScrollTrigger, Framer Motion
* **Assistant & Communication:** Jotform AI conversational agent integration, FormSubmit.co AJAX contact form
* **Build & Server Tools:** Vite 8, Nitro server engine, ESLint 9, Prettier

---

## ⚡ Getting Started

### Prerequisites
* Node.js 18+ or 20+
* npm (lockfile: `package-lock.json`)

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will start locally at `http://localhost:3000` (or specified Vite port).

### TypeScript Verification

```bash
npx tsc --noEmit
```

### Production Build

```bash
npm run build
```

Build outputs are compiled into `.output/` with Nitro compatibility for Vercel and Cloudflare deployments.

### Local Production Preview

```bash
npm run preview
```

---

## 📄 License & Attribution

Designed and engineered by **Chandanapu Sathwik**. Feel free to connect via [LinkedIn](https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/) or email directly at [sathwik12006@gmail.com](mailto:sathwik12006@gmail.com).
