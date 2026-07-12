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
- Role: AI Developer & Computer Science Student at VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET), Hyderabad.
- Current Status: CSE Candidate, CGPA: 9.63/10.
- Key Credentials:
  - LeetCode Max Rating: 1630
  - CodeChef Rating: 1409 (2-star)
  - Algorithmic problems solved: 500+
- Core Traits: Problem Solver, Full-Stack Developer, AI Enthusiast, Collaborative Team Player.
- Work & Co-curricular Experience:
  - Event Organization Volunteer at VJ Data Questers Club, VNRVJIET (Present): Coordinates technical coding events, hackathons, and workshops on campus.
  - Community Outreach Volunteer at National Service Scheme (NSS), VNRVJIET (Present): Organizes literacy drives, health camps, and digital safety programs.
  - Student Chapter Member at ISTE VNRVJIET Chapter (Present): Guides peer learning forums and algorithmic project showcases.
- Core Technical Skills:
  - Languages: Python, Java, JavaScript, TypeScript, C++, HTML5/CSS3.
  - Frameworks & Libraries: React, Next.js, TanStack Start, Node.js, Express, Flask, Tailwind CSS.
  - AI & Data Science: OpenAI API, Gemini API, Hugging Face, Scikit-Learn, Pandas, NumPy, SQL.
  - Tools & Platforms: Git, GitHub, Docker, Postman, Vercel, Vim/Bash.
- Key Projects:
  - Trevia — AI Travel Planner: AI-driven travel advisory platform generating bespoke itineraries across India based on customizable budget allocations, safety features, and local culinary discoveries.
  - AI-Driven Financial Literacy Engine: Personal Finance Mentoring web app powered by Gemini API, achieving rapid response telemetry (<2s latency) over detailed queries and delivering user budgeting insight loops.
  - Predictive Student Success Dashboard: Machine Learning model predicting student course completion outputs and dropout risks at 90% accuracy, featuring a JWT-secured dashboard.
  - Adaptive Fitness Companion: Full-stack client health board serving weekly active subscribers, featuring scheduling engines and workout synchronization.
- Certifications:
  - Python 100 Days of Code (Udemy)
  - Accenture Developer Career Simulation
  - Cisco Cybersecurity Essentials
  - Deloitte Tech Career Job Simulation
  - Turing College Python & SQL
- Contact Info:
  - Email: sathwik12006@gmail.com
  - GitHub: https://github.com/sathwik27-ai
  - LinkedIn: https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/

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
        return "Sathwik is currently pursuing his B.Tech in Computer Science & Engineering at VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET), Hyderabad, holding an excellent CGPA of 9.63/10.";
    }

    if (q.includes("skills") || q.includes("languages") || q.includes("tech") || q.includes("framework")) {
        return "Sathwik specializes in Full Stack, AI development, and Data Science. His tech stack includes React, Next.js, Node.js, Python, TypeScript, Java, Tailwind CSS, Scikit-Learn, SQL, and APIs like Gemini and OpenAI.";
    }

    if (q.includes("project")) {
        return "Sathwik's projects include:\n\n1. **Trevia — AI Travel Planner**: Gemini-powered custom travel advisor and safety recommender inside India.\n2. **AI-Driven Financial Literacy Engine**: Personal finance mentors with minimal response latency and budgeting feedback loops.\n3. **Predictive Student Success Dashboard**: ML-driven dropout forecasting with 90% accuracy and analysis dashboarding.\n4. **Adaptive Fitness Companion**: A full-stack health board synchronizing background workouts with MongoDB databases.";
    }

    if (q.includes("achievement") || q.includes("codechef") || q.includes("leetcode") || q.includes("rating")) {
        return "Sathwik is an active competitive programmer with 500+ problems solved across platforms. He has a max rating of 1630 on LeetCode and a 1409 (2-star) rating on CodeChef.";
    }

    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("linkedin")) {
        return "You can get in touch with Sathwik via email at sathwik12006@gmail.com, connect with him on LinkedIn (linkedin.com/in/chandanapu-sathwik-20b54234a), or check out his active GitHub configurations (github.com/sathwik27-ai).";
    }

    if (q.includes("experience") || q.includes("volunteer") || q.includes("activities")) {
        return "Sathwik has three key contribution roles:\n\n1. **Event Organization Volunteer** at VJ Data Questers Club, VNRVJIET (managing hackathons & bootcamps).\n2. **Community Outreach Volunteer** at National Service Scheme (NSS, VNRVJIET).\n3. **Student Chapter Member** at ISTE VNRVJIET.";
    }

    return "Hi! I am Sathwik's virtual developer assistant. I can answer inquiries about his education (VNRVJIET, 9.63 CGPA), competitive coding ratings, skills (React/Node/Python), certifications, and projects. What would you like to know?";
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
