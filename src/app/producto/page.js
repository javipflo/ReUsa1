"use client";

import { useRouter } from "next/router";

export default function Producto() {
  const router = useRouter();
  const { id } = router.query;

  const handleSolicitar = () => {
    alert(
      "Has solicitado este material. El publicador será contactado para coordinar el retiro."
    );
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] text-gray-900 px-6 md:px-10 py-10">
      <a href="/explorar" className="text-purple-600 font-bold hover:underline">
        ← Volver a explorar
      </a>

      <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden max-w-4xl mx-auto">
        <div className="h-72 md:h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
          Imagen del producto
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">
            Producto {id}
          </h1>

          <div className="space-y-3 text-gray-700 text-lg">
            <p><strong>Tipo de material:</strong> Cartón</p>
            <p><strong>Descripción:</strong> Caja de cartón reciclable en buen estado.</p>
            <p><strong>Ubicación referencial:</strong> Ñuñoa</p>
            <p><strong>Estado:</strong> <span className="text-green-600 font-bold">Disponible</span></p>
            <p><strong>Contacto:</strong> Disponible al solicitar el material.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleSolicitar}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Solicitar material
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
    </main>
  );
}