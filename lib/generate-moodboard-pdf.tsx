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

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: 700 },
  ],
});

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
  const tags = [style, atmosphere, ...colors.split(", ")].filter(Boolean);

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
          <Text style={styles.footerText}>zkdesign.ru</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function downloadMoodboardPDF(props: Props) {
  const origin = window.location.origin;
  const propsFixed = {
    ...props,
    images: props.images.map((img) => ({
      ...img,
      src: `${origin}${img.src}`,
    })),
  };
  const blob = await pdf(<MoodboardDocument {...propsFixed} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `moodboard-${props.clientName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}