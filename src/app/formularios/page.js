"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function FormulariosPage() {
  const router = useRouter();
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    const verificarAdminYCargar = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: perfil } = await supabase
        .from("profiles")
        .select("rol")
        .eq("email", session.user.email)
        .single();

      if (perfil?.rol !== "admin") {
        router.push("/");
        return;
      }

      const { data, error } = await supabase
        .from("formularios")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setFormularios(data);
      }
      setCargandoAuth(false);
    };

    verificarAdminYCargar();
  }, [router]);

  if (cargandoAuth) {
    return (
      <main className="min-h-screen bg-[#f5f7f5] flex items-center justify-center p-6">
        <p className="text-xl font-semibold text-purple-700">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-10 text-gray-900">
      <div className="mb-6">
        <button onClick={() => router.back()} className="text-purple-600 font-bold hover:underline">← Volver</button>
      </div>

      <h1 className="text-4xl font-bold text-purple-700 mb-8">Bandeja de Formularios 📥</h1>

      <section className="grid gap-6">
        {formularios.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6">Aún no hay mensajes.</div>
        ) : (
          formularios.map((f) => (
            <div key={f.id} className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-purple-800">{f.nombre}</p>
                  <p className="text-sm text-gray-500">{f.email}</p>
                </div>
                
                <button
  onClick={() => {
    navigator.clipboard.writeText(f.email);
    alert(`Correo copiado al portapapeles: ${f.email}`);
  }}
  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
>
  Copiar correo para responder 📧

                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">"{f.mensaje}"</p>
              </div>

              <button
                onClick={async () => {
                  if (window.confirm("¿Eliminar mensaje?")) {
                    await supabase.from("formularios").delete().eq("id", f.id);
                    setFormularios(formularios.filter(form => form.id !== f.id));
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
              >
                Eliminar 🗑️
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}