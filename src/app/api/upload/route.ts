import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOADS_DIR = process.env.UPLOADS_DIR || "/app/uploads";

export async function POST(request: NextRequest) {
  // Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = formData.get("folder") as string | null;

  if (!file || !folder) {
    return NextResponse.json(
      { error: "Arquivo e pasta são obrigatórios" },
      { status: 400 }
    );
  }

  // Sanitize folder name
  const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeFolder) {
    return NextResponse.json({ error: "Pasta inválida" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const allowedExts = [
    "mp4", "webm", "mov",
    "png", "jpg", "jpeg", "webp", "svg",
  ];
  if (!allowedExts.includes(ext)) {
    return NextResponse.json(
      { error: "Tipo de arquivo não permitido" },
      { status: 400 }
    );
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const relativePath = `${safeFolder}/${fileName}`;
  const dirPath = path.join(UPLOADS_DIR, safeFolder);
  const filePath = path.join(UPLOADS_DIR, relativePath);

  // Prevent path traversal
  if (!filePath.startsWith(UPLOADS_DIR)) {
    return NextResponse.json({ error: "Caminho inválido" }, { status: 400 });
  }

  await mkdir(dirPath, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return NextResponse.json({ path: relativePath });
}
