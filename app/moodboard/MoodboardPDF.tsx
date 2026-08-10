"use client";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { MoodboardImage } from "../../lib/moodboard-data";

// Встроенный Helvetica не умеет кириллицу — имя клиента и теги выходили пустыми.
// Регистрируем Roboto из /public/fonts. Внутри функции, а не на уровне модуля:
// на уровне модуля @react-pdf иногда инициализируется раньше, чем нужно.
let fontsRegistered = false;
function registerFonts() {
  if (fontsRegistered) return;
  Font.register({
    family: "Roboto",
    fonts: [
      { src: "/fonts/Roboto-Regular.ttf" },
      { src: "/fonts/Roboto-Bold.ttf", fontWeight: 700 },
    ],
  });
  fontsRegistered = true;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0a0a0a",
    padding: 32,
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
    borderBottom: "1px solid #333",
    paddingBottom: 16,
  },
  studioName: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: 700,
    letterSpacing: 3,
  },
  clientBlock: { alignItems: "flex-end" },
  clientName: { fontSize: 11, color: "#ffffff" },
  clientMeta: { fontSize: 9, color: "#666666", marginTop: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  imageWrapper: {
    width: "32%",
    height: 170,
    backgroundColor: "#1a1a1a",
    borderRadius: 4,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #222",
    paddingTop: 12,
  },
  footerText: { fontSize: 8, color: "#444444" },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#1a1a1a",
    color: "#aaaaaa",
    fontSize: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
});

type Props = {
  images: MoodboardImage[];
  clientName: string;
  style: string;
  atmosphere: string;
  colors: string;
  budget: string;
};

function MoodboardDocument({ images, clientName, style, atmosphere, colors, budget }: Props) {
  const date = new Date().toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });
  const tags = [style, atmosphere, ...(colors || "").split(", ")].filter(Boolean);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.studioName}>ZK DESIGN</Text>
          <View style={styles.clientBlock}>
            <Text style={styles.clientName}>{clientName}</Text>
            <Text style={styles.clientMeta}>{date} · {budget}</Text>
          </View>
        </View>
        <View style={styles.tagRow}>
          {tags.map((tag, i) => (
            <Text key={i} style={styles.tag}>{tag}</Text>
          ))}
        </View>
        <View style={styles.grid}>
          {images.map((img) => (
            <View key={img.id} style={styles.imageWrapper}>
              <Image src={img.src} style={styles.image} />
            </View>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Концепция подготовлена индивидуально</Text>
          <Text style={styles.footerText}>zk-design.vercel.app</Text>
        </View>
      </Page>
    </Document>
  );
}

function safeFileName(name: string) {
  const cleaned = name.trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");
  return cleaned ? cleaned.toLowerCase() : "klient";
}

export async function downloadMoodboardPDF(props: Props) {
  registerFonts();

  const origin = window.location.origin;
  const propsFixed: Props = {
    ...props,
    images: props.images.map((img) => ({
      ...img,
      src: `${origin}${img.src}`,
    })),
  };

  let url: string | null = null;
  try {
    const blob = await pdf(<MoodboardDocument {...propsFixed} />).toBlob();
    url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `moodboard-${safeFileName(props.clientName)}.pdf`;
    // Ссылку обязательно нужно вставить в документ — в части браузеров
    // click() по «висящему в воздухе» элементу молча ничего не делает.
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    console.error("PDF generation failed:", e);
    alert("Не удалось собрать PDF. Мы уже получили вашу заявку — дизайнер пришлёт концепцию в переписке.");
  } finally {
    // Раньше ссылку удаляли сразу после click(), и браузер не успевал
    // начать скачивание. Даём ему время.
    if (url) setTimeout(() => URL.revokeObjectURL(url as string), 60000);
  }
}
