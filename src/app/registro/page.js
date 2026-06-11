"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comuna, setComuna] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    const emailLimpio = email.trim().toLowerCase();
    const passwordLimpia = password.trim();

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: emailLimpio,
      password: passwordLimpia,
    });

    if (authError) {
      alert(authError.message);
      return;
    }

    const { error: dbError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        nombre: nombre.trim(),
        email: emailLimpio,
        comuna: comuna.trim(),
        rol: "user",
      },
    ]);

    if (dbError) {
      alert("Usuario creado en Auth, pero error al guardar perfil: " + dbError.message);
      return;
    }

    alert("Usuario registrado correctamente.");

    setNombre("");
    setEmail("");
    setPassword("");
    setComuna("");
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] px-6 md:px-10 py-10 text-gray-900">
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
            Crear cuenta
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Regístrate en ReUsa para publicar materiales, solicitar productos
            disponibles y coordinar el retiro con otros usuarios.
          </p>
        </div>

        <form
          onSubmit={handleRegistro}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            Registro de usuario
          </h2>

          <div className="mb-5">
            <label className="block font-semibold mb-2">Nombre completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

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
              placeholder="Mínimo 6 caracteres"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Comuna</label>
            <input
              type="text"
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              placeholder="Ej: Ñuñoa"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Crear cuenta
          </button>

          <p className="text-center text-gray-600 mt-5">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-purple-600 font-bold hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}