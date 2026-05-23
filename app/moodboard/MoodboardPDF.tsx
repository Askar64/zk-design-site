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