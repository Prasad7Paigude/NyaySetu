// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Call your Python backend API
    const pythonApiUrl = process.env.PYTHON_API_URL || "http://localhost:8000/chat";
    
    const response = await fetch(pythonApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        history: history || [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Python API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      response: data.response || data.message || "I'm not sure how to respond to that.",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    
    // Return a fallback response for testing
    return NextResponse.json({
      response: "I apologize, but I'm currently unable to process your request. Please try again later.",
    }, { status: 200 }); // Return 200 so frontend doesn't show error
  }
}