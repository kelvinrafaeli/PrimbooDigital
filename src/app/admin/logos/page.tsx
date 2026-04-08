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
} from "lucide-react";
import { useDragReorder } from "@/hooks/useDragReorder";

interface Logo {
  id: string;
  name: string;
  file_path: string;
  sort_order: number;
  active: boolean;
}

export default function LogosParceiros() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchLogos = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("partner_logos")
      .select("*")
      .order("sort_order");
    setLogos(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLogos();
  }, [fetchLogos]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      try {
        const filePath = await uploadFile(file, "logos");
        const maxOrder =
          logos.length > 0 ? Math.max(...logos.map((l) => l.sort_order)) : 0;

        await supabase.from("partner_logos").insert({
          name: file.name.replace(/\.[^/.]+$/, ""),
          file_path: filePath,
          sort_order: maxOrder + 1,
        });
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    e.target.value = "";
    setUploading(false);
    fetchLogos();
  };

  const handleDelete = async (logo: Logo) => {
    if (!confirm(`Excluir "${logo.name}"?`)) return;

    const supabase = createClient();
    await supabase.from("partner_logos").delete().eq("id", logo.id);
    try {
      await deleteFile(logo.file_path);
    } catch {
      // file may have already been deleted
    }
    fetchLogos();
  };

  const handleToggleActive = async (logo: Logo) => {
    const supabase = createClient();
    await supabase
      .from("partner_logos")
      .update({ active: !logo.active })
      .eq("id", logo.id);
    fetchLogos();
  };

  const handleSaveName = async (logo: Logo) => {
    const supabase = createClient();
    await supabase
      .from("partner_logos")
      .update({ name: editName })
      .eq("id", logo.id);
    setEditingId(null);
    fetchLogos();
  };

  const handleReorder = useCallback(
    async (reordered: Logo[]) => {
      setLogos(reordered);
      const supabase = createClient();
      await Promise.all(
        reordered.map((l, i) =>
          supabase
            .from("partner_logos")
            .update({ sort_order: i + 1 })
            .eq("id", l.id)
        )
      );
    },
    []
  );

  const { getDragProps, getItemStyle } = useDragReorder(logos, handleReorder);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Logos Parceiros</h1>
          <p className="text-white/50 text-sm mt-1">
            Logos exibidos no carrossel da seção Cobertura
          </p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B00] text-white font-medium text-sm hover:bg-[#FF8A33] transition cursor-pointer">
          {uploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          {uploading ? "Enviando..." : "Adicionar logo"}
          <input
            type="file"
            accept="image/*"
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
      ) : logos.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
          <Upload size={40} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/50">Nenhum logo cadastrado</p>
          <p className="text-white/30 text-sm mt-1">
            Clique em &quot;Adicionar logo&quot; para começar
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {logos.map((logo, index) => (
            <div
              key={logo.id}
              {...getDragProps(index)}
              className={`rounded-xl border p-4 transition-colors select-none ${
                logo.active
                  ? "bg-white/5 border-white/10"
                  : "bg-white/[0.02] border-white/5 opacity-60"
              } ${getItemStyle(index)}`}
            >
              <div className="w-full h-28 rounded-lg bg-white/10 flex items-center justify-center mb-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getPublicUrl(logo.file_path)}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {editingId === logo.id ? (
                <div className="flex items-center gap-2 mb-3">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveName(logo);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveName(logo)}
                    className="text-xs text-[#FF6B00] hover:underline"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingId(logo.id);
                    setEditName(logo.name);
                  }}
                  className="text-white text-sm font-medium hover:text-[#FF6B00] transition-colors truncate block w-full text-left mb-3"
                >
                  {logo.name || "Sem nome"}
                </button>
              )}

              <div className="flex items-center justify-between">
                <div className="cursor-grab active:cursor-grabbing text-white/30 hover:text-white/60 transition-colors">
                  <GripVertical size={16} />
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleActive(logo)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      logo.active
                        ? "text-green-400 hover:bg-green-400/10"
                        : "text-white/30 hover:bg-white/5"
                    }`}
                    title={logo.active ? "Desativar" : "Ativar"}
                  >
                    {logo.active ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(logo)}
                    className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
