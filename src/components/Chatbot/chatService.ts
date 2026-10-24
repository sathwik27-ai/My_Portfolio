'use server'

import { createServerFn } from "@tanstack/react-start";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

const SYSTEM_PROMPT = `You are Chandanapu Sathwik's AI Assistant ("Sathwik Portfolio Guide"), a helpful, professional, and friendly agent representing Chandanapu Sathwik.
Your goal is to answer recruiter or visitor questions about Sathwik accurately based on the factual context below.

FACTUAL CONTEXT ABOUT SATHWIK:
- Name: Chandanapu Sathwik
- Role: AI Developer & Computer Science (Data Science) Student at VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET), Hyderabad.
- Current Status: CSE (Data Science) Candidate, CGPA: 9.53/10.
- Education:
  - B.Tech CSE (Data Science) at VNRVJIET: 9.53 CGPA (2024-2028)
  - Narayana Junior College: 98.5% (2022-2024)
  - Siddhartha E/M High School: 10.0 CGPA (2021-2022)
- Key Credentials & Achievements:
  - LeetCode Rating: 1600+ (300+ solved)
  - CodeChef Rating: 1400+ (2-star)
  - Codeforces Rating: 1100+
  - Top 3 Finalist at Convergence 24-Hour Software Hackathon - VNR VJIET
  - Ranked within top 3000 on Smart Interviews competitive programming platform
- Core Traits: Problem Solver, Full-Stack Developer, AI Enthusiast, Collaborative Team Player.
- Work & Co-curricular Experience:
  - Event Organization Volunteer at VJ Data Questers Club, VNRVJIET (Present): Coordinates technical coding events, hackathons, and workshops on campus.
  - Community Outreach Volunteer at National Service Scheme (NSS), VNRVJIET (Present): Organizes literacy drives, health camps, and digital safety programs.
  - Student Chapter Member at ISTE VNRVJIET Chapter (Present): Guides peer learning forums and algorithmic project showcases.
- Core Technical Skills:
  - Languages: C, C++, Python, R, JavaScript, SQL.
  - Web Development: HTML, CSS, Bootstrap, Tailwind CSS, React.js, Next.js, Node.js, Express.js, Flask, FastAPI.
  - Databases: MongoDB, MySQL, Firebase, Supabase, PostgreSQL, Neo4j.
  - Tools & Platforms: Git, VS Code, Jupyter, Google Colab, Tableau, Power BI, Docker.
- Key Projects:
  - Autonomous Fraud Investigation System (Focus Project): Graph-powered fraud investigation pipeline combining transaction rules, account history, and Neo4j graph relationships with LangGraph orchestration. (Live: https://autonomous-fraud-investigation.vercel.app/)
  - GridPulse — EV Charging and Grid Simulation (Focus Project): Real-time energy management simulator modelling vehicle charge levels, departure deadlines, building demand, and solar generation with priority-based allocation. (Live: https://grid-pulse-pi.vercel.app/)
  - Adaptive Fitness Companion (Focus Project): Full-stack fitness board providing user onboarding workflows, personalized workout planning, and MongoDB sync. (Live: https://adaptive-fitness-seven.vercel.app/)
  - Trevia — AI Travel Planner: AI-driven travel advisory platform generating bespoke itineraries across India based on customizable budget allocations, safety features, and local culinary discoveries. (Live: https://trevia-project.vercel.app)
  - SleepSense — Focus and Fatigue Companion: Browser-based facial-landmark monitoring application utilizing MediaPipe and eye-closure heuristics for fatigue detection and focus alerts. (Live: https://sleep-sense-2706.vercel.app/)
  - Predictive Student Success Dashboard: ML model predicting student course completion outputs and dropout risks at 90% accuracy with JWT-secured analytics dashboards. (Live: https://student-dropout-risk-prediction-sigma.vercel.app)
  - BookBank — Enterprise Library Management: Enterprise library platform featuring role-based access control, PostgreSQL row-level security (RLS), and automated daily fine calculations. (Live: https://book-bank-management.vercel.app)
  - SkyCast — World Weather Explorer: Global weather explorer combining OpenWeather forecasting, OpenStreetMap Nominatim geocoding, and Leaflet interactive map exploration. (Live: https://sky-cast-weather-nine.vercel.app/)
  - Face Recognition Attendance System: Biometric attendance tracking system utilizing InsightFace and ONNX Runtime for local facial landmark analysis, embedding generation, and SQLite vector logging.
- Certifications:
  - Python 100 Days of Code (Udemy)
  - Accenture Developer Career Simulation
  - Cisco Cybersecurity Essentials
  - Deloitte Tech Career Job Simulation
  - Turing Cup 2K26 Finalist
- Contact Info:
  - Email: sathwik12006@gmail.com
  - GitHub: https://github.com/sathwik27-ai
  - LinkedIn: https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/
  - LeetCode: https://leetcode.com/u/Sathwik-1234/
  - CodeChef: https://www.codechef.com/users/sathwik_27_06
  - Codeforces: https://codeforces.com/profile/sathwik_27_06

RULES:
- Be clean, concise, and professional.
- Talk in first-person as representing Sathwik's agent ("I can tell you that Sathwik has...").
- Keep replies relative to Sathwik's expertise. Ignore questions completely unrelated to professional hiring, coding, or computing.
- If asked a question about something not in this context, politely mention that you do not have that specific information.
- STRICT KNOWLEDGE BOUNDARY: Sathwik's credentials, experience, projects, and certifications are ONLY what is listed in the FACTUAL CONTEXT above. Do not hallucinate, make up, or extrapolate any other experience, job roles, or certificates.
- Under no circumstances should you generate code blocks, general programming tutorials, or perform general-purpose assistant tasks. Keep focus entirely on Sathwik's portfolio credentials.`;

// Graceful offline mock responses when OpenAI API Key is not set yet
function getFallbackModelReply(query: string): string {
    const q = query.toLowerCase();

    if (q.includes("cgpa") || q.includes("study") || q.includes("education") || q.includes("college") || q.includes("vnrvjiet")) {
        return "Sathwik is currently pursuing his B.Tech in Computer Science & Engineering (Data Science) at VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET), Hyderabad, holding an excellent CGPA of 9.53/10.";
    }

    if (q.includes("skills") || q.includes("languages") || q.includes("tech") || q.includes("framework")) {
        return "Sathwik specializes in Full Stack, AI development, and Data Science. His tech stack includes React, Next.js, Node.js, Python, TypeScript, FastAPI, Flask, Tailwind CSS, PostgreSQL, Neo4j, MongoDB, and Gemini API.";
    }

    if (q.includes("project")) {
        return "Sathwik has developed several notable projects:\n\n1. **Autonomous Fraud Investigation System** (Live — Focus Project)\n2. **GridPulse — EV Charging & Grid Simulation** (Live — Focus Project)\n3. **Adaptive Fitness Companion** (Live — Focus Project)\n4. **Trevia — AI Travel Planner** (Live)\n5. **SleepSense — Focus & Fatigue Companion** (Live)\n6. **Predictive Student Success Dashboard** (Live)\n7. **BookBank — Enterprise Library Management** (Live)\n8. **SkyCast — World Weather Explorer** (Live)\n9. **Face Recognition Attendance System** (InsightFace & ONNX)";
    }

    if (q.includes("achievement") || q.includes("codechef") || q.includes("leetcode") || q.includes("rating") || q.includes("hackathon")) {
        return "Sathwik is an active competitive programmer with 300+ problems solved on LeetCode (peak rating 1600+), 2-star on CodeChef (1400+ rating), 1100+ on Codeforces, Top 3 Finalist at Convergence 24-Hour Software Hackathon (VNR VJIET), and ranked in the top 3000 on Smart Interviews.";
    }

    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("linkedin")) {
        return "You can get in touch with Sathwik via email at sathwik12006@gmail.com, connect with him on LinkedIn (linkedin.com/in/chandanapu-sathwik-20b54234a), or check out his active GitHub configurations (github.com/sathwik27-ai).";
    }

    if (q.includes("experience") || q.includes("volunteer") || q.includes("activities")) {
        return "Sathwik has three key contribution roles:\n\n1. **Event Organization Volunteer** at VJ Data Questers Club, VNRVJIET.\n2. **Community Outreach Volunteer** at National Service Scheme (NSS, VNRVJIET).\n3. **Student Chapter Member** at ISTE VNRVJIET Chapter.";
    }

    return "Hi! I am Sathwik's virtual developer assistant. I can answer inquiries about his education (VNRVJIET, 9.53 CGPA), competitive coding ratings, skills (React/Next.js/Python/FastAPI), certifications, and projects. What would you like to know?";
}

export const chatWithLLM = createServerFn({ method: "POST" })
    .validator((messages: ChatMessage[]) => messages)
    .handler(async ({ data: messages }) => {
        const apiKey = process.env.OPENAI_API_KEY || "";

        if (!apiKey) {
            // Simulate real product delay (450ms) for high-end look and feel
            await new Promise(resolve => setTimeout(resolve, 450));
            const userMessage = messages[messages.length - 1]?.content || "";
            return getFallbackModelReply(userMessage);
        }

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...messages.map(m => ({ role: m.role, content: m.content }))
                    ],
                    temperature: 0.7,
                    max_tokens: 450
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API responded with error: ${response.status}`);
            }

            const json = await response.json();
            return json.choices[0]?.message?.content || "Sorry, I couldn't process that response.";
        } catch (error) {
            console.error("Chat GPT API Error:", error);
            const userMessage = messages[messages.length - 1]?.content || "";
            return `[API Error fallbacked to local client]: ${getFallbackModelReply(userMessage)}`;
        }
    });
