export async function POST(request: Request) {
  const body = await request.json();

  const BOT_TOKEN = "8911720086:AAHvQyh0iQ6qouBue7_czMmq_3NQ3SH5CbY";
  const CHAT_ID = "421669359";

  const message = `
🆕 Новая заявка ZK Design

🎨 Стиль: ${body.style}
📐 Площадь: ${body.area}
👤 Имя: ${body.name}
📞 Телефон: ${body.phone}
`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
    }),
  });

  return Response.json({ ok: true });
}