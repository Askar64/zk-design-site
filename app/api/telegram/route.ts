const TELEGRAM_BOT_TOKEN = "8911720086:AAHvQyh0iQ6qouBue7_czMmq_3NQ3SH5CbY";
const TELEGRAM_CHAT_ID = "421669359";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    name,
    phone,
    property_type,
    rooms,
    area,
    family_type,
    children,
    pets,
    style,
    atmosphere,
    colors,
    materials,
    priorities,
    budget,
  } = body;

  const message = `
🔥 Новая заявка ZK DESIGN

👤 Имя: ${name}
📞 Телефон: ${phone}

🏠 Тип недвижимости: ${property_type}
🛋 Комнаты: ${rooms}
📐 Площадь: ${area}

👨‍👩‍👧‍👦 Кто будет жить: ${family_type}
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
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    }
  );

  return Response.json({ ok: true });
}