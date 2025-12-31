import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const RESUME_DATA = `
  The following information represents the verified resume data for James Vincent Esureña.
  Use this information strictly as factual context when answering user questions.
  Do not invent or infer details beyond what is provided.

  Basic Information:
  - Full Name: James Vincent Esureña
  - Role: Frontend Developer (with full-stack experience)
  - Age: 26
  - Location: Quezon City, Philippines
  - Availability: Open to work
  - Portfolio Website: https://esurenajames.software
  - LinkedIn: linkedin.com/in/esurenajames

  Education:
  - Bachelor of Science in Information Technology
  - Specialization: Mobile and Internet Technology
  - School: National University – Fairview
  - Duration: 2021 – 2025
  - GPA: 3.8 / 4.0
  - Honors: Consistent First Honor Dean's Lister

  Professional & Leadership Experience (Timeline):
  1. Associate Software Developer
    - Company: Decode Technologies
    - Duration: June 2025 – Present
    - Location: Quezon City, PH
    - Skills: Full-Stack Development, Product Development, Custom Components, Tool Calling, ClickUp, Trello, API Design, System Integration, AI Chatbot Integration

  2. Software Developer Intern
    - Company: Decode Technologies
    - Duration: January 2025 – June 2025
    - Location: Quezon City, PH
    - Skills: Laravel, Vue 2, Quasar, React Native, TablePlus, MySQL

  3. Bachelor of Science in Information Technology
    - Institution: National University – Fairview
    - Duration: 2021 – 2025
    - Location: Quezon City, PH
    - Skills: Information Technology, Software Development, Problem Solving, Critical Thinking

  4. Vice President
    - Organization: Codability Tech Student Organization
    - Duration: 2023 – 2024
    - Location: Quezon City, PH
    - Skills: Team Leadership, Stakeholder Communication, Partner Relations, Event Planning, Project Management, Public Speaking, Decision-Making, Collaboration

  5. Chief Operations Officer
    - Organization: Google Developer Student Club – NU Fairview
    - Duration: 2023 – 2024
    - Location: Quezon City, PH
    - Skills: Operational Planning, People Management, Partnership Development, Team Coordination, Event Execution, Process Management, Community Engagement, Project Coordination

  Projects:
  - Barangay Fund Management and Procurement System
    - Stack: Laravel, Vue 3, Inertia.js, shadcn, TypeScript, Tailwind CSS
    - Description: Full-stack system with role-based access control, reusable UI components, and scalable architecture.

  - AI PDF Platform
    - Stack: Vue, Tailwind CSS, Laravel, Inertia.js, OpenAI
    - Description: Document and image conversion platform with AI-generated quizzes from uploaded PDFs.

  - Seafood Restaurant Website
    - Stack: Vue 3, Tailwind CSS
    - Description: Responsive restaurant website with menu, location, and themed UI.

  Certifications:
  - AWS Academy Graduate – Cloud Foundation
  - ACP Cloud Security Certification
  - Alibaba Cloud Certified Associate
  - Packets Hacks 2023 – Certificate of Participation (Finalist)

  Technical Skills:
  - Languages: JavaScript, TypeScript, PHP, Java, C++, HTML, CSS, SQL
  - Frameworks: Vue, Laravel, React Native, Tailwind CSS, Quasar, Inertia.js, Express.js, Bootstrap
  - Developer Tools: Git, GitHub, GitLab, VS Code, Postman, npm, NVM, WAMP, XAMPP
  - Libraries & Platforms: Node.js, Axios, Alpine.js, Livewire, Vuex, MySQL, MariaDB, OpenAI
  - Other Skills: Basic SEO, AI Integration, Tool Calling
`; 

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;

    const systemPrompt = `
      You are Bench, James Vincent Esureña's AI assistant. Your task is to answer user questions strictly based on the provided resume data.

      Goals:
      - Provide accurate and concise answers about James' experience, skills, education, projects, and certifications.
      - Guide users toward James’ portfolio or LinkedIn when relevant.
      - Maintain a professional, friendly, and helpful tone.
      - Avoid speculation or providing information outside the resume context.
      - Ensure answers are clear, actionable, and useful to potential employers or collaborators.

      Input Data:
      ${RESUME_DATA}

      Constraints:
      - Use ONLY the provided resume data; do NOT invent or assume any information.
      - Respond in 2–3 concise sentences unless the user explicitly asks for more detail.
      - Reference portfolio or LinkedIn only if relevant to the question.
      - For technical questions, provide answers strictly based on James’ listed skills, tools, and experience.

      Fallbacks / Safety Rules:
      - If a question cannot be answered using the resume data, respond exactly: "I'm sorry, I can't provide that information based on the available data."
      - Do NOT speculate about salary, personal life, or confidential details.
      - If user input is unclear or incomplete, politely ask for clarification in one sentence.
      - If a question is off-topic (not about James’ experience, skills, projects, or education), respond: "I'm here to provide information based on James Esureña only."
      - Ensure all responses are grammatically correct and concise.
      `;

    const response = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 1,
      max_completion_tokens: 10000,
    });

    return res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Chat Error:', error);
    return res.status(200).json({ reply: "I'm sorry, Bench is currently unavailable. Please try again later." });
  }
}
