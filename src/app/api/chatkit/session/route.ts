import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

/**
 * POST /api/chatkit/session
 *
 * Creates a ChatKit session for connecting to OpenAI Agent Builder workflows
 *
 * This endpoint exchanges the server-side API key for a client-side token
 * that can be used by the ChatKit component to communicate with the workflow.
 */
export async function POST(request: NextRequest) {
  try {
    const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!workflowId) {
      return NextResponse.json(
        { error: "Workflow ID не настроен" },
        { status: 500 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "API ключ OpenAI не настроен" },
        { status: 500 }
      );
    }

    // Get user ID from request body (sent from frontend)
    const body = await request.json().catch(() => ({}));
    const userId = body.userId || randomUUID();

    // Create a session with OpenAI's ChatKit API
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: userId,
        chatkit_configuration: {
          file_upload: {
            enabled: false,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("ChatKit session creation failed:", errorData);
      return NextResponse.json(
        {
          error: "Не удалось создать сессию ChatKit",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const sessionData = await response.json();
    console.log("Session data received for user:", userId);

    // Return the client secret that the frontend will use
    return NextResponse.json({
      client_secret: sessionData.client_secret?.value || sessionData.client_secret,
    });
  } catch (error) {
    console.error("Error creating ChatKit session:", error);
    return NextResponse.json(
      {
        error: "Внутренняя ошибка сервера",
        details: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 }
    );
  }
}
