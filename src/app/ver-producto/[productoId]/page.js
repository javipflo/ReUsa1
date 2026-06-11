"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function VerProducto() {
  const params = useParams();
  const productoId = params.productoId;

  const productosEjemplo = [
    {
      id: "ejemplo-1",
      nombre: "Caja de cartón grande",
      tipo: "Cartón",
      descripcion: "Caja de cartón reciclable en buen estado, útil para mudanza o almacenamiento.",
      ubicacion: "Ñuñoa",
      estado: "Disponible",
      contacto: "Disponible al solicitar el material.",
    },
    {
      id: "ejemplo-2",
      nombre: "Lata de bebida",
      tipo: "Lata",
      descripcion: "Lata limpia y seca, apta para reciclaje o reutilización.",
      ubicacion: "Ñuñoa",
      estado: "Disponible",
      contacto: "Disponible al solicitar el material.",
    },
  ];

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      const ejemplo = productosEjemplo.find((p) => p.id === productoId);

      if (ejemplo) {
        setProducto(ejemplo);
        return;
      }

      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("id", productoId)
        .single();

      if (error) {
        console.error("Error al cargar producto:", error.message);
        setProducto(null);
      } else {
        setProducto(data);
      }
    };

    fetchProducto();
  }, [productoId]);

  if (!producto) {
    return (
      <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-10">
        <a href="/explorar" className="text-purple-600 font-bold hover:underline">
          ← Volver a explorar
        </a>
        <p className="mt-6 text-gray-700">Producto no encontrado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f5] text-gray-900 px-6 md:px-10 py-10">
      <section className="max-w-5xl mx-auto">
        <a href="/explorar" className="text-purple-600 font-bold hover:underline">
          ← Volver a explorar
        </a>

        <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="h-72 md:h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
            Imagen del producto
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-bold text-purple-700 mb-4">
              {producto.nombre}
            </h1>

            <div className="space-y-3 text-gray-700 text-lg">
              <p><strong>Tipo de material:</strong> {producto.tipo}</p>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
              <p><strong>Ubicación referencial:</strong> {producto.ubicacion}</p>
              <p>
                <strong>Estado:</strong>{" "}
                <span className="text-green-600 font-bold">{producto.estado}</span>
              </p>
              <p><strong>Contacto:</strong> {producto.contacto || "Disponible al solicitar el material."}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => alert("Has solicitado este material.")}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700"
              >
                Solicitar material
              </button>

              <button
                onClick={() => alert("Chat simulado. Luego se conectará a la base de datos.")}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                Ver chat
              </button>

              <a
                href="/explorar"
                className="border border-purple-600 text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50"
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