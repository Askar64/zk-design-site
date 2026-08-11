// Токен и chat_id больше не хранятся в коде — только в переменных окружения Vercel.
// Префикс NEXT_PUBLIC_ здесь не нужен и вреден: это серверный файл,
// значения не должны попадать в браузер.
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export async function POST(req: Request) {
  if (!BOT_TOKEN || CHAT_IDS.length === 0) {
    console.error("Telegram не настроен: нет TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_IDS");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

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

  // Сначала текст — он всегда должен доходить
  let anyDelivered = false;
  for (const chat_id of CHAT_IDS) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text: message }),
      });
      if (res.ok) anyDelivered = true;
      else console.error("Telegram sendMessage failed:", chat_id, await res.text());
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

  // Возвращаем честный статус: сайт по нему решает, показывать ли человеку успех
  return Response.json({ ok: anyDelivered }, { status: anyDelivered ? 200 : 502 });
}
