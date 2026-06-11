"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Iniciar sesión con Supabase Auth
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Verificar rol desde la tabla perfiles
    const { data: perfil, error: perfilError } = await supabase
      .from("profiles")
      .select("rol, nombre")
      .eq("email", email.trim().toLowerCase())
      .single();

    if (perfilError) {
      alert("No se encontró el perfil: " + perfilError.message);
      return;
    }

    // Guardar sesión temporal en localStorage (opcional)
    localStorage.setItem(
      "usuarioReUsa",
      JSON.stringify({ name: perfil.nombre, rol: perfil.rol })
    );

    // Redirigir según rol
    if (perfil.rol === "admin") {
      alert("Inicio de sesión como administrador");
      router.push("/admin");
    } else {
      alert("Inicio de sesión como usuario");
      router.push("/explorar");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] px-6 md:px-10 py-10 text-gray-900">
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
            Iniciar sesión
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Ingresa a ReUsa para publicar materiales, solicitar productos
            disponibles o acceder al panel de administrador según tu rol.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            Acceso a la plataforma
          </h2>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Iniciar sesión
          </button>

          <p className="text-center text-gray-600 mt-5">
            ¿No tienes cuenta?{" "}
            <a href="/registro" className="text-purple-600 font-bold hover:underline">
              Regístrate aquí
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}