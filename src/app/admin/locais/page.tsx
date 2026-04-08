"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Trash2,
  GripVertical,
  MapPin,
  Pencil,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { useDragReorder } from "@/hooks/useDragReorder";

interface Location {
  id: string;
  name: string;
  address: string;
  maps_query: string;
  sort_order: number;
  active: boolean;
}

const emptyForm = { name: "", address: "", maps_query: "" };

export default function LocaisAdmin() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchLocations = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("locations")
      .select("*")
      .order("sort_order");
    setLocations(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleAdd = async () => {
    if (!form.name || !form.address) return;

    const supabase = createClient();
    const maxOrder =
      locations.length > 0
        ? Math.max(...locations.map((l) => l.sort_order))
        : 0;

    await supabase.from("locations").insert({
      ...form,
      maps_query: form.maps_query || `${form.name}, ${form.address}, Caxias do Sul, RS`,
      sort_order: maxOrder + 1,
    });

    setForm(emptyForm);
    setShowForm(false);
    fetchLocations();
  };

  const handleUpdate = async () => {
    if (!editingId || !form.name || !form.address) return;

    const supabase = createClient();
    await supabase
      .from("locations")
      .update({
        name: form.name,
        address: form.address,
        maps_query: form.maps_query || `${form.name}, ${form.address}, Caxias do Sul, RS`,
      })
      .eq("id", editingId);

    setEditingId(null);
    setForm(emptyForm);
    fetchLocations();
  };

  const handleDelete = async (loc: Location) => {
    if (!confirm(`Excluir "${loc.name}"?`)) return;

    const supabase = createClient();
    await supabase.from("locations").delete().eq("id", loc.id);
    fetchLocations();
  };

  const handleToggleActive = async (loc: Location) => {
    const supabase = createClient();
    await supabase
      .from("locations")
      .update({ active: !loc.active })
      .eq("id", loc.id);
    fetchLocations();
  };

  const handleReorder = useCallback(
    async (reordered: Location[]) => {
      setLocations(reordered);
      const supabase = createClient();
      await Promise.all(
        reordered.map((l, i) =>
          supabase
            .from("locations")
            .update({ sort_order: i + 1 })
            .eq("id", l.id)
        )
      );
    },
    []
  );

  const { getDragProps, getItemStyle } = useDragReorder(locations, handleReorder);

  const startEdit = (loc: Location) => {
    setEditingId(loc.id);
    setForm({ name: loc.name, address: loc.address, maps_query: loc.maps_query });
    setShowForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Locais</h1>
          <p className="text-white/50 text-sm mt-1">
            Pontos de exibição mostrados na seção Cobertura
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyForm);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B00] text-white font-medium text-sm hover:bg-[#FF8A33] transition"
        >
          <Plus size={16} />
          Adicionar local
        </button>
      </div>

      {/* Add/Edit form */}
      {(showForm || editingId) && (
        <div className="mb-6 p-5 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-white font-medium mb-4">
            {editingId ? "Editar local" : "Novo local"}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5">
                Nome do local *
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Barbearia El Toro"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5">
                Endereço *
              </label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Ex: Av. Rio Branco"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5">
                Busca no Google Maps
              </label>
              <input
                value={form.maps_query}
                onChange={(e) =>
                  setForm({ ...form, maps_query: e.target.value })
                }
                placeholder="Preenchido automaticamente"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF6B00] text-white font-medium text-sm hover:bg-[#FF8A33] transition"
            >
              <Check size={14} />
              {editingId ? "Salvar" : "Adicionar"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                cancelEdit();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 font-medium text-sm hover:bg-white/5 transition"
            >
              <X size={14} />
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-white/50" />
        </div>
      ) : locations.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
          <MapPin size={40} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/50">Nenhum local cadastrado</p>
        </div>
      ) : (
        <div className="space-y-1">
          {locations.map((loc, index) => (
            <div
              key={loc.id}
              {...getDragProps(index)}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors select-none ${
                loc.active
                  ? "bg-white/5 border-white/10"
                  : "bg-white/[0.02] border-white/5 opacity-60"
              } ${getItemStyle(index)}`}
            >
              <div className="cursor-grab active:cursor-grabbing text-white/30 hover:text-white/60 transition-colors">
                <GripVertical size={18} />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#FF6B00]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {loc.name}
                </p>
                <p className="text-white/40 text-xs mt-0.5 truncate">
                  {loc.address}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(loc)}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  title="Editar"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleToggleActive(loc)}
                  className={`p-2 rounded-lg transition-colors ${
                    loc.active
                      ? "text-green-400 hover:bg-green-400/10"
                      : "text-white/30 hover:bg-white/5"
                  }`}
                  title={loc.active ? "Desativar" : "Ativar"}
                >
                  {loc.active ? (
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(loc)}
                  className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
