import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { comments } = await req.json();

    if (!comments || comments.length === 0) {
      return NextResponse.json(
        { error: "No comments provided" },
        { status: 400 }
      );
    }

    // Combine and limit reviews 
    const reviewText = comments
      .map((c: any) => c.content)
      .slice(0, 5)
      .join("\n\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
      Analyze the following movie reviews.

      Provide:
      1. A short summary (4-5 sentences).
      2. Overall sentiment: "Positive" or "Negative".
      3. Estimated positive percentage (number only).
      4. Estimated negative percentage (number only).
      5. Top 3 themes viewers mention.

      Return ONLY valid JSON in this format:

      {
        "summary": "text",
        "sentiment": "Positive or Negative",
        "positivePercentage": number,
        "negativePercentage": number,
        "themes": ["theme1", "theme2", "theme3"]
      }

      Reviews:
      ${reviewText}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean Gemini markdown 
    const cleaned = text.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);

  } catch (error) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      { error: "AI analysis failed" },
      { status: 500 }
    );
  }
}