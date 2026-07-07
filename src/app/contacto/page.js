"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Contacto() {
  const manejarEnvio = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const datos = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      mensaje: formData.get("mensaje"),
    };

    const { error } = await supabase.from("formularios").insert([datos]);

    if (error) {
      alert("Hubo un problema al enviar: " + error.message);
    } else {
      alert("¡Mensaje enviado correctamente!");
      e.target.reset();
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-100">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">
          ¿Tienes preguntas o necesitas ayuda? Ingresa tu correo para recibir respuesta.
        </h2>
        <p className="text-gray-700 mb-8">
          Envía tu consulta y el administrador podrá responderte. ¿Prefieres escribirnos directamente? Envíanos un correo a <span className="font-bold text-purple-600">reusautem@gmail.com</span>
        </p>

        <form onSubmit={manejarEnvio} className="grid gap-4">
          <input 
            name="nombre" 
            placeholder="Nombre" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none" 
            required 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none" 
            required 
          />
          <textarea 
            name="mensaje" 
            placeholder="Escribe tu mensaje..." 
            rows="5" 
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none" 
            required 
          />
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </main>
  );
}