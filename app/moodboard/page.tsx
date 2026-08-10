"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { selectMoodboardImages } from "../../lib/moodboard-matcher";
import { MoodboardImage } from "../../lib/moodboard-data";
import { downloadMoodboardPDF } from "./MoodboardPDF";

const WHATSAPP_PHONE = "77027668867";

export default function MoodboardPage() {
  const [images, setImages] = useState<MoodboardImage[]>([]);
  const [clientData, setClientData] = useState<Record<string, string>>({});
  const [downloading, setDownloading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("quiz_answers");
    if (!raw) return;

    const answers = JSON.parse(raw);
    setClientData(answers);

    const selected = selectMoodboardImages(
      {
        style: answers.style,
        atmosphere: answers.atmosphere,
        colors: answers.colors,
        materials: answers.materials,
        rooms: answers.rooms,
      },
      9
    );
    setImages(selected);
    setReady(true);
  }, []);

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    await downloadMoodboardPDF({
      images,
      clientName: clientData.name || "Клиент",
      style: clientData.style || "",
      atmosphere: clientData.atmosphere || "",
      colors: clientData.colors || "",
      budget: clientData.budget || "",
    });
    setDownloading(false);
  }

  // Заготовка сообщения с контекстом: вы сразу видите, кто пишет,
  // какой стиль выбрал и что уже видел концепцию.
  const whatsappText = [
    `Здравствуйте! Я ${clientData.name || ""}`.trim() + ",",
    "прошёл опрос на сайте и получил концепцию.",
    clientData.style ? `Стиль: ${clientData.style}.` : "",
    clientData.area ? `Площадь: ${clientData.area}.` : "",
    "Хочу обсудить проект.",
  ]
    .filter(Boolean)
    .join(" ");

  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappText)}`;

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs tracking-widest text-zinc-600 uppercase">
              Концепция интерьера
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              {clientData.name ? `Для ${clientData.name}` : "Ваш мудборд"}
            </h1>
            <p className="mt-2 text-zinc-500">
              {[clientData.style, clientData.atmosphere, clientData.budget]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-medium transition hover:bg-white/10 disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Создаём PDF...
                </>
              ) : (
                <>↓ Скачать PDF</>
              )}
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              Обсудить в WhatsApp
            </a>
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`relative overflow-hidden rounded-2xl bg-zinc-900 ${
                i === 0 ? "col-span-2 row-span-2 md:col-span-1" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "1" : "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Нижний призыв — человек досмотрел подборку, это лучший момент написать */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-lg">Нравится направление?</p>
          <p className="mt-2 text-zinc-400">
            Расскажем, как это выглядит именно в вашей квартире, и посчитаем стоимость проекта.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-2xl bg-white px-8 py-4 font-medium text-black transition hover:bg-zinc-200"
          >
            Написать в WhatsApp
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-700">
          Концепция подобрана под ваши предпочтения. Наш дизайнер свяжется с вами для обсуждения деталей.
        </p>
      </div>
    </main>
  );
}
