"use client";


const centros = [
  {
    nombre: "CESFAM Salvador Bustos",
    tipo: "Vidrio",
    direccion: "Av. Grecia 3980, Ñuñoa",
    horario:
      "Lunes a jueves de 8:00 a 20:00 hrs, viernes hasta las 19:00 hrs.",
    materiales: "Botellas, frascos y envases de vidrio de uso doméstico.",
    prohibicion:
      "No depositar vidrios planos, espejos, ampolletas, loza o cerámica.",
  },
  {
    nombre: "JVV Villa Olímpica",
    tipo: "Vidrio",
    direccion: "Sócrates 1237, Ñuñoa",
    horario: "Contenedor disponible las 24 horas.",
    materiales: "Botellas, frascos y envases de vidrio de uso doméstico.",
    prohibicion:
      "No depositar vidrios planos, espejos, ampolletas, loza o cerámica.",
  },
  {
    nombre: "JVV Villa Yugoslavia",
    tipo: "Vidrio",
    direccion: "Bolsón Suárez Mujica, Ñuñoa",
    horario: "Contenedor disponible las 24 horas.",
    materiales: "Botellas, frascos y envases de vidrio de uso doméstico.",
    prohibicion:
      "No depositar vidrios planos, espejos, ampolletas, loza o cerámica.",
  },
  {
    nombre: "Polideportivo de Ñuñoa",
    tipo: "Cartón y latas",
    direccion: "Juan Moya Morales 1370, Ñuñoa",
    horario:
      "Disponible entre 10:00 y 14:00 hrs o hasta las 19:00 hrs según disponibilidad.",
    materiales:
      "Cartón desarmado, aplastado o cortado. También latas limpias y aplastadas.",
    prohibicion:
      "No deben tener restos de comida, grasa o líquidos. Las latas deben estar limpias.",
  },
  {
    nombre: "Casa de la Cultura",
    tipo: "Cartón y latas",
    direccion: "Av. Irarrázaval 4055, Ñuñoa",
    horario:
      "Disponible entre 10:00 y 14:00 hrs o hasta las 19:00 hrs según disponibilidad.",
    materiales:
      "Cartón desarmado, aplastado o cortado. También latas limpias y aplastadas.",
    prohibicion:
      "No deben tener restos de comida, grasa o líquidos. Las latas deben estar limpias.",
  },
  {
    nombre: "Corporación Cultural de Ñuñoa",
    tipo: "Cartón y latas",
    direccion: "Av. Irarrázaval 4280, Ñuñoa",
    horario:
      "Disponible entre 10:00 y 14:00 hrs o hasta las 19:00 hrs según disponibilidad.",
    materiales:
      "Cartón desarmado, aplastado o cortado. También latas limpias y aplastadas.",
    prohibicion:
      "No deben tener restos de comida, grasa o líquidos. Las latas deben estar limpias.",
  },
  {
    nombre: "Gimnasio Club Ñuñoa Plaza",
    tipo: "Cartón y latas",
    direccion: "Manuel de Salas 164, Ñuñoa",
    horario:
      "Disponible entre 10:00 y 14:00 hrs o hasta las 19:00 hrs según disponibilidad.",
    materiales:
      "Cartón desarmado, aplastado o cortado. También latas limpias y aplastadas.",
    prohibicion:
      "No deben tener restos de comida, grasa o líquidos. Las latas deben estar limpias.",
  },
  {
    nombre: "COSAM Ñuñoa",
    tipo: "Cartón y latas",
    direccion: "Pichidangui 3650, Ñuñoa",
    horario:
      "Disponible entre 10:00 y 14:00 hrs o hasta las 19:00 hrs según disponibilidad.",
    materiales:
      "Cartón desarmado, aplastado o cortado. También latas limpias y aplastadas.",
    prohibicion:
      "No deben tener restos de comida, grasa o líquidos. Las latas deben estar limpias.",
  },
];

export default function Centros() {
  return (
    <main className="min-h-screen bg-[#f5f7f5] text-gray-900 px-6 md:px-10 py-10">
      <section className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
            Centros cercanos 📍
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl">
            En esta primera versión, ReUsa se enfoca en la comuna de Ñuñoa.
            Aquí puedes revisar algunos puntos de acopio disponibles para
            materiales como vidrio, cartón y latas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {centros.map((centro, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-purple-600">
                    {centro.nombre}
                  </h2>
                  <p className="text-green-600 font-semibold mt-1">
                    ♻️ {centro.tipo}
                  </p>
                </div>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Ñuñoa
                </span>
              </div>

              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>📍 Dirección:</strong> {centro.direccion}
                </p>

                <p>
                  <strong>🕒 Horario:</strong> {centro.horario}
                </p>

                <p>
                  <strong>📦 Materiales aceptados:</strong> {centro.materiales}
                </p>

                <p>
                  <strong>⚠️ Restricciones:</strong> {centro.prohibicion}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    centro.direccion
                  )}`}
                  target="_blank"
                  className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Ver ubicación
                </a>

                <button className="border border-purple-600 text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-purple-50">
                  Ver información
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-purple-100 border border-purple-300 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">
            Información importante
          </h2>
          <p className="text-gray-700">
            Los centros mostrados corresponden a una selección inicial para el
            prototipo. En futuras versiones, esta información podrá conectarse a
            una base de datos para actualizar direcciones, horarios, materiales
            aceptados y datos de contacto.
          </p>
        </div>
      </section>
    </main>
  );
}