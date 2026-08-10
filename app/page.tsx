const WHATSAPP_PHONE = "77027668867";

// Заготовка первого сообщения. Человеку не нужно придумывать, с чего начать,
// а вы сразу видите, что он пришёл с сайта, а не из ниоткуда.
const WHATSAPP_TEXT =
  "Здравствуйте! Пишу с сайта ZK Design. Хочу узнать про дизайн-проект интерьера.";

const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.4em] text-zinc-300">
          ZK DESIGN BUREAU
        </p>

        <h1 className="max-w-5xl text-5xl font-semibold leading-tight md:text-7xl">
          Получите концепцию интерьера бесплатно
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300">
          AI-визуализации, дизайн-проекты, чертежи, ремонт и комплектация под
          ключ.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/quiz"
            className="rounded-2xl bg-white px-8 py-4 text-lg font-medium text-black transition hover:scale-105"
          >
            Пройти опрос
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg backdrop-blur transition hover:bg-white/10"
          >
            WhatsApp
          </a>
        </div>

        <p className="mt-10 text-sm text-zinc-400">
          Уральск · 8 лет · более 300 реализованных проектов
        </p>
      </section>
    </main>
  );
}
