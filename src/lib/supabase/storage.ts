export function getPublicUrl(filePath: string): string {
  // Local seeded data (e.g. /videos/1.mp4, /logos-parceiros/1.png)
  if (filePath.startsWith("/")) {
    return filePath;
  }
  // Full external URL
  if (filePath.startsWith("http")) {
    return filePath;
  }
  // VPS uploaded file — served via API route
  return `/api/media/${filePath}`;
}

export async function uploadFile(
  file: File,
  folder: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Erro no upload");
  }

  const { path } = await res.json();
  return path;
}

export async function deleteFile(filePath: string): Promise<void> {
  // Skip local public paths (seeded data)
  if (filePath.startsWith("/")) return;

  await fetch("/api/delete-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filePath }),
  });
}
