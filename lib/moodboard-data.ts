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

export const moodboardImages: MoodboardImage[] = [
  {
    id: "1",
    src: "/modern-living.png",
    alt: "Современная гостиная",
    tags: {
      style: ["Современный"],
      atmosphere: ["Минималистичная", "Светлая", "Спокойная"],
      colors: ["Белый", "Серый"],
      materials: ["Бетон", "Стекло", "Металл"],
      rooms: ["Гостиная", "Кухня-гостиная"],
    },
  },
  {
    id: "2",
    src: "/modern-bedroom.png",
    alt: "Современная спальня",
    tags: {
      style: ["Современный"],
      atmosphere: ["Строгая", "Минималистичная"],
      colors: ["Белый", "Графит"],
      materials: ["Металл", "Стекло"],
      rooms: ["Спальня"],
    },
  },
  {
    id: "3",
    src: "/minimal-living.png",
    alt: "Минималистичная гостиная",
    tags: {
      style: ["Минимализм"],
      atmosphere: ["Минималистичная", "Спокойная", "Светлая"],
      colors: ["Белый", "Серый"],
      materials: ["Стекло"],
      rooms: ["Гостиная"],
    },
  },
  {
    id: "4",
    src: "/minimal-bedroom.png",
    alt: "Минималистичная спальня",
    tags: {
      style: ["Минимализм"],
      atmosphere: ["Минималистичная", "Спокойная"],
      colors: ["Белый", "Бежевый"],
      materials: ["Натуральное дерево", "Текстиль"],
      rooms: ["Спальня"],
    },
  },
  {
    id: "5",
    src: "/scandinavian-living.png",
    alt: "Скандинавская гостиная",
    tags: {
      style: ["Скандинавский"],
      atmosphere: ["Уютная", "Тёплая", "Светлая"],
      colors: ["Белый", "Бежевый", "Зелёный"],
      materials: ["Натуральное дерево", "Текстиль"],
      rooms: ["Гостиная"],
    },
  },
  {
    id: "6",
    src: "/scandinavian-dining.png",
    alt: "Скандинавская столовая",
    tags: {
      style: ["Скандинавский"],
      atmosphere: ["Светлая", "Спокойная", "Уютная"],
      colors: ["Белый", "Бежевый"],
      materials: ["Натуральное дерево", "Текстиль"],
      rooms: ["Кухня-гостиная", "Кухня"],
    },
  },
  {
    id: "7",
    src: "/classic-living.png",
    alt: "Современная классика гостиная",
    tags: {
      style: ["Современная классика"],
      atmosphere: ["Уютная", "Роскошная", "Тёплая"],
      colors: ["Бежевый", "Серый"],
      materials: ["Камень / мрамор", "Текстиль"],
      rooms: ["Гостиная"],
    },
  },
  {
    id: "8",
    src: "/classic-bedroom.png",
    alt: "Современная классика спальня",
    tags: {
      style: ["Современная классика"],
      atmosphere: ["Спокойная", "Уютная"],
      colors: ["Бежевый", "Белый"],
      materials: ["Текстиль"],
      rooms: ["Спальня"],
    },
  },
  {
    id: "9",
    src: "/neoclassic-living.png",
    alt: "Неоклассика гостиная",
    tags: {
      style: ["Неоклассика"],
      atmosphere: ["Роскошная"],
      colors: ["Белый", "Бежевый"],
      materials: ["Камень / мрамор", "Текстиль", "Металл"],
      rooms: ["Гостиная"],
    },
  },
  {
    id: "10",
    src: "/neoclassic-bedroom.png",
    alt: "Неоклассика спальня",
    tags: {
      style: ["Неоклассика"],
      atmosphere: ["Роскошная", "Уютная"],
      colors: ["Бежевый", "Коричневый"],
      materials: ["Текстиль", "Металл"],
      rooms: ["Спальня"],
    },
  },
  {
    id: "11",
    src: "/loft-living.png",
    alt: "Лофт гостиная",
    tags: {
      style: ["Лофт"],
      atmosphere: ["Строгая"],
      colors: ["Графит", "Коричневый"],
      materials: ["Бетон", "Металл", "Натуральное дерево"],
      rooms: ["Гостиная"],
    },
  },
  {
    id: "12",
    src: "/loft-kitchen.png",
    alt: "Лофт кухня",
    tags: {
      style: ["Лофт"],
      atmosphere: ["Строгая"],
      colors: ["Графит", "Серый"],
      materials: ["Бетон", "Металл"],
      rooms: ["Кухня", "Кухня-гостиная"],
    },
  },
  {
    id: "13",
    src: "/japandi-living.png",
    alt: "Japandi гостиная",
    tags: {
      style: ["Japandi"],
      atmosphere: ["Спокойная", "Тёплая", "Уютная"],
      colors: ["Бежевый", "Терракотовый", "Зелёный"],
      materials: ["Натуральное дерево", "Текстиль"],
      rooms: ["Гостиная"],
    },
  },
  {
    id: "14",
    src: "/japandi-bedroom.png",
    alt: "Japandi спальня",
    tags: {
      style: ["Japandi"],
      atmosphere: ["Спокойная", "Минималистичная"],
      colors: ["Бежевый", "Зелёный"],
      materials: ["Натуральное дерево", "Текстиль"],
      rooms: ["Спальня"],
    },
  },
];