import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { unlink } from "fs/promises";
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

  const { filePath } = await request.json();

  if (!filePath || typeof filePath !== "string") {
    return NextResponse.json(
      { error: "filePath é obrigatório" },
      { status: 400 }
    );
  }

  // Skip local public paths (seeded data like /videos/1.mp4)
  if (filePath.startsWith("/")) {
    return NextResponse.json({ ok: true });
  }

  const fullPath = path.join(UPLOADS_DIR, filePath);

  // Prevent path traversal
  if (!fullPath.startsWith(UPLOADS_DIR)) {
    return NextResponse.json({ error: "Caminho inválido" }, { status: 400 });
  }

  try {
    await unlink(fullPath);
  } catch {
    // File may already be deleted
  }

  return NextResponse.json({ ok: true });
}
