const BOT_TOKEN = "8911720086:AAHvQyh0iQ6qouBue7_czMmq_3NQ3SH5CbY";
const CHAT_IDS = [
  "421669359",
  "724141323",
];

export async function POST(req: Request) {
  const body = await req.json();

  const {
    name, phone, property_type, rooms, area,
    family_type, children, pets, style, atmosphere,
    colors, materials, priorities, budget,
  } = body;

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

  // Сначала текст — всегда должен доходить
  for (const chat_id of CHAT_IDS) {
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: message }),
      });
    } catch (e) {
      console.error("Ошибка отправки текста:", e);
    }
  }

  // PDF отдельно — если упадёт, текст уже ушёл
  try {
    const { generateMoodboardPDF } = await import("../../../lib/generate-moodboard-pdf");

    const host = req.headers.get("host") || "";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const pdfBuffer = await generateMoodboardPDF({
      name, style, atmosphere, colors, materials, rooms, budget, baseUrl,
    });

    for (const chat_id of CHAT_IDS) {
      try {
        const formData = new FormData();
        formData.append("chat_id", chat_id);
        formData.append(
          "document",
          new Blob([new Uint8Array(pdfBuffer)], { type: "application/pdf" }),
          `moodboard-${name}.pdf`
        );
        formData.append("caption", `📎 Мудборд для ${name}`);
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
          method: "POST",
          body: formData,
        });
      } catch (e) {
        console.error("Ошибка отправки PDF:", e);
      }
    }
  } catch (e) {
    console.error("Ошибка генерации PDF:", e);
  }

  return Response.json({ ok: true });
}