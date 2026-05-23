import React from "react";
import fs from "fs";
import path from "path";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
  renderToBuffer,
} from "@react-pdf/renderer";
import { selectMoodboardImages } from "./moodboard-matcher";

function toBase64(src: string): string {
  try {
    const filename = src.replace(/^\//, "");
    const filePath = path.join(process.cwd(), "public", filename);
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).replace(".", "");
    return `data:image/${ext};base64,${buffer.toString("base64")}`;
  } catch {
    return src;
  }
}

type Answers = {
  name: string;
  style: string;
  atmosphere: string;
  colors: string;
  materials: string;
  rooms: string;
  budget: string;
  baseUrl: string;
};

export async function generateMoodboardPDF(answers: Answers): Promise<Buffer> {
  Font.register({
    family: "Roboto",
    fonts: [
      { src: path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf") },
      { src: path.join(process.cwd(), "public/fonts/Roboto-Bold.ttf"), fontWeight: 700 },
    ],
  });

  const styles = StyleSheet.create({
    page: { backgroundColor: "#0a0a0a", padding: 32, fontFamily: "Roboto" },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 20,
      borderBottom: "1px solid #333",
      paddingBottom: 14,
    },
    studioName: { fontSize: 18, color: "#ffffff", fontWeight: 700 },
    clientName: { fontSize: 11, color: "#ffffff" },
    clientMeta: { fontSize: 9, color: "#666666", marginTop: 2 },
    tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginBottom: 16 },
    tag: {
      backgroundColor: "#1a1a1a", color: "#aaaaaa", fontSize: 8,
      paddingVertical: 3, paddingHorizontal: 8, borderRadius: 20,
    },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
    imageWrapper: {
      width: "32.5%", height: 160,
      backgroundColor: "#1a1a1a", borderRadius: 4, overflow: "hidden",
    },
    image: { width: "100%", height: "100%", objectFit: "cover" },
    footer: {
      marginTop: 16, flexDirection: "row", justifyContent: "space-between",
      borderTop: "1px solid #222", paddingTop: 10,
    },
    footerText: { fontSize: 8, color: "#444444" },
  });

  const images = selectMoodboardImages(
    {
      style: answers.style,
      atmosphere: answers.atmosphere,
      colors: answers.colors,
      materials: answers.materials,
      rooms: answers.rooms,
    },
    9
  );

  const date = new Date().toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });

  const tags = [answers.style, answers.atmosphere, answers.budget].filter(Boolean);

  const doc = (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.studioName}>ZK DESIGN</Text>
          <View>
            <Text style={styles.clientName}>{answers.name}</Text>
            <Text style={styles.clientMeta}>{date} · {answers.budget}</Text>
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
              <Image src={toBase64(img.src)} style={styles.image} />
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

  return await renderToBuffer(doc);
}