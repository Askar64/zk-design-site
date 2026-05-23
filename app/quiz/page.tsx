"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";

const questions = [
  {
    key: "propertyType",
    title: "Какая у вас недвижимость?",
    type: "single",
    options: [
      { label: "Квартира", icon: "🏢" },
      { label: "Частный дом", icon: "🏠" },
      { label: "Апартаменты", icon: "🏨" },
      { label: "Коммерческое помещение", icon: "🏪" },
    ],
  },
  {
    key: "rooms",
    title: "Какие комнаты нужно сделать?",
    type: "multi",
    options: [
      { label: "Кухня", icon: "🍳" },
      { label: "Кухня-гостиная", icon: "🛋" },
      { label: "Гостиная", icon: "🛋" },
      { label: "Спальня", icon: "🛏" },
      { label: "Детская", icon: "🧸" },
      { label: "Ванная / санузел", icon: "🚿" },
      { label: "Прихожая", icon: "🚪" },
      { label: "Гардеробная", icon: "👔" },
    ],
  },
  {
    key: "area",
    title: "Какая площадь вашего помещения?",
    type: "single",
    options: [
      { label: "До 20 м²", icon: "📐" },
      { label: "20–40 м²", icon: "📐" },
      { label: "40–70 м²", icon: "📐" },
      { label: "70–120 м²", icon: "📐" },
      { label: "Больше 120 м²", icon: "📐" },
    ],
  },
  {
    key: "familyType",
    title: "Кто будет жить в квартире?",
    type: "single",
    options: [
      { label: "Один человек", icon: "👤" },
      { label: "Пара", icon: "👫" },
      { label: "Семья с одним ребёнком", icon: "👨‍👩‍👦" },
      { label: "Семья с двумя детьми", icon: "👨‍👩‍👧‍👦" },
      { label: "Большая семья", icon: "👨‍👩‍👧‍👦" },
    ],
  },
  {
    key: "children",
    title: "Есть ли у вас дети?",
    type: "single",
    options: [
      { label: "Нет", icon: "—" },
      { label: "0–3 года", icon: "👶" },
      { label: "4–10 лет", icon: "🧒" },
      { label: "11–16 лет", icon: "🧑" },
    ],
  },
  {
    key: "pets",
    title: "Есть ли у вас домашние животные?",
    type: "single",
    options: [
      { label: "Нет", icon: "—" },
      { label: "Кошка", icon: "🐱" },
      { label: "Собака", icon: "🐶" },
      { label: "Несколько животных", icon: "🐾" },
    ],
  },
  {
    key: "style",
    title: "Какой стиль интерьера вам нравится?",
    type: "single",
    options: [
      { label: "Современный", icon: "⬜" },
      { label: "Минимализм", icon: "◻️" },
      { label: "Скандинавский", icon: "🌿" },
      { label: "Современная классика", icon: "🏛" },
      { label: "Неоклассика", icon: "🏺" },
      { label: "Лофт", icon: "🧱" },
      { label: "Japandi", icon: "🎋" },
    ],
  },
  {
    key: "atmosphere",
    title: "Какая атмосфера вам нравится?",
    type: "single",
    options: [
      { label: "Уютная", icon: "🕯" },
      { label: "Спокойная", icon: "🌅" },
      { label: "Минималистичная", icon: "◻️" },
      { label: "Роскошная", icon: "✨" },
      { label: "Строгая", icon: "📏" },
      { label: "Тёплая", icon: "🌤" },
      { label: "Светлая", icon: "☀️" },
    ],
  },
  {
    key: "colors",
    title: "Какие цвета вам нравятся?",
    type: "multi",
    options: [
      { label: "Бежевый", icon: "🟤" },
      { label: "Белый", icon: "⬜" },
      { label: "Серый", icon: "🩶" },
      { label: "Графит", icon: "⬛" },
      { label: "Коричневый", icon: "🟫" },
      { label: "Зелёный", icon: "🟢" },
      { label: "Синий", icon: "🔵" },
      { label: "Терракотовый", icon: "🟠" },
    ],
  },
  {
    key: "materials",
    title: "Какие материалы вам нравятся?",
    type: "multi",
    options: [
      { label: "Натуральное дерево", icon: "🪵" },
      { label: "Камень / мрамор", icon: "🪨" },
      { label: "Бетон", icon: "🧱" },
      { label: "Металл", icon: "⚙️" },
      { label: "Стекло", icon: "🪟" },
      { label: "Текстиль", icon: "🧶" },
    ],
  },
  {
    key: "priorities",
    title: "Что для вас самое важное?",
    type: "multi",
    options: [
      { label: "Уют", icon: "🏡" },
      { label: "Красота", icon: "✨" },
      { label: "Удобство", icon: "🛠" },
      { label: "Много мест для хранения", icon: "📦" },
      { label: "Статус и эффектность", icon: "💎" },
    ],
  },
  {
    key: "budget",
    title: "Какой уровень интерьера вы планируете?",
    type: "single",
    options: [
      { label: "Эконом", icon: "💰" },
      { label: "Средний", icon: "💰💰" },
      { label: "Премиум", icon: "💎" },
    ],
  },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  let result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length >= 4) result += ") " + digits.slice(4, 7);
  if (digits.length >= 7) result += "-" + digits.slice(7, 9);
  if (digits.length >= 9) result += "-" + digits.slice(9, 11);
  return result;
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalSteps = questions.length + 1;
  const currentQuestion = questions[step];
  const progress = ((step + 1) / totalSteps) * 100;

  function goTo(nextStep: number, dir: "forward" | "back") {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setAnimating(false);
    }, 220);
  }

  function selectSingle(key: string, value: string) {
    setAnswers({ ...answers, [key]: value });
    setTimeout(() => goTo(step + 1, "forward"), 180);
  }

  function toggleMulti(key: string, value: string) {
    const current = Array.isArray(answers[key]) ? (answers[key] as string[]) : [];
    setAnswers({
      ...answers,
      [key]: current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    });
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (step >= questions.length) return;
      const q = questions[step];
      const num = parseInt(e.key);
      if (num >= 1 && num <= q.options.length) {
        const item = q.options[num - 1].label;
        if (q.type === "single") {
          selectSingle(q.key, item);
        } else {
          toggleMulti(q.key, item);
        }
      }
      if (e.key === "Enter" && q.type === "multi") {
        goTo(step + 1, "forward");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, answers]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  async function submitLead() {
    if (loading) return;
    setLoading(true);

    const payload = {
      property_type: answers.propertyType || "",
      rooms: Array.isArray(answers.rooms) ? answers.rooms.join(", ") : "",
      area: answers.area || "",
      family_type: answers.familyType || "",
      children: answers.children || "",
      pets: answers.pets || "",
      style: answers.style || "",
      atmosphere: answers.atmosphere || "",
      colors: Array.isArray(answers.colors) ? answers.colors.join(", ") : "",
      materials: Array.isArray(answers.materials) ? answers.materials.join(", ") : "",
      priorities: Array.isArray(answers.priorities) ? answers.priorities.join(", ") : "",
      budget: answers.budget || "",
      name,
      phone,
    };

    const { error } = await supabase.from("leads").insert([payload]);

    if (error) {
      console.log(error);
      alert("Ошибка отправки заявки");
      setLoading(false);
      return;
    }

    await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSuccess(true);
    setLoading(false);
  }

  const slideClass = animating
    ? direction === "forward"
      ? "opacity-0 -translate-x-8"
      : "opacity-0 translate-x-8"
    : "opacity-100 translate-x-0";

  if (success) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 text-center max-w-md animate-fade-in">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl">
            ✓
          </div>
          <h1 className="text-4xl font-semibold">Спасибо!</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Мы изучим ваши пожелания и&nbsp;подготовим персональную концепцию.
            <br />
            Свяжемся с вами в&nbsp;ближайшее время.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Progress header */}
      <header className="fixed inset-x-0 top-0 z-10 bg-black/80 backdrop-blur-sm px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-500">
            <span>
              Вопрос {Math.min(step + 1, totalSteps)} из {totalSteps}
            </span>
            {step > 0 && (
              <button
                onClick={() => goTo(step - 1, "back")}
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              >
                ← Назад
              </button>
            )}
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-3xl flex-col px-6 pt-28 pb-16">
        <div
          className={`transition-all duration-200 ease-in-out ${slideClass}`}
        >
          {step < questions.length && (
            <>
              <div className="mb-2 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                {currentQuestion.type === "multi"
                  ? "Выберите несколько"
                  : "Выберите один вариант"}
              </div>

              <h1 className="mb-8 text-3xl font-semibold leading-tight md:text-5xl">
                {currentQuestion.title}
              </h1>

              <div className="grid gap-3">
                {currentQuestion.options.map((item, idx) => {
                  const value = answers[currentQuestion.key];
                  const active = Array.isArray(value)
                    ? value.includes(item.label)
                    : value === item.label;

                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (currentQuestion.type === "single") {
                          selectSingle(currentQuestion.key, item.label);
                        } else {
                          toggleMulti(currentQuestion.key, item.label);
                        }
                      }}
                      className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-150 ${
                        active
                          ? "border-white bg-white text-black"
                          : "border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                          active
                            ? "bg-black/10 text-black"
                            : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-lg leading-snug">{item.label}</span>
                      <span className="ml-auto text-xl opacity-60">{item.icon}</span>
                    </button>
                  );
                })}
              </div>

              {currentQuestion.type === "multi" && (
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-zinc-600">
                    {Array.isArray(answers[currentQuestion.key])
                      ? `Выбрано: ${(answers[currentQuestion.key] as string[]).length}`
                      : "Ничего не выбрано"}
                  </span>
                  <button
                    onClick={() => goTo(step + 1, "forward")}
                    className="rounded-2xl bg-white px-8 py-4 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-40"
                    disabled={
                      !Array.isArray(answers[currentQuestion.key]) ||
                      (answers[currentQuestion.key] as string[]).length === 0
                    }
                  >
                    Далее →
                  </button>
                </div>
              )}

              <p className="mt-6 text-xs text-zinc-700">
                Нажмите цифру на клавиатуре для быстрого выбора
                {currentQuestion.type === "multi" ? ", Enter — далее" : ""}
              </p>
            </>
          )}

          {step === questions.length && (
            <>
              <div className="mb-2 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Последний шаг
              </div>

              <h1 className="mb-2 text-3xl font-semibold leading-tight md:text-5xl">
                Как с вами связаться?
              </h1>
              <p className="mb-8 text-zinc-500">
                Подготовим концепцию и&nbsp;пришлём вам в&nbsp;течение дня
              </p>

              <div className="grid gap-4">
                <div className="relative">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl outline-none transition focus:border-zinc-400 placeholder:text-zinc-600"
                  />
                </div>

                <div className="relative">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    inputMode="tel"
                    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl outline-none transition focus:border-zinc-400 placeholder:text-zinc-600"
                  />
                </div>

                <button
                  onClick={submitLead}
                  disabled={loading || !name.trim() || phone.replace(/\D/g, "").length < 11}
                  className="rounded-2xl bg-white px-8 py-5 text-lg font-medium text-black transition hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      Отправка...
                    </span>
                  ) : (
                    "Получить концепцию →"
                  )}
                </button>

                <p className="text-center text-xs text-zinc-700">
                  Нажимая кнопку, вы соглашаетесь с&nbsp;обработкой персональных данных
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
