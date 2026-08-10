import { moodboardImages, MoodboardImage } from "./moodboard-data";

type ClientAnswers = {
  style?: string;
  atmosphere?: string;
  colors?: string | string[];
  materials?: string | string[];
  rooms?: string | string[];
};

// Стили, которые визуально уживаются друг с другом.
// Клиенту, выбравшему минимализм, можно показать скандинавский или japandi —
// они читаются как одна история. Классику или лофт показывать нельзя.
const STYLE_FAMILIES: Record<string, string[]> = {
  "Минимализм": ["Минимализм", "Скандинавский", "Japandi", "Современный"],
  "Скандинавский": ["Скандинавский", "Минимализм", "Japandi"],
  "Japandi": ["Japandi", "Скандинавский", "Минимализм"],
  "Современный": ["Современный", "Минимализм", "Лофт"],
  "Лофт": ["Лофт", "Современный"],
  "Современная классика": ["Современная классика", "Неоклассика"],
  "Неоклассика": ["Неоклассика", "Современная классика"],
};

const toArray = (v?: string | string[]) =>
  !v ? [] : Array.isArray(v) ? v : v.split(", ").map((s) => s.trim()).filter(Boolean);

function scoreImage(image: MoodboardImage, answers: ClientAnswers): number {
  let score = 0;

  // Точное совпадение стиля весит больше всего
  if (answers.style && image.tags.style?.includes(answers.style)) score += 10;

  if (answers.atmosphere && image.tags.atmosphere?.includes(answers.atmosphere)) score += 2;

  for (const color of toArray(answers.colors)) {
    if (image.tags.colors?.includes(color)) score += 1;
  }
  for (const mat of toArray(answers.materials)) {
    if (image.tags.materials?.includes(mat)) score += 1;
  }
  for (const room of toArray(answers.rooms)) {
    if (image.tags.rooms?.includes(room)) score += 2;
  }

  return score;
}

export function selectMoodboardImages(
  answers: ClientAnswers,
  count = 9
): MoodboardImage[] {
  // 1. Отсекаем всё, что не входит в семейство выбранного стиля.
  const allowedStyles = answers.style ? STYLE_FAMILIES[answers.style] : undefined;

  const pool = allowedStyles
    ? moodboardImages.filter((img) =>
        img.tags.style?.some((s) => allowedStyles.includes(s))
      )
    : moodboardImages;

  // Если стиль редкий и в базе для него ничего нет — лучше показать всё,
  // чем пустой экран.
  const workingPool = pool.length > 0 ? pool : moodboardImages;

  const scored = workingPool
    .map((img) => ({ img, score: scoreImage(img, answers) }))
    .sort((a, b) => b.score - a.score);

  const selected: MoodboardImage[] = [];

  // 2. По одной картинке на каждую названную клиентом комнату
  for (const room of toArray(answers.rooms)) {
    const best = scored.find(
      ({ img }) => img.tags.rooms?.includes(room) && !selected.includes(img)
    );
    if (best) selected.push(best.img);
  }

  // 3. Добираем остальным из пула — но только тем, что реально подходит
  for (const { img } of scored) {
    if (selected.length >= count) break;
    if (!selected.includes(img)) selected.push(img);
  }

  // Показываем ровно столько, сколько нашлось подходящего.
  // Шесть релевантных картинок лучше девяти, из которых три — мимо.
  return selected.slice(0, count);
}
