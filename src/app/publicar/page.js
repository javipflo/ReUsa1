"use client";

import { useState } from "react";

export default function Publicar() {
  const [logueado, setLogueado] = useState(true); // simulando usuario logueado
  const [formulario, setFormulario] = useState({
    nombre: "Caja de cartón grande",
    tipo: "Cartón",
    descripcion: "Caja de cartón reciclable en buen estado, útil para mudanza o almacenamiento.",
    ubicacion: "Ñuñoa, cerca de Plaza Ñuñoa",
    contacto: "correo@example.com",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handlePublicar = (e) => {
    e.preventDefault();
    alert("¡Publicación creada correctamente! (Simulación de ejemplo)");
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-10 text-gray-900">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Publicar material (Ejemplo)</h1>

      {!logueado && (
        <p className="text-red-600 mb-6">
          Debes iniciar sesión para publicar un material.
        </p>
      )}

      <form
        onSubmit={handlePublicar}
        className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 grid gap-6"
      >
        <div>
          <label className="block font-semibold mb-2">Nombre del material</label>
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            placeholder="Ej: Caja de cartón, botellas de vidrio, latas limpias"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Tipo de material</label>
          <select
            name="tipo"
            value={formulario.tipo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="Cartón">Cartón</option>
            <option value="Lata">Lata</option>
            <option value="Vidrio">Vidrio</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
            placeholder="Ej: Caja grande para mudanza, limpia y sin daños"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Ubicación referencial</label>
          <input
            type="text"
            name="ubicacion"
            value={formulario.ubicacion}
            onChange={handleChange}
            placeholder="Ej: Ñuñoa, cerca de Plaza Ñuñoa"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Contacto</label>
          <input
            type="text"
            name="contacto"
            value={formulario.contacto}
            onChange={handleChange}
            placeholder="Ej: correo@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500 bg-gray-50">
          Imagen del producto (simulación)
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700"
        >
          Publicar material
        </button>
      </form>
    </main>
  );
}