"use client";

// Ya no necesitamos router.query
export default function Producto({ params }) {
  // Ahora accedemos al ID directamente desde params
  const { productoId } = params; 

  const handleSolicitar = () => {
    alert("Has solicitado este material. El publicador será contactado para coordinar el retiro.");
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
            Producto {productoId}
          </h1>
          
          <div className="space-y-3 text-gray-700 text-lg">
            <p><strong>Tipo de material:</strong> Cartón</p>
            {/* ... el resto de tu código ... */}
            <button 
              onClick={handleSolicitar}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700"
            >
              Solicitar material
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}