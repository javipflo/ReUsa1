"use client";

export default function ComoFunciona() {
  return (
    <main className="min-h-screen bg-[#f5f7f5] text-gray-900 px-6 md:px-10 py-10">
      <section className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
            ¿Cómo funciona ReUsa? 🌱
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl">
            ReUsa es una plataforma web que conecta a personas que tienen
            materiales reutilizables con usuarios interesados en solicitarlos o
            retirarlos. En esta primera versión, el proyecto se enfoca en la
            comuna de Ñuñoa y en materiales como cartón, latas y vidrio.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">01. Crear una cuenta</h2>
            <p className="text-gray-700 leading-relaxed">
              Para publicar materiales o solicitar una publicación disponible,
              el usuario debe registrarse o iniciar sesión. Esto permite identificar
              a quienes participan en la plataforma y facilita la coordinación entre
              la persona que publica y la persona interesada en retirar el material.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">02. Publicar un material 📦</h2>
            <p className="text-gray-700 leading-relaxed">
              Una vez iniciada la sesión, el usuario puede publicar materiales
              reutilizables, indicando el nombre del material, tipo, descripción,
              ubicación referencial y datos de contacto para coordinar el retiro.
              En esta primera etapa, los materiales considerados son cartón,
              latas y vidrio.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">03. Explorar publicaciones 🔍</h2>
            <p className="text-gray-700 leading-relaxed">
              Cualquier persona puede explorar las publicaciones disponibles sin
              necesidad de tener una cuenta. Sin embargo, para solicitar o reservar
              un material será necesario iniciar sesión, ya que se debe mantener un
              contacto básico entre los usuarios.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">04. Solicitar o reservar un material 🛒</h2>
            <p className="text-gray-700 leading-relaxed">
              Si un usuario encuentra un material que le interesa, puede solicitarlo o
              reservarlo. Esta acción no representa una compra dentro de la página,
              sino una forma de apartar el material para coordinar posteriormente su
              retiro con la persona que lo publicó.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">05. Buscar centros cercanos 📍</h2>
            <p className="text-gray-700 leading-relaxed">
              La plataforma también contempla un apartado de centros cercanos,
              donde se podrán visualizar puntos de acopio o recepción ubicados
              inicialmente en la comuna de Ñuñoa. Cada centro podrá incluir
              información como dirección, materiales aceptados, horario y datos
              de contacto.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">06. Rol del administrador 👨‍💼</h2>
            <p className="text-gray-700 leading-relaxed">
              El administrador no modifica directamente los productos publicados
              por los usuarios, pero sí puede revisar y eliminar publicaciones
              que no cumplan con los requisitos de la plataforma. Por ejemplo,
              si se publica un producto que no corresponde a cartón, lata o
              vidrio, el administrador podrá eliminar esa publicación.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-3">07. Limitaciones de la plataforma ⚠️</h2>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
              <li>❌ No realiza pagos ni transacciones dentro de la página.</li>
              <li>📦 No almacena físicamente los materiales publicados.</li>
              <li>🚫 No realiza transporte ni retiro directo de productos.</li>
              <li>♻️ No funciona como empresa recicladora o gestora de residuos.</li>
              <li>⏱️ No garantiza disponibilidad inmediata de usuarios interesados o centros de acopio.</li>
              <li>📍 En esta primera versión, el alcance territorial se enfoca en la comuna de Ñuñoa.</li>
            </ul>
          </div>
        </div>
      </section>
{/* Sección de contacto con fondo morado */}
<div className="mt-12 bg-purple-600 py-12 px-6 md:px-10 -mx-6 md:-mx-10">
<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
    <h2 className="text-2xl font-bold text-purple-700 mb-4">
      ¿Tienes preguntas o necesitas ayuda? 💬
    </h2>
    <p className="text-gray-700 mb-6">
      Envía tu consulta y el administrador podrá responderte.
    </p>

    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Tu mensaje ha sido enviado. El administrador podrá responderte.");
      }}
    >
      <input
        type="text"
        placeholder="Nombre"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <textarea
        placeholder="Escribe tu mensaje..."
        rows="4"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
      >
        Enviar
      </button>
    </form>
  </div>
</div>
    </main>
  );
}