"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; // NUEVO: Importamos useRouter

export default function AdminPage() {
  const router = useRouter(); // NUEVO: Inicializamos el router
  const [cargandoAuth, setCargandoAuth] = useState(true); // NUEVO: Estado para la verificación

  const [pestana, setPestana] = useState("productos");
  const [productos, setProductos] = useState([]);
  const [centros, setCentros] = useState([]);
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    // NUEVO: Envolvemos la carga en una validación de seguridad
    const verificarAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login"); // Si no hay sesión, al login
        return;
      }

      const { data: perfil } = await supabase
        .from("profiles")
        .select("rol")
        .eq("email", session.user.email)
        .single();

      if (perfil?.rol !== "admin") {
        router.push("/"); // Si es un usuario normal, lo devolvemos al inicio
        return;
      }

      // Si pasa la validación (es admin), cargamos los datos y quitamos la pantalla de carga
      await cargarDatos();
      setCargandoAuth(false);
    };

    verificarAdmin();
  }, [router]); // NUEVO: Dependencia del router

  const cargarDatos = async () => {
    const { data: productosData } = await supabase.from("productos").select("*");
    const { data: centrosData } = await supabase.from("centros").select("*");
    const { data: formulariosData } = await supabase.from("formularios").select("*");

    setProductos(productosData || []);
    setCentros(centrosData || []);
    setFormularios(formulariosData || []);
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta publicación?");
    if (!confirmar) return;

    await supabase.from("productos").delete().eq("id", id);
    setProductos(productos.filter((p) => p.id !== id));
  };

  // NUEVO: Mostramos esto mientras Supabase revisa si es admin o no
  if (cargandoAuth) {
    return (
      <main className="min-h-screen bg-[#f5f7f5] flex items-center justify-center p-6">
        <p className="text-xl font-semibold text-purple-700">Verificando credenciales...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f5] p-6 md:p-10 text-gray-900">
      <h1 className="text-4xl font-bold text-purple-700 mb-3">
        Panel de Administrador 
      </h1>

      <p className="text-gray-600 mb-8">
        Desde aquí puedes revisar publicaciones, centros de acopio y formularios recibidos.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setPestana("productos")}
          className={`px-5 py-2 rounded-lg font-semibold ${
            pestana === "productos"
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-600 border border-purple-600"
          }`}
        >
          Publicaciones
        </button>

        <button
          onClick={() => setPestana("centros")}
          className={`px-5 py-2 rounded-lg font-semibold ${
            pestana === "centros"
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-600 border border-purple-600"
          }`}
        >
          Centros de acopio
        </button>

        <button
          onClick={() => setPestana("formularios")}
          className={`px-5 py-2 rounded-lg font-semibold ${
            pestana === "formularios"
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-600 border border-purple-600"
          }`}
        >
          Formularios
        </button>
      </div>

      {pestana === "productos" && (
        <section className="grid gap-6">
          {productos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
              Aún no hay publicaciones registradas.
            </div>
          ) : (
            productos.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold text-purple-600">{p.nombre}</h2>
                  <p><strong>Tipo:</strong> {p.tipo}</p>
                  <p><strong>Estado:</strong> {p.estado}</p>
                </div>

                <button
                  onClick={() => eliminarProducto(p.id)}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 w-full md:w-auto"
                >
                  Eliminar publicación
                </button>
              </div>
            ))
          )}
        </section>
      )}

      {pestana === "centros" && (
        <section>
          <button
            onClick={() => alert("Función para agregar centros en desarrollo.")}
            className="mb-6 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            + Agregar nuevo centro
          </button>

          <div className="grid gap-6">
            {centros.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
                Aún no hay centros de acopio registrados.
              </div>
            ) : (
              centros.map((c) => (
                <div key={c.id} className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-purple-600">{c.nombre}</h2>
                  <p><strong>Tipo:</strong> {c.tipo}</p>
                  <p><strong>Dirección:</strong> {c.direccion}</p>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {pestana === "formularios" && (
        <section className="grid gap-6">
          {formularios.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
              Aún no hay formularios recibidos.
            </div>
          ) : (
            formularios.map((f) => (
              <div key={f.id} className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-purple-600">{f.nombre}</h2>
                <p><strong>Correo:</strong> {f.email}</p>
                <p className="mt-2"><strong>Mensaje:</strong> {f.mensaje}</p>

                <button
                  onClick={() => alert("Vista de detalle y respuesta en desarrollo.")}
                  className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Ver detalle / Responder
                </button>
              </div>
            ))
          )}
        </section>
      )}
    </main>
  );
}