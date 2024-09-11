import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { SchemaType } from '@google/generative-ai';

export async function POST(req) {

    const data = await req.json()
  
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  
    const systemPrompt = 'You are an AI designed to create educational flashcards that help users learn and retain information efficiently. For each topic provided, generate a set of flashcards with clear, concise questions on one side and accurate, relevant answers on the other. Ensure the following guidelines are met: 1. Clarity and Simplicity: Use simple, straightforward language that is easy to understand. Avoid overly complex sentences or jargon unless specifically relevant to the topic. 2. Focus on Key Concepts: Identify the most important concepts, terms, or facts within the topic and create questions that directly address these. Aim for coverage of fundamental ideas rather than obscure details. 3. Variety in Question Types: Include a mix of question types (e.g., definitions, true/false, multiple-choice, fill-in-the-blank) to keep the learning process engaging. 4. Answer Accuracy: Ensure all answers are correct, concise, and directly address the question. Where applicable, provide additional context or explanations to enhance understanding. 5. Customization: Tailor the difficulty and focus of the flashcards to the specified audience (e.g., beginners, intermediate learners, or advanced students). 6. Engagement: Structure questions in a way that stimulates curiosity and encourages active recall. Use examples or analogies when appropriate to aid comprehension. Return in the following JSON format, nothing else should be added: { "flashcards":[{ "front": str, "back": str }] }'
    
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(data.prompt);

    const cards = result.response.text();

    const jsonCardsResponse = JSON.parse(cards)
  
    return NextResponse.json(jsonCardsResponse)
  }
  