import { moodboardImages, MoodboardImage } from "./moodboard-data";

type ClientAnswers = {
  style?: string;
  atmosphere?: string;
  colors?: string | string[];
  materials?: string | string[];
  rooms?: string | string[];
};

function scoreImage(image: MoodboardImage, answers: ClientAnswers): number {
  let score = 0;

  const toArray = (v?: string | string[]) =>
    !v ? [] : Array.isArray(v) ? v : v.split(", ").map((s) => s.trim());

  const clientColors = toArray(answers.colors);
  const clientMaterials = toArray(answers.materials);
  const clientRooms = toArray(answers.rooms);

  if (answers.style && image.tags.style?.includes(answers.style)) score += 3;
  if (answers.atmosphere && image.tags.atmosphere?.includes(answers.atmosphere)) score += 2;
  for (const color of clientColors) {
    if (image.tags.colors?.includes(color)) score += 1;
  }
  for (const mat of clientMaterials) {
    if (image.tags.materials?.includes(mat)) score += 1;
  }
  for (const room of clientRooms) {
    if (image.tags.rooms?.includes(room)) score += 2;
  }

  return score;
}

export function selectMoodboardImages(
  answers: ClientAnswers,
  count = 9
): MoodboardImage[] {
  const scored = moodboardImages
    .map((img) => ({ img, score: scoreImage(img, answers) }))
    .sort((a, b) => b.score - a.score);

  const selected: MoodboardImage[] = [];

  const clientRooms = Array.isArray(answers.rooms)
    ? answers.rooms
    : (answers.rooms || "").split(", ").map((s) => s.trim()).filter(Boolean);

  for (const room of clientRooms) {
    const best = scored.find(
      ({ img }) => img.tags.rooms?.includes(room) && !selected.includes(img)
    );
    if (best) selected.push(best.img);
  }

  for (const { img } of scored) {
    if (selected.length >= count) break;
    if (!selected.includes(img)) selected.push(img);
  }

  return selected.slice(0, count);
}