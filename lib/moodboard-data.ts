export type MoodboardImage = {
  id: string;
  src: string;
  alt: string;
  tags: {
    style?: string[];
    atmosphere?: string[];
    colors?: string[];
    materials?: string[];
    rooms?: string[];
  };
};

// Все изображения — гостиные / кухни-гостиные.
// Спален, кухонь, детских и санузлов в базе пока нет.
const ROOMS = ["Гостиная", "Кухня-гостиная"];

export const moodboardImages: MoodboardImage[] = [
  // ─── Минимализм ───────────────────────────────────────────────
  { id: "minimal-1", src: "/moodboard/minimal-1.jpg", alt: "Минимализм: гостиная с зелёным диваном",
    tags: { style: ["Минимализм"], atmosphere: ["Минималистичная", "Спокойная", "Светлая"],
            colors: ["Белый", "Зелёный", "Серый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "minimal-2", src: "/moodboard/minimal-2.jpg", alt: "Минимализм: белая гостиная с графичными акцентами",
    tags: { style: ["Минимализм"], atmosphere: ["Минималистичная", "Строгая", "Светлая"],
            colors: ["Белый", "Графит"], materials: ["Металл", "Натуральное дерево"], rooms: ROOMS } },
  { id: "minimal-3", src: "/moodboard/minimal-3.jpg", alt: "Минимализм: бежевая гостиная с округлым диваном",
    tags: { style: ["Минимализм"], atmosphere: ["Минималистичная", "Спокойная", "Тёплая"],
            colors: ["Бежевый", "Белый"], materials: ["Текстиль", "Натуральное дерево"], rooms: ROOMS } },
  { id: "minimal-4", src: "/moodboard/minimal-4.jpg", alt: "Минимализм: гостиная с графитовым диваном",
    tags: { style: ["Минимализм"], atmosphere: ["Минималистичная", "Строгая"],
            colors: ["Графит", "Серый", "Белый"], materials: ["Металл", "Текстиль"], rooms: ROOMS } },
  { id: "minimal-5", src: "/moodboard/minimal-5.jpg", alt: "Минимализм: светлая гостиная с деревянной панелью",
    tags: { style: ["Минимализм"], atmosphere: ["Минималистичная", "Светлая", "Тёплая"],
            colors: ["Бежевый", "Белый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },

  // ─── Скандинавский ────────────────────────────────────────────
  { id: "scandi-1", src: "/moodboard/scandi-1.jpg", alt: "Скандинавский: светлая гостиная с деревом",
    tags: { style: ["Скандинавский"], atmosphere: ["Светлая", "Уютная", "Тёплая"],
            colors: ["Белый", "Бежевый", "Коричневый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "scandi-2", src: "/moodboard/scandi-2.jpg", alt: "Скандинавский: гостиная с зелёным диваном и жёлтым креслом",
    tags: { style: ["Скандинавский"], atmosphere: ["Уютная", "Светлая", "Тёплая"],
            colors: ["Зелёный", "Бежевый", "Белый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "scandi-3", src: "/moodboard/scandi-3.jpg", alt: "Скандинавский: гостиная с голубым диваном",
    tags: { style: ["Скандинавский"], atmosphere: ["Светлая", "Спокойная"],
            colors: ["Синий", "Белый", "Серый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "scandi-4", src: "/moodboard/scandi-4.jpg", alt: "Скандинавский: тёплая гостиная с кожаными креслами",
    tags: { style: ["Скандинавский"], atmosphere: ["Тёплая", "Уютная"],
            colors: ["Бежевый", "Коричневый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "scandi-5", src: "/moodboard/scandi-5.jpg", alt: "Скандинавский: минималистичная светлая гостиная",
    tags: { style: ["Скандинавский"], atmosphere: ["Светлая", "Минималистичная", "Спокойная"],
            colors: ["Белый", "Бежевый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "scandi-6", src: "/moodboard/scandi-6.jpg", alt: "Скандинавский: гостиная с угловым диваном",
    tags: { style: ["Скандинавский"], atmosphere: ["Уютная", "Светлая"],
            colors: ["Белый", "Серый", "Бежевый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },

  // ─── Japandi ──────────────────────────────────────────────────
  { id: "japandi-1", src: "/moodboard/japandi-1.jpg", alt: "Japandi: гостиная с тёмным диваном",
    tags: { style: ["Japandi"], atmosphere: ["Спокойная", "Минималистичная"],
            colors: ["Графит", "Бежевый", "Коричневый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "japandi-2", src: "/moodboard/japandi-2.jpg", alt: "Japandi: светлая гостиная с бумажным светильником",
    tags: { style: ["Japandi"], atmosphere: ["Спокойная", "Тёплая", "Светлая"],
            colors: ["Бежевый", "Белый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "japandi-3", src: "/moodboard/japandi-3.jpg", alt: "Japandi: гостиная с терракотовым диваном",
    tags: { style: ["Japandi"], atmosphere: ["Тёплая", "Уютная"],
            colors: ["Терракотовый", "Бежевый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "japandi-4", src: "/moodboard/japandi-4.jpg", alt: "Japandi: гостиная с оливковым диваном",
    tags: { style: ["Japandi"], atmosphere: ["Спокойная", "Уютная", "Тёплая"],
            colors: ["Зелёный", "Бежевый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },
  { id: "japandi-5", src: "/moodboard/japandi-5.jpg", alt: "Japandi: минималистичная светлая гостиная",
    tags: { style: ["Japandi"], atmosphere: ["Минималистичная", "Светлая", "Спокойная"],
            colors: ["Белый", "Бежевый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },

  // ─── Современный ──────────────────────────────────────────────
  { id: "modern-1", src: "/moodboard/modern-1.jpg", alt: "Современный: гостиная с округлым диваном и бордовыми акцентами",
    tags: { style: ["Современный"], atmosphere: ["Роскошная", "Уютная"],
            colors: ["Бежевый", "Коричневый"], materials: ["Текстиль", "Металл"], rooms: ROOMS } },
  { id: "modern-2", src: "/moodboard/modern-2.jpg", alt: "Современный: серо-синяя гостиная",
    tags: { style: ["Современный"], atmosphere: ["Строгая", "Спокойная"],
            colors: ["Серый", "Синий", "Белый"], materials: ["Металл", "Стекло", "Текстиль"], rooms: ROOMS } },
  { id: "modern-3", src: "/moodboard/modern-3.jpg", alt: "Современный: гостиная с зелёным и терракотовым",
    tags: { style: ["Современный"], atmosphere: ["Уютная", "Тёплая"],
            colors: ["Зелёный", "Терракотовый", "Бежевый"], materials: ["Текстиль", "Натуральное дерево"], rooms: ROOMS } },
  { id: "modern-4", src: "/moodboard/modern-4.jpg", alt: "Современный: тёмная гостиная с графитовым диваном",
    tags: { style: ["Современный"], atmosphere: ["Строгая", "Роскошная"],
            colors: ["Графит", "Коричневый"], materials: ["Металл", "Стекло", "Натуральное дерево"], rooms: ROOMS } },
  { id: "modern-5", src: "/moodboard/modern-5.jpg", alt: "Современный: гостиная с рыжим креслом",
    tags: { style: ["Современный"], atmosphere: ["Тёплая", "Уютная"],
            colors: ["Бежевый", "Коричневый"], materials: ["Натуральное дерево", "Текстиль"], rooms: ROOMS } },

  // ─── Лофт ─────────────────────────────────────────────────────
  { id: "loft-1", src: "/moodboard/loft-1.jpg", alt: "Лофт: гостиная с кирпичом и кожаным диваном",
    tags: { style: ["Лофт"], atmosphere: ["Строгая", "Тёплая"],
            colors: ["Коричневый", "Графит"], materials: ["Бетон", "Металл", "Натуральное дерево"], rooms: ROOMS } },
  { id: "loft-2", src: "/moodboard/loft-2.jpg", alt: "Лофт: светлая гостиная с белым кирпичом",
    tags: { style: ["Лофт"], atmosphere: ["Строгая", "Светлая"],
            colors: ["Белый", "Серый"], materials: ["Бетон", "Металл", "Натуральное дерево"], rooms: ROOMS } },
  { id: "loft-3", src: "/moodboard/loft-3.jpg", alt: "Лофт: тёмная гостиная с бетоном",
    tags: { style: ["Лофт"], atmosphere: ["Строгая"],
            colors: ["Графит", "Коричневый"], materials: ["Бетон", "Металл"], rooms: ROOMS } },
  { id: "loft-4", src: "/moodboard/loft-4.jpg", alt: "Лофт: гостиная с кирпичом и оливковым диваном",
    tags: { style: ["Лофт"], atmosphere: ["Строгая", "Тёплая"],
            colors: ["Зелёный", "Коричневый"], materials: ["Бетон", "Металл", "Натуральное дерево"], rooms: ROOMS } },
  { id: "loft-5", src: "/moodboard/loft-5.jpg", alt: "Лофт: тёмная гостиная с синим диваном",
    tags: { style: ["Лофт"], atmosphere: ["Строгая"],
            colors: ["Графит", "Синий"], materials: ["Бетон", "Металл", "Стекло"], rooms: ROOMS } },

  // ─── Современная классика ─────────────────────────────────────
  { id: "classic-1", src: "/moodboard/classic-1.jpg", alt: "Современная классика: светлая гостиная",
    tags: { style: ["Современная классика"], atmosphere: ["Спокойная", "Уютная", "Светлая"],
            colors: ["Серый", "Бежевый"], materials: ["Текстиль", "Натуральное дерево"], rooms: ROOMS } },
  { id: "classic-2", src: "/moodboard/classic-2.jpg", alt: "Современная классика: гостиная с бордовым креслом",
    tags: { style: ["Современная классика"], atmosphere: ["Уютная", "Роскошная", "Тёплая"],
            colors: ["Бежевый", "Коричневый"], materials: ["Текстиль", "Камень / мрамор"], rooms: ROOMS } },
  { id: "classic-3", src: "/moodboard/classic-3.jpg", alt: "Современная классика: бежевая гостиная",
    tags: { style: ["Современная классика"], atmosphere: ["Уютная", "Тёплая", "Светлая"],
            colors: ["Бежевый", "Терракотовый"], materials: ["Текстиль", "Камень / мрамор"], rooms: ROOMS } },
  { id: "classic-4", src: "/moodboard/classic-4.jpg", alt: "Современная классика: гостиная с тёмно-синей стеной",
    tags: { style: ["Современная классика"], atmosphere: ["Строгая", "Роскошная"],
            colors: ["Синий", "Бежевый"], materials: ["Текстиль", "Натуральное дерево"], rooms: ROOMS } },
  { id: "classic-5", src: "/moodboard/classic-5.jpg", alt: "Современная классика: гостиная с оливковыми креслами",
    tags: { style: ["Современная классика"], atmosphere: ["Уютная", "Спокойная"],
            colors: ["Зелёный", "Бежевый"], materials: ["Текстиль", "Натуральное дерево"], rooms: ROOMS } },

  // ─── Неоклассика ──────────────────────────────────────────────
  { id: "neoclassic-1", src: "/moodboard/neoclassic-1.jpg", alt: "Неоклассика: светлая гостиная с люстрой",
    tags: { style: ["Неоклассика"], atmosphere: ["Роскошная", "Уютная", "Светлая"],
            colors: ["Бежевый", "Белый"], materials: ["Текстиль", "Камень / мрамор", "Металл"], rooms: ROOMS } },
  { id: "neoclassic-2", src: "/moodboard/neoclassic-2.jpg", alt: "Неоклассика: гостиная с оливковыми креслами",
    tags: { style: ["Неоклассика"], atmosphere: ["Роскошная", "Уютная"],
            colors: ["Зелёный", "Бежевый"], materials: ["Текстиль", "Камень / мрамор"], rooms: ROOMS } },
  { id: "neoclassic-3", src: "/moodboard/neoclassic-3.jpg", alt: "Неоклассика: классическая гостиная с лепниной",
    tags: { style: ["Неоклассика"], atmosphere: ["Роскошная", "Спокойная"],
            colors: ["Бежевый", "Белый"], materials: ["Текстиль", "Камень / мрамор"], rooms: ROOMS } },
  { id: "neoclassic-4", src: "/moodboard/neoclassic-4.jpg", alt: "Неоклассика: серо-голубая гостиная",
    tags: { style: ["Неоклассика"], atmosphere: ["Роскошная", "Спокойная"],
            colors: ["Серый", "Белый"], materials: ["Текстиль", "Камень / мрамор", "Металл"], rooms: ROOMS } },
  { id: "neoclassic-5", src: "/moodboard/neoclassic-5.jpg", alt: "Неоклассика: гостиная с синим диваном",
    tags: { style: ["Неоклассика"], atmosphere: ["Роскошная", "Строгая"],
            colors: ["Синий", "Белый"], materials: ["Текстиль", "Металл", "Натуральное дерево"], rooms: ROOMS } },
  { id: "neoclassic-6", src: "/moodboard/neoclassic-6.jpg", alt: "Неоклассика: гостиная с изумрудным диваном",
    tags: { style: ["Неоклассика"], atmosphere: ["Роскошная", "Уютная", "Тёплая"],
            colors: ["Зелёный", "Бежевый"], materials: ["Текстиль", "Натуральное дерево"], rooms: ROOMS } },
];
