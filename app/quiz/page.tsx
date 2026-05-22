"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

const styles = [
  "Современный",
  "Минимализм",
  "Japandi",
  "Неоклассика",
  "Luxury",
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState("");
  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function submitLead() {
  const { error } = await supabase.from("leads").insert([
    {
      style,
      area,
      name,
      phone,
    },
  ]);

  if (error) {
    console.log(error);
    alert("Ошибка отправки заявки");
    return;
  }

  await fetch("/api/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      style,
      area,
      name,
      phone,
    }),
  });

  alert("Заявка отправлена");
}

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-3xl flex-col px-6 py-24">
        <div className="mb-10">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-white transition-all"
              style={{
                width: `${((step + 1) / 3) * 100}%`,
              }}
            />
          </div>
        </div>

        {step === 0 && (
          <>
            <h1 className="text-5xl font-semibold leading-tight">
              Какой стиль вам ближе?
            </h1>

            <div className="mt-10 grid gap-4">
              {styles.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setStyle(item);
                    setStep(1);
                  }}
                  className={`rounded-2xl border p-6 text-left text-xl transition ${
                    style === item
                      ? "border-white bg-white text-black"
                      : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="text-5xl font-semibold leading-tight">
              Какая площадь помещения?
            </h1>

            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Например: 42 м²"
              className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl outline-none"
            />

            <button
              onClick={() => setStep(2)}
              className="mt-8 rounded-2xl bg-white px-8 py-4 text-lg font-medium text-black"
            >
              Далее
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-5xl font-semibold leading-tight">
              Оставьте контакты
            </h1>

            <div className="mt-10 grid gap-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                className="rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl outline-none"
              />

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                className="rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl outline-none"
              />

              <button
                onClick={submitLead}
                className="mt-4 rounded-2xl bg-white px-8 py-4 text-lg font-medium text-black"
              >
                Отправить
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}