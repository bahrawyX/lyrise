import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const N8N_WEBHOOK_URL = "https://sensei07.app.n8n.cloud/webhook-test/get-quote";

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Call n8n webhook
    const { data } = await axios.post(N8N_WEBHOOK_URL, {
      category,
      role: "user"
    });

    // Extract quote text from n8n response
    const quoteText = data.content?.parts?.[0]?.text || "";
    
    if (!quoteText) {
      throw new Error("No quote received from n8n");
    }

    // Split quote and author (format: "Quote text - Author Name")
    const [text, author = "Unknown"] = quoteText.split(" - ").map((s: string) => s.trim());

    return NextResponse.json({
      id: `${category}_${Date.now()}`,
      text,
      author,
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
