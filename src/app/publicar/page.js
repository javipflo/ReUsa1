"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Publicar() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    tipo: "Cartón",
    descripcion: "",
    ubicacion: "",
    peso_kg: "",
  });

  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handlePublicar = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Obtener usuario
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Debes iniciar sesión para publicar");

      let imagenUrl = null;

      // 2. Subir imagen a Storage si existe
      if (imagen) {
        const fileExt = imagen.name.split(".").pop();
        const fileName = `${user.id}/${Math.random()}.${fileExt}`;
        
        const { error: storageError } = await supabase.storage
          .from("materiales")
          .upload(fileName, imagen);

        if (storageError) throw storageError;

        const { data: publicUrlData } = supabase.storage
          .from("materiales")
          .getPublicUrl(fileName);
        
        imagenUrl = publicUrlData.publicUrl;
      }

      // 3. Guardar en tabla productos
      const { error: dbError } = await supabase.from("productos").insert([
        {
          nombre: formulario.nombre,
          tipo: formulario.tipo,
          descripcion: formulario.descripcion,
          ubicacion: formulario.ubicacion,
          peso_kg: parseFloat(formulario.peso_kg) || 0,
          imagen_url: imagenUrl,
          estado: "Disponible",
          usuario_id: user.id,
        },
      ]);

      if (dbError) throw dbError;

      alert("¡Publicado con éxito!");
      
      // Limpiar formulario
      setFormulario({ nombre: "", tipo: "Cartón", descripcion: "", ubicacion: "", peso_kg: "" });
      setImagen(null);
    } catch (error) {
      console.error("Error detallado:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-10 text-gray-900">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Publicar material</h1>

      <form onSubmit={handlePublicar} className="bg-white rounded-2xl shadow-md p-6 md:p-8 grid gap-6">
        <input name="nombre" value={formulario.nombre} onChange={handleChange} placeholder="Nombre del material" className="border p-3 rounded-lg" required />
        
        <input name="peso_kg" type="number" step="0.1" value={formulario.peso_kg} onChange={handleChange} placeholder="Peso en kg (ej: 2.5)" className="border p-3 rounded-lg" required />

        <div className="border p-3 rounded-lg">
          <label className="block text-sm text-gray-500 mb-2">Imagen del material:</label>
          <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
        </div>

        <select name="tipo" value={formulario.tipo} onChange={handleChange} className="border p-3 rounded-lg">
          <option value="Cartón">Cartón</option>
          <option value="Lata">Lata</option>
          <option value="Vidrio">Vidrio</option>
        </select>

        <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} placeholder="Descripción" className="border p-3 rounded-lg" required />
        <input name="ubicacion" value={formulario.ubicacion} onChange={handleChange} placeholder="Ubicación" className="border p-3 rounded-lg" />

        <button type="submit" disabled={loading} className="bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition">
          {loading ? "Procesando..." : "Publicar material"}
        </button>
      </form>
    </main>
  );
}