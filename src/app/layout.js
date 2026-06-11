"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    obtenerSesion();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      obtenerSesion();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const obtenerSesion = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setUsuario(null);
      return;
    }

    const { data: perfil, error } = await supabase
      .from("profiles")
      .select("nombre, rol")
      .eq("email", session.user.email)
      .single();

    if (error) {
      console.log("Error al cargar perfil:", error.message);
      setUsuario(null);
      return;
    }

    setUsuario(perfil);
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    router.push("/");
  };

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Explorar", href: "/explorar" },
    { name: "Publicar", href: "/publicar" },
    { name: "Centros cercanos", href: "/centros" },
    { name: "Cómo funciona", href: "/como-funciona" },
  ];

  return (
    <html lang="es">
      <body className="bg-[#f5f7f5] text-gray-900">
        <header className="bg-white shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-10 py-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo-reusa.png" alt="Logo ReUsa" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-blue-600">Re</span>
                  <span className="text-purple-600">Usa</span>
                </h1>
                <p className="text-sm text-gray-500">Conecta y Recicla</p>
              </div>
            </Link>

            <nav className="flex flex-wrap justify-center gap-5 md:gap-7 text-purple-600 font-medium">
              {menuItems.map(
                (item) =>
                  pathname !== item.href && (
                    <Link key={item.href} href={item.href} className="hover:text-purple-800">
                      {item.name}
                    </Link>
                  )
              )}

              {usuario?.rol === "admin" && pathname !== "/admin" && (
                <Link href="/admin" className="hover:text-purple-800">
                  Panel admin
                </Link>
              )}

              {usuario && pathname !== "/perfil" && (
                <Link href="/perfil" className="hover:text-purple-800">
                  Perfil
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-2">
              {usuario ? (
                <>
                  <span className="font-semibold text-purple-700">
                    👤 {usuario.nombre}
                  </span>

                  <button
                    onClick={cerrarSesion}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Iniciar sesión
                  </Link>

                  <Link
                    href="/registro"
                    className="bg-white border border-green-600 text-green-600 px-5 py-2 rounded-lg font-semibold hover:bg-green-50"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}