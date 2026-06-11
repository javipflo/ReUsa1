"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      const currentUser = supabase.auth.user();
      if (!currentUser) return;

      const { data, error } = await supabase
        .from("perfiles")
        .select("*")
        .eq("email", currentUser.email)
        .single();

      if (error) {
        console.error("Error al obtener perfil:", error.message);
      } else {
        setUsuario(data);
      }
    };

    fetchPerfil();
  }, []);

  const handleEliminarCuenta = async () => {
    if (!usuario) return;

    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    // Eliminar del Auth
    const { error: authError } = await supabase.auth.api.deleteUser(usuario.id);
    // Eliminar de la tabla perfiles
    const { error: dbError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", usuario.id);

    if (authError || dbError) {
      alert("Error al eliminar la cuenta");
      console.error(authError || dbError);
    } else {
      alert("Cuenta eliminada correctamente");
      setUsuario(null);
      // Redirigir a login si quieres
    }
  };

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">Mi perfil</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
        <p><strong>Comuna:</strong> {usuario.comuna}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Mis publicaciones
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Mis solicitudes
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Mis chats
        </button>
        <button
          onClick={handleEliminarCuenta}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Eliminar cuenta
        </button>
      </div>
    </main>
  );
}