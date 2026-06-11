"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Explorar() {
  const productosEjemplo = [
    {
      id: "ejemplo-1",
      nombre: "Caja de cartón grande",
      tipo: "Cartón",
      descripcion: "Caja de cartón reciclable, buena para mudanza.",
      ubicacion: "Ñuñoa",
      estado: "Disponible",
    },
    {
      id: "ejemplo-2",
      nombre: "Lata de bebida",
      tipo: "Lata",
      descripcion: "Lata limpia, sin abrir, para reciclaje.",
      ubicacion: "Ñuñoa",
      estado: "Disponible",
    },
  ];

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*");

      if (error) {
        console.error("Error al cargar productos:", error.message);
        setProductos(productosEjemplo);
      } else if (data.length === 0) {
        setProductos(productosEjemplo);
      } else {
        setProductos(data);
      }
    };

    fetchProductos();
  }, []);

  const handleSolicitar = () => {
    alert("Has reservado este material. Contacta al publicador para coordinar.");
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-10">
      <div className="mb-6">
        <a
          href="/"
          className="text-purple-600 font-bold hover:underline flex items-center gap-1"
        >
          ← Volver atrás
        </a>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-8">
        Explorar productos
      </h1>

      <div className="grid gap-6">
        {productos.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-1">
              <h2 className="text-xl font-bold text-purple-600 mb-2">
                {p.nombre}
              </h2>

              <p className="text-gray-700 mb-1">
                <strong>Tipo:</strong> {p.tipo}
              </p>

              <p className="text-gray-700 mb-1">
                <strong>Descripción:</strong> {p.descripcion}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Ubicación:</strong> {p.ubicacion}
              </p>

              <p className="text-gray-700 mb-3">
                <strong>Estado:</strong> {p.estado}
              </p>

              <div className="mt-4 flex gap-3">
                <a
                  href={
                    String(p.id).startsWith("ejemplo")
                      ? "/ver-producto/ejemplo-1"
                      : `/ver-producto/${p.id}`
                  }
                  className="flex-1 text-center bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Ver producto
                </a>

                <button
                  onClick={() =>
                    alert("Chat simulado. Luego se conectará a la base de datos.")
                  }
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Ver chat
                </button>

                <button
                  onClick={handleSolicitar}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Solicitar material
                </button>
              </div>
            </div>

            <div className="flex-shrink-0 w-48 md:w-64 h-48 md:h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-semibold">
              Imagen
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}