"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

// ─── Жилые вопросы ───────────────────────────────────────────────
const residentialQuestions = [
  {
    key: "rooms",
    title: "Какие комнаты нужно сделать?",
    type: "multi",
    options: ["Кухня", "Кухня-гостиная", "Гостиная", "Спальня", "Детская", "Ванная / санузел", "Прихожая", "Гардеробная"],
  },
  {
    key: "area",
    title: "Какая площадь вашего помещения?",
    type: "single",
    options: ["До 20 м²", "20–40 м²", "40–70 м²", "70–120 м²", "Больше 120 м²"],
  },
  {
    key: "familyType",
    title: "Кто будет жить в квартире?",
    type: "single",
    options: ["Один человек", "Пара", "Семья с одним ребёнком", "Семья с двумя детьми", "Большая семья"],
  },
  {
    key: "children",
    title: "Есть ли у вас дети?",
    type: "single",
    options: ["Нет", "0–3 года", "4–10 лет", "11–16 лет"],
  },
  {
    key: "pets",
    title: "Есть ли у вас домашние животные?",
    type: "single",
    options: ["Нет", "Кошка", "Собака", "Несколько животных"],
  },
  {
    key: "style",
    title: "Какой стиль интерьера вам нравится?",
    type: "single",
    options: ["Современный", "Минимализм", "Скандинавский", "Современная классика", "Неоклассика", "Лофт", "Japandi"],
  },
  {
    key: "atmosphere",
    title: "Какая атмосфера вам нравится?",
    type: "single",
    options: ["Уютная", "Спокойная", "Минималистичная", "Роскошная", "Строгая", "Тёплая", "Светлая"],
  },
  {
    key: "colors",
    title: "Какие цвета вам нравятся?",
    type: "multi",
    options: ["Бежевый", "Белый", "Серый", "Графит", "Коричневый", "Зелёный", "Синий", "Терракотовый"],
  },
  {
    key: "materials",
    title: "Какие материалы вам нравятся?",
    type: "multi",
    options: ["Натуральное дерево", "Камень / мрамор", "Бетон", "Металл", "Стекло", "Текстиль"],
  },
  {
    key: "priorities",
    title: "Что для вас самое важное?",
    type: "multi",
    options: ["Уют", "Красота", "Удобство", "Много мест для хранения", "Статус и эффектность"],
  },
  {
    key: "budget",
    title: "Какой уровень интерьера вы планируете?",
    type: "single",
    options: ["Эконом", "Средний", "Премиум"],
  },
];

// ─── Коммерческие вопросы ─────────────────────────────────────────
const commercialQuestions = [
  {
    key: "commercialType",
    title: "Какой тип помещения?",
    type: "single",
    options: ["Офис", "Ресторан / кафе", "Магазин / шоурум", "Салон красоты", "Медицинский центр", "Другое"],
  },
  {
    key: "area",
    title: "Какая площадь помещения?",
    type: "single",
    options: ["До 50 м²", "50–100 м²", "100–200 м²", "Больше 200 м²"],
  },
  {
    key: "employeesCount",
    title: "Сколько человек будет работать / посещать?",
    type: "single",
    options: ["До 10 человек", "10–30 человек", "30–50 человек", "Больше 50 человек"],
  },
  {
    key: "hasBranding",
    title: "Есть ли фирменный стиль бренда?",
    type: "single",
    options: ["Да, есть готовый брендинг", "Есть частично", "Нет, нужно разработать"],
  },
  {
    key: "style",
    title: "Какой стиль интерьера предпочитаете?",
    type: "single",
    options: ["Современный", "Минимализм", "Лофт", "Современная классика", "Japandi", "Неоклассика"],
  },
  {
    key: "atmosphere",
    title: "Какая атмосфера нужна в пространстве?",
    type: "single",
    options: ["Деловая и строгая", "Расслабленная и уютная", "Роскошная и статусная", "Творческая и яркая", "Спокойная и нейтральная"],
  },
  {
    key: "colors",
    title: "Какие цвета предпочитаете?",
    type: "multi",
    options: ["Белый", "Серый", "Графит", "Бежевый", "Коричневый", "Зелёный", "Синий", "Терракотовый"],
  },
  {
    key: "materials",
    title: "Какие материалы вам нравятся?",
    type: "multi",
    options: ["Натуральное дерево", "Камень / мрамор", "Бетон", "Металл", "Стекло", "Текстиль"],
  },
  {
    key: "budget",
    title: "Какой уровень интерьера планируете?",
    type: "single",
    options: ["Эконом", "Средний", "Премиум"],
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
  const router = useRouter();

  // Шаг 0 — выбор типа недвижимости
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [isCommercial, setIsCommercial] = useState(false);

  const [step, setStep] = useState(0); // 0 = первый вопрос (тип), 1+ = остальные
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animating, setAnimating] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const questions = isCommercial ? commercialQuestions : residentialQuestions;
  const totalSteps = 1 + questions.length + 1; // выбор типа + вопросы + контакты
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

  // Первый вопрос — выбор типа недвижимости
  function selectPropertyType(value: string) {
    setPropertyType(value);
    setAnswers({ propertyType: value });
    const commercial = value === "Коммерческое помещение";
    setIsCommercial(commercial);
    setTimeout(() => goTo(1, "forward"), 180);
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
      if (step === 0) {
        const opts = ["Квартира", "Частный дом", "Апартаменты", "Коммерческое помещение"];
        const num = parseInt(e.key);
        if (num >= 1 && num <= opts.length) selectPropertyType(opts[num - 1]);
        return;
      }
      const qIndex = step - 1;
      if (qIndex >= questions.length) return;
      const q = questions[qIndex];
      const num = parseInt(e.key);
      if (num >= 1 && num <= q.options.length) {
        if (q.type === "single") selectSingle(q.key, q.options[num - 1]);
        else toggleMulti(q.key, q.options[num - 1]);
      }
      if (e.key === "Enter" && q.type === "multi") goTo(step + 1, "forward");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, answers, questions]
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
      commercial_type: answers.commercialType || "",
      rooms: Array.isArray(answers.rooms) ? answers.rooms.join(", ") : "",
      area: answers.area || "",
      family_type: answers.familyType || "",
      children: answers.children || "",
      pets: answers.pets || "",
      employees_count: answers.employeesCount || "",
      has_branding: answers.hasBranding || "",
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

    fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSuccess(true);
setLoading(false);

if (!isCommercial) {
  sessionStorage.setItem("quiz_answers", JSON.stringify({ ...answers, name, phone }));
  setTimeout(() => router.push("/moodboard"), 1500);
}
  }

  const slideClass = animating
    ? direction === "forward" ? "opacity-0 -translate-x-8" : "opacity-0 translate-x-8"
    : "opacity-100 translate-x-0";

  // Контакты — последний шаг
  const isContactStep = step === 1 + questions.length;
  // Вопросный шаг
  const qIndex = step - 1;
  const currentQuestion = step > 0 && qIndex < questions.length ? questions[qIndex] : null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Прогресс */}
      <header className="fixed inset-x-0 top-0 z-10 bg-black/80 backdrop-blur-sm px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-500">
            <span>Вопрос {Math.min(step + 1, totalSteps)} из {totalSteps}</span>
            {step > 0 && (
              <button
                onClick={() => goTo(step - 1, "back")}
                className="text-zinc-400 hover:text-white transition-colors"
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
        <div className={`transition-all duration-200 ease-in-out ${slideClass}`}>

          {/* ШАГ 0 — тип недвижимости */}
          {step === 0 && (
            <>
              <div className="mb-2 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Выберите один вариант
              </div>
              <h1 className="mb-8 text-3xl font-semibold leading-tight md:text-5xl">
                Какая у вас недвижимость?
              </h1>
              <div className="grid gap-3">
                {["Квартира", "Частный дом", "Апартаменты", "Коммерческое помещение"].map((item, idx) => (
                  <button
                    key={item}
                    onClick={() => selectPropertyType(item)}
                    className="group flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-left transition-all hover:border-zinc-600 hover:bg-zinc-800"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-500 group-hover:bg-zinc-700">
                      {idx + 1}
                    </span>
                    <span className="text-lg">{item}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ВОПРОСЫ */}
          {currentQuestion && (
            <>
              <div className="mb-2 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                {isCommercial ? "🏢 Коммерческая недвижимость" : "🏠 Жилая недвижимость"}
                {" · "}
                {currentQuestion.type === "multi" ? "Выберите несколько" : "Выберите один вариант"}
              </div>
              <h1 className="mb-8 text-3xl font-semibold leading-tight md:text-5xl">
                {currentQuestion.title}
              </h1>
              <div className="grid gap-3">
                {currentQuestion.options.map((item, idx) => {
                  const value = answers[currentQuestion.key];
                  const active = Array.isArray(value) ? value.includes(item) : value === item;
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        if (currentQuestion.type === "single") selectSingle(currentQuestion.key, item);
                        else toggleMulti(currentQuestion.key, item);
                      }}
                      className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-150 ${
                        active
                          ? "border-white bg-white text-black"
                          : "border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800"
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                        active ? "bg-black/10 text-black" : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700"
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-lg leading-snug">{item}</span>
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
                    disabled={!Array.isArray(answers[currentQuestion.key]) || (answers[currentQuestion.key] as string[]).length === 0}
                    className="rounded-2xl bg-white px-8 py-4 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-40"
                  >
                    Далее →
                  </button>
                </div>
              )}
            </>
          )}

          {/* КОНТАКТЫ */}
          {isContactStep && (
            <>
              <div className="mb-2 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Последний шаг
              </div>
              <h1 className="mb-2 text-3xl font-semibold md:text-5xl">Как с вами связаться?</h1>
              <p className="mb-8 text-zinc-500">Подготовим концепцию и пришлём вам в течение дня</p>
              <div className="grid gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl outline-none transition focus:border-zinc-400 placeholder:text-zinc-600"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="+7 (___) ___-__-__"
                  type="tel"
                  className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-5 text-xl outline-none transition focus:border-zinc-400 placeholder:text-zinc-600"
                />
                {success ? (
                  <div className="rounded-2xl border border-green-500 bg-green-500/10 px-6 py-5 text-center text-lg text-green-400">
                    Спасибо! Готовим вашу концепцию...
                  </div>
                ) : (
                  <button
                    onClick={submitLead}
                    disabled={loading || !name.trim() || phone.replace(/\D/g, "").length < 11}
                    className="rounded-2xl bg-white px-8 py-5 text-lg font-medium text-black transition hover:bg-zinc-200 disabled:opacity-40"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                        Отправка...
                      </span>
                    ) : "Получить концепцию →"}
                  </button>
                )}
                <p className="text-center text-xs text-zinc-700">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </>
          )}

        </div>
      </section>
    </main>
  );
}