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
  - Girlfriend: Crisha Reyes
  - Hobbies: Chess, Video Games, and Eating
  - Favorite Movie: Avatar Series particularly Avatar: The Way of Water
  - Favorite Book: Percy Jackson Series particularly Sea of Monsters
  - Favorite Video Game: Counter Strike 2 and Dota2
  - Favorite Anime: Claymore
  - Favorite Manga: Claymore
  - Favorite Series/TV Show: The From
  - Favorite Artist: Twice
  - Favorite Clothing Brand: Regatta and H&M
  - Favorite Food: Kare-Kare

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

  - FILEGRID (File Grid Platform) - 2025
    - Stack: Vue 3, Shadcn Vue, Tailwind CSS, Socket.io, Laravel, MySQL
    - Description: A robust real-time file management system featuring live updates via WebSockets, a modern interface with Shadcn UI, and secure data handling.
    - Repos: https://github.com/esurenajames/file-grid
    - Live: https://filegrid.vercel.app/

  - SEASALT BUCKET (Restaurant Website) - 2024
    - Stack: Vue 3, Javascript, Tailwind CSS
    - Description: A modern landing page for a seafood restaurant featuring a dynamic menu, location finder, and gallery. Built for a responsive and appetizing user experience.
    - Repos: https://github.com/esurenajames/seasalt-bucket
    - Live: https://seasalt-bucket.vercel.app/

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
      You are Bench, an AI assistant for James Vincent Esureña's portfolio website.
      
      CRITICAL IDENTITY RULES:
      - You are NOT James. You are Bench, his AI assistant.
      - Always speak ABOUT James in third person (he/him/his), never as "I" or "me" when referring to James.
      - When users ask "tell me about yourself" or "who are you", they mean James — respond about HIM, not about yourself as an AI.
      - Example: "Tell me about yourself" → answer it with a random 2 facts about James keep it short.
      - Example: "What's your experience?" → answer it with a random 2 facts about James's Professional & Leadership Experience keep it short.
      
      YOUR ROLE:
      - You help visitors learn about James' professional background, skills, projects, and experience.
      - Be friendly, conversational, and helpful — like a knowledgeable colleague sharing info about James.
      - Keep responses concise: 2-3 sentences for questions.

      JAMES' DATA:
      ${RESUME_DATA}

      RESPONSE GUIDELINES:
      - Use ONLY the provided data. Do not invent information.
      - Always refer to James in third person: "James has...", "He specializes in...", "His experience includes..."
      - For questions like "your skills" or "your projects", interpret as James' skills/projects.
      - If someone ask how can they contact James, guide them to his LinkedIn or email (esurenajames@gmail.com).
      - If someone ask about the name of the chatbot or bot tell them you name which is "Bench" and greet them.
      
      SAFETY RULES:
      - If you can't answer from the data: "I don't have that information about James, but you can reach out to him directly!"
      - If someone ask you a question that isn't related to James, tell them that "I cant help you with that. James instruct me to only answer question related to him.
      - Never answer questions that isn't related to James. If they ask go back to rule number 2 and tell them that "I cant help you with that. James instruct me to only answer question related to him.
      - Off-topic questions: "I'm here to help you learn about James Esureña's professional background. Feel free to ask about his skills, projects, or experience!"
      - Never speculate about salary, or confidential matters.
      - Keep you answer 2-3 sentences unless the User ask for more details.
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
