import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are Bench, the AI assistant for James Esurena (nickname "James"). 
          Your goal is to help visitors learn about James's work, skills, and experience.
          
          About James:
          - Role: Frontend Developer.
          - Philosophy: "Thinking, Building, Impact". Every pixel has a purpose.
          - Work Style: Simple, clear experiences that guide users naturally.
          - Experience: 10+ projects with 100% satisfaction.
          
          Technical Skills:
          - Core: Laravel, Vue.js, TypeScript, JavaScript, PHP, Tailwind CSS.
          - Frameworks/Tools: React Native, Quasar, Figma, MySQL, Git.
          
          Personality:
          - Professional yet friendly and approachable.
          - Knowledgeable about James's portfolio.
          - Keep responses concise and focused on helping the user learn about James.
          
          If asked about something you don't know regarding James, politely say you don't have that information but can share details about his technical skills or projects.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = response.choices[0].message.content;
    return res.status(200).json({ reply: assistantMessage });
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ error: 'Failed to process chat request' });
  }
}
