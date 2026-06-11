export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7f5] text-gray-900">
      
      
      {/* Hero */}
      <section className="relative overflow-hidden grid md:grid-cols-2 gap-10 items-center px-6 md:px-10 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-10 -left-24 w-64 h-64 bg-blue-100 rounded-full opacity-30"></div>

        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
            <span className="text-blue-600">Re</span>
            <span className="text-purple-600">Usa</span>
          </h2>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Conecta y Recicla
          </h3>

          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
            La plataforma donde puedes dar una nueva vida a materiales
            reutilizables como cartón, latas y vidrio. Publica materiales,
            encuentra centros cercanos y conecta con personas que buscan
            reutilizar.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/publicar"
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Publicar material
            </a>

            <a
              href="/centros"
              className="border border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
            >
              Buscar centros cercanos
            </a>
          </div>

          <p className="mt-8 text-gray-500">
            🌱 Menos residuos, más reutilización.
          </p>
        </div>

        <div className="relative z-10 flex justify-center">
          <img
            src="/logo-reusa.png"
            alt="Logo ReUsa"
            className="max-w-xs md:max-w-md w-full rounded-2xl"
          />
        </div>
      </section>

      {/* Cards */}
      <section className="grid md:grid-cols-3 gap-6 px-6 md:px-10 pb-20 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="text-5xl mb-5">♻️</div>
          <h4 className="text-2xl font-bold mb-4">Reutiliza</h4>
          <p className="text-gray-600 leading-relaxed">
            Publica materiales que ya no utilices y permite que otras personas
            puedan darles una segunda vida útil.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="text-5xl mb-5">🤝</div>
          <h4 className="text-2xl font-bold mb-4">Conecta</h4>
          <p className="text-gray-600 leading-relaxed">
            Explora publicaciones y solicita materiales disponibles para
            coordinar su retiro con el publicador.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="text-5xl mb-5">📍</div>
          <h4 className="text-2xl font-bold mb-4">Centros cercanos</h4>
          <p className="text-gray-600 leading-relaxed">
            Busca centros de acopio cercanos a tu dirección referencial dentro
            de Ñuñoa.
          </p>
        </div>
      </section>
      <footer className="mt-20 bg-purple-700 text-white px-6 md:px-10 py-10">
  <div className="max-w-7xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-4">
      Proyecto académico ReUsa 🌱
    </h2>

    <p className="text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
      ReUsa es un proyecto universitario desarrollado con fines académicos,
      orientado a promover el consumo responsable, la reutilización de
      materiales y la economía circular en el marco del ODS 12. Este prototipo
      busca conectar personas que disponen de materiales como cartón, latas y
      vidrio con usuarios o centros interesados en reutilizarlos.
    </p>

    <p className="mt-6 text-sm text-purple-100">
      ReUsa © 2026 · Prototipo académico · Conecta y Recicla
    </p>
  </div>
</footer>
    </main>
  );
}