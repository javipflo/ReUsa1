"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    obtenerSesion();
    const { data: listener } = supabase.auth.onAuthStateChange(() => obtenerSesion());
    return () => listener.subscription.unsubscribe();
  }, []);

  const obtenerSesion = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setUsuario(null); return; }
    const { data: perfil } = await supabase
      .from("profiles")
      .select("nombre, rol, email")
      .eq("email", session.user.email)
      .maybeSingle();
    setUsuario(perfil);
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setMenuAbierto(false);
    setMenuMobile(false);
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
        <header className="bg-white shadow-sm relative z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo-reusa.png" alt="Logo" className="h-12 w-auto" />
            </Link>

            <button className="md:hidden p-2 text-2xl" onClick={() => setMenuMobile(!menuMobile)}>☰</button>

            <nav className="hidden md:flex gap-6 font-medium text-gray-700">
              {menuItems.filter((item) => !(usuario?.rol === "admin" && item.name === "Publicar")).map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-purple-600">{item.name}</Link>
              ))}
            </nav>

            {/* AQUÍ ESTÁ EL MENÚ DESPLEGABLE ORIGINAL */}
            <div className="hidden md:block relative" ref={menuRef}>
              {usuario ? (
                <>
                  <button onClick={() => setMenuAbierto(!menuAbierto)} className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-200 hover:bg-purple-100 transition">
                    <span className="font-semibold text-purple-700">👤 {usuario.nombre}</span>
                    <span className="text-xs text-purple-600">{menuAbierto ? "▲" : "▼"}</span>
                  </button>

                  {/* AQUÍ ESTÁ EL MENÚ DESPLEGABLE ORIGINAL RESTAURADO */}
{menuAbierto && (
  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[9999]">
    <div className="px-4 py-2 border-b border-gray-100 mb-2">
      <p className="font-bold text-sm truncate">{usuario.nombre}</p>
      <p className="text-xs text-gray-500 truncate">{usuario.email}</p>
    </div>

    {usuario.rol === 'admin' ? (
      <Link href="/formularios" onClick={() => setMenuAbierto(false)} className="block px-4 py-2 hover:bg-gray-50 text-purple-700 font-bold">⚙️ Panel Admin</Link>
    ) : (
      <>
        <Link href="/perfil" onClick={() => setMenuAbierto(false)} className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium">👤 Mi Perfil</Link>
       
        <Link href="/contacto" onClick={() => setMenuAbierto(false)} className="block px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium">📧 Contáctanos</Link>
      </>
    )}

    <div className="border-t border-gray-100 mt-2 pt-2">
      <button onClick={cerrarSesion} className="block w-full text-left px-4 py-2 text-red-600 font-bold hover:bg-red-50">Salir</button>
    </div>
  </div>
)}
                </>
              ) : (
                <Link href="/login" className="text-purple-600 font-semibold px-4">Iniciar sesión</Link>
              )}
            </div>
          </div>

          {/* Menú móvil */}
          {menuMobile && (
  <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg">
    {menuItems.map((item) => (
      <Link key={item.href} href={item.href} onClick={() => setMenuMobile(false)} className="font-semibold text-gray-700">{item.name}</Link>
    ))}
    
    {/* AQUÍ MUEVO EL PERFIL AL MENÚ MÓVIL */}
    {usuario ? (
      <div className="border-t pt-4 mt-2">
        <p className="font-bold text-purple-700">👤 {usuario.nombre}</p>
        <Link href="/perfil" onClick={() => setMenuMobile(false)} className="block py-2 text-gray-700">Mi Perfil</Link>
        <button onClick={() => { cerrarSesion(); setMenuMobile(false); }} className="block py-2 text-red-600 font-bold">Salir</button>
      </div>
    ) : (
      <Link href="/login" className="text-purple-600 font-bold">Iniciar sesión</Link>
    )}
  </div>
)}
        </header>
        {children}
      </body>
    </html>
  );
}