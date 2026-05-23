import { generateMoodboardPDF } from "../../../lib/generate-moodboard-pdf";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    name, phone, property_type, rooms, area,
    family_type, children, pets, style, atmosphere,
    colors, materials, priorities, budget,
  } = body;

  // 1. Отправляем текст с заявкой
  const message = `
🔥 Новая заявка ZK DESIGN

👤 Имя: ${name}
📞 Телефон: ${phone}

🏠 Тип: ${property_type}
🛋 Комнаты: ${rooms}
📐 Площадь: ${area}

👨‍👩‍👧‍👦 Кто живёт: ${family_type}
👶 Дети: ${children}
🐾 Животные: ${pets}

🎨 Стиль: ${style}
✨ Атмосфера: ${atmosphere}
🌈 Цвета: ${colors}
🪵 Материалы: ${materials}

⭐ Приоритеты: ${priorities}
💰 Бюджет: ${budget}
`;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    }
  );

  // 2. Генерируем PDF и отправляем файлом
  try {
    const host = req.headers.get("host") || "";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const pdfBuffer = await generateMoodboardPDF({
      name, style, atmosphere, colors, materials, rooms, budget, baseUrl,
    });

    const formData = new FormData();
    formData.append("chat_id", process.env.TELEGRAM_CHAT_ID!);
    formData.append(
      "document",
      new Blob([new Uint8Array(pdfBuffer)], { type: "application/pdf" }),
      `moodboard-${name}.pdf`
    );
    formData.append("caption", `📎 Мудборд для ${name}`);

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      { method: "POST", body: formData }
    );
  } catch (e) {
    console.error("PDF generation error:", e);
  }

  return Response.json({ ok: true });
}