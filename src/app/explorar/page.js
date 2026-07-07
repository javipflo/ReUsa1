"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Explorar() {
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    const fetchData = async () => {
      // Cargamos productos que no estén "Entregados"
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .neq("estado", "Entregado")
        .order("created_at", { ascending: false });
      
      if (error) console.error(error);
      else setProductos(data || []);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#e6fcf0] p-6 md:p-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">Explorar productos</h1>
      
      {/* Selector blanco con sombra para mayor contraste */}
      <select 
        onChange={(e) => setFiltro(e.target.value)} 
        className="mb-6 p-3 border rounded-lg w-full md:w-64 bg-white shadow-sm border-gray-200"
      >
        <option value="Todos">Todos los materiales</option>
        <option value="Cartón">Cartón</option>
        <option value="Lata">Lata</option>
        <option value="Vidrio">Vidrio</option>
      </select>

      <div className="grid gap-6">
        {productos.filter(p => filtro === "Todos" ? true : p.tipo === filtro).map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
              {p.imagen_url ? <img src={p.imagen_url} className="w-full h-full object-cover" /> : <div className="flex h-full items-center justify-center">Sin foto</div>}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-purple-600">{p.nombre}</h2>
              <p><strong>Tipo:</strong> {p.tipo}</p>
              <p><strong>Estado:</strong> {p.estado}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => router.push(`/ver-producto/${p.id}`)} className="bg-purple-600 text-white px-4 py-2 rounded-lg">Ver producto</button>
                <button onClick={() => router.push(`/chat/${p.id}`)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Ver chat</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}