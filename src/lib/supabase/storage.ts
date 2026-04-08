import { createClient } from "@/lib/supabase/client";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export function getPublicUrl(filePath: string): string {
  // If it's already a full URL or a local path starting with /, return as-is
  if (filePath.startsWith("http") || filePath.startsWith("/")) {
    return filePath;
  }
  return `${SUPABASE_URL}/storage/v1/object/public/media/${filePath}`;
}

export async function uploadFile(
  file: File,
  folder: string
): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, file, { upsert: false });

  if (error) throw error;

  return fileName;
}

export async function deleteFile(filePath: string): Promise<void> {
  // Only delete from Supabase storage, not local files
  if (filePath.startsWith("/")) return;

  const supabase = createClient();
  const { error } = await supabase.storage.from("media").remove([filePath]);
  if (error) throw error;
}
