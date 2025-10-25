import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const N8N_WEBHOOK_URL = "https://sensei07.app.n8n.cloud/webhook/get-quote";

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const { data } = await axios.post(N8N_WEBHOOK_URL, {
      category,
      role: "user"
    });

    const quoteData = JSON.parse(data.content?.parts?.[0]?.text || "{}");
    
    return NextResponse.json({
      id: `${category}_${Date.now()}`,
      text: quoteData?.quote,
      author: quoteData?.author,
      category: {
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        color: getCategoryColor(category),
      },
    });
  } catch (error) {
    console.error("Error generating quote:", error);
    return NextResponse.json(
      { error: "Failed to generate quote" },
      { status: 500 }
    );
  }
}

function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    romantic: "rose",
    inspirational: "blue",
    motivational: "orange",
    wisdom: "purple",
    success: "emerald",
    life: "cyan",
  };
  return colorMap[category.toLowerCase()] || "blue";
}
