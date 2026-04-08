"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadFile, deleteFile, getPublicUrl } from "@/lib/supabase/storage";
import {
  Plus,
  Trash2,
  GripVertical,
  Upload,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
} from "lucide-react";
import { useDragReorder } from "@/hooks/useDragReorder";

interface Video {
  id: string;
  title: string;
  file_path: string;
  sort_order: number;
  active: boolean;
}

export default function VideosParceiros() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchVideos = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("partner_videos")
      .select("*")
      .order("sort_order");
    setVideos(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      try {
        const filePath = await uploadFile(file, "videos-parceiros");
        const maxOrder =
          videos.length > 0
            ? Math.max(...videos.map((v) => v.sort_order))
            : 0;

        await supabase.from("partner_videos").insert({
          title: file.name.replace(/\.[^/.]+$/, ""),
          file_path: filePath,
          sort_order: maxOrder + 1,
        });
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    e.target.value = "";
    setUploading(false);
    fetchVideos();
  };

  const handleDelete = async (video: Video) => {
    if (!confirm(`Excluir "${video.title}"?`)) return;

    const supabase = createClient();
    await supabase.from("partner_videos").delete().eq("id", video.id);
    try {
      await deleteFile(video.file_path);
    } catch {
      // file may have already been deleted
    }
    fetchVideos();
  };

  const handleToggleActive = async (video: Video) => {
    const supabase = createClient();
    await supabase
      .from("partner_videos")
      .update({ active: !video.active })
      .eq("id", video.id);
    fetchVideos();
  };

  const handleSaveTitle = async (video: Video) => {
    const supabase = createClient();
    await supabase
      .from("partner_videos")
      .update({ title: editTitle })
      .eq("id", video.id);
    setEditingId(null);
    fetchVideos();
  };

  const handleReorder = useCallback(
    async (reordered: Video[]) => {
      setVideos(reordered);
      const supabase = createClient();
      await Promise.all(
        reordered.map((v, i) =>
          supabase
            .from("partner_videos")
            .update({ sort_order: i + 1 })
            .eq("id", v.id)
        )
      );
    },
    []
  );

  const { getDragProps, getItemStyle } = useDragReorder(videos, handleReorder);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Vídeos Parceiros</h1>
          <p className="text-white/50 text-sm mt-1">
            Vídeos exibidos no carrossel da seção Parceiros
          </p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B00] text-white font-medium text-sm hover:bg-[#FF8A33] transition cursor-pointer">
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          {uploading ? "Enviando..." : "Adicionar vídeo"}
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-white/50" />
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
          <Upload size={40} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/50">Nenhum vídeo cadastrado</p>
          <p className="text-white/30 text-sm mt-1">
            Clique em &quot;Adicionar vídeo&quot; para começar
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {videos.map((video, index) => (
            <div
              key={video.id}
              {...getDragProps(index)}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors select-none ${
                video.active
                  ? "bg-white/5 border-white/10"
                  : "bg-white/[0.02] border-white/5 opacity-60"
              } ${getItemStyle(index)}`}
            >
              {/* Drag handle */}
              <div className="cursor-grab active:cursor-grabbing text-white/30 hover:text-white/60 transition-colors">
                <GripVertical size={18} />
              </div>

              {/* Preview */}
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-black shrink-0">
                <video
                  src={getPublicUrl(video.file_path)}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                />
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                {editingId === video.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveTitle(video);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveTitle(video)}
                      className="text-xs text-[#FF6B00] hover:underline"
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(video.id);
                      setEditTitle(video.title);
                    }}
                    className="group/edit flex items-center gap-1.5 text-white text-sm font-medium hover:text-[#FF6B00] transition-colors text-left truncate w-full"
                    title="Clique para renomear"
                  >
                    <span className="truncate">{video.title || "Sem título"}</span>
                    <Pencil size={12} className="shrink-0 opacity-0 group-hover/edit:opacity-60 transition-opacity" />
                  </button>
                )}
                <p className="text-white/30 text-xs mt-0.5 truncate">
                  {video.file_path}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleActive(video)}
                  className={`p-2 rounded-lg transition-colors ${
                    video.active
                      ? "text-green-400 hover:bg-green-400/10"
                      : "text-white/30 hover:bg-white/5"
                  }`}
                  title={video.active ? "Desativar" : "Ativar"}
                >
                  {video.active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => handleDelete(video)}
                  className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
