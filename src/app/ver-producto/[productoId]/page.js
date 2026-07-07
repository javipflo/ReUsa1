"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function VerProducto() {
  const { productoId } = useParams();
  const router = useRouter();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", productoId)
        .single();

      if (error) {
        console.error("Error al cargar producto:", error.message);
      } else {
        setProducto(data);
      }
      setLoading(false);
    };

    fetchProducto();
  }, [productoId]);

  const handleSolicitar = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert("Inicia sesión primero para solicitar materiales."); return; }

    const { error } = await supabase
      .from("productos")
      .update({ 
        estado: "Reservado", 
        solicitante_id: user.id 
      })
      .eq("id", productoId);

    if (error) {
      alert("Error al solicitar el material: " + error.message);
    } else {
      alert("¡Solicitud realizada con éxito!");
      router.push("/perfil");
    }
  };

  if (loading) return <main className="min-h-screen bg-[#f5f7f5] p-10">Cargando...</main>;
  if (!producto) return <main className="min-h-screen bg-[#f5f7f5] p-10">Producto no encontrado.</main>;

  return (
    <main className="min-h-screen bg-[#f5f7f5] text-gray-900 px-6 md:px-10 py-10">
      <section className="max-w-5xl mx-auto">
        <a href="/explorar" className="text-purple-600 font-bold hover:underline">
          ← Volver a explorar
        </a>

        <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Imagen completa (Diseño original) */}
          <div className="h-72 md:h-96 bg-gray-200 flex items-center justify-center overflow-hidden">
            {producto.imagen_url ? (
              <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-xl font-semibold">Imagen del producto</span>
            )}
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">{producto.nombre}</h1>

            {/* Información detallada (Diseño original) */}
            <div className="space-y-3 text-gray-700 text-lg">
              <p><strong>Tipo de material:</strong> {producto.tipo}</p>
              <p><strong>Peso:</strong> {producto.peso_kg ? `${producto.peso_kg} kg` : "No especificado"}</p>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
              <p><strong>Ubicación referencial:</strong> {producto.ubicacion}</p>
              <p>
                <strong>Estado:</strong>{" "}
                <span className={`font-bold ${producto.estado === 'Reservado' ? 'text-orange-600' : 'text-green-600'}`}>
                  {producto.estado}
                </span>
              </p>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleSolicitar}
                disabled={producto.estado !== 'Disponible'}
                className={`px-8 py-3 rounded-xl font-semibold transition ${
                  producto.estado === 'Disponible' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
              >
                {producto.estado === 'Disponible' ? 'Solicitar material' : 'Ya reservado'}
              </button>

              <button
                onClick={() => router.push(`/chat/${productoId}`)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Ver chat
              </button>

              <a
                href="/explorar"
                className="border border-purple-600 text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition"
              >
                Volver
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}