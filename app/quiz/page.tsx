"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

const propertyTypes = [
  "Квартира",
  "Частный дом",
  "Апартаменты",
  "Коммерческое помещение",
];

const styles = [
  "Современный",
  "Минимализм",
  "Japandi",
  "Неоклассика",
  "Лофт",
];

const budgets = [
  "До 10 млн ₸",
  "10–20 млн ₸",
  "20–40 млн ₸",
  "40+ млн ₸",
];

export default function QuizPage() {
  const [step, setStep] = useState(0);

  const [propertyType, setPropertyType] = useState("");
  const [style, setStyle] = useState("");
  const [budget, setBudget] = useState("");

  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submitLead() {
    if (loading) return;

    setLoading(true);

    const { error } = await supabase.from("leads").insert([
      {
        property_type: propertyType,
        style,
        budget,
        area,
        name,
        phone,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Ошибка отправки заявки");
      setLoading(false);
      return;
    }

    await fetch("/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propertyType,
        style,
        budget,
        area,
        name,
        phone,
      }),
    });

    setSuccess(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-3xl flex-col px-6 py-24">
        <div className="mb-6 text-sm text-zinc-400">
          Шаг {step + 1} из 5
        </div>

        <div className="mb-10">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-white transition-all"
              style={{
                width: `${((step + 1) / 5) * 100}%`,
              }}
            />
          </div>
        </div>

        {step === 0 && (
          <>
            <h1 className="text-5xl font-semibold leading-tight">
              Какая у вас недвижимость?
            </h1>

            <div className="mt-10 grid gap-4">
              {propertyTypes.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setPropertyType(item);
                    setStep(1);
                  }}
                  className={`rounded-2xl border p-6 text-left text-xl transition ${
                    propertyType === item
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
              placeholder="Например: 85 м²"
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
              Какой стиль нравится?
            </h1>

            <div className="mt-10 grid gap-4">
              {styles.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setStyle(item);
                    setStep(3);
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

        {step === 3 && (
          <>
            <h1 className="text-5xl font-semibold leading-tight">
              Какой бюджет ремонта?
            </h1>

            <div className="mt-10 grid gap-4">
              {budgets.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setBudget(item);
                    setStep(4);
                  }}
                  className={`rounded-2xl border p-6 text-left text-xl transition ${
                    budget === item
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

        {step === 4 && (
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

              {success ? (
                <div className="mt-4 rounded-2xl border border-green-500 bg-green-500/10 px-6 py-5 text-center text-lg text-green-400">
                  Спасибо! Мы подготовим концепцию и свяжемся с вами.
                </div>
              ) : (
                <button
                  onClick={submitLead}
                  disabled={loading}
                  className="mt-4 rounded-2xl bg-white px-8 py-4 text-lg font-medium text-black transition disabled:opacity-50"
                >
                  {loading ? "Отправка..." : "Отправить"}
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}