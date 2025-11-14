import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/threads
 *
 * Lists all ChatKit threads (admin endpoint)
 * This queries OpenAI's ChatKit API to see all conversations
 */
export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API ключ OpenAI не настроен" },
        { status: 500 }
      );
    }

    // Get threads from ChatKit
    const response = await fetch("https://api.openai.com/v1/chatkit/threads", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "chatkit_beta=v1",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Failed to fetch threads:", errorData);
      return NextResponse.json(
        {
          error: "Не удалось получить потоки из ChatKit",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching threads:", error);
    return NextResponse.json(
      {
        error: "Внутренняя ошибка сервера",
        details: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 }
    );
  }
}
