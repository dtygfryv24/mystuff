import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const telegramToken = process.env.NEXT_PUBLIC_TOKEN;
  const telegramChatId = process.env.NEXT_PUBLIC_ID;

  const res = await fetch(
    `https://api.telegram.org/bot${telegramToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: "Markdown",
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}