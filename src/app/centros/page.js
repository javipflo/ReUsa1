"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const centrosEjemplo = [
  {
    id: "ejemplo-1",
    nombre: "CESFAM Salvador Bustos",
    tipo: "Vidrio",
    direccion: "Av. Grecia 3980, Ñuñoa",
    horario: "Lunes a jueves de 8:00 a 20:00 hrs, viernes hasta las 19:00 hrs.",
    materiales: "Botellas, frascos y envases de vidrio de uso doméstico.",
    prohibicion: "No depositar vidrios planos, espejos, ampolletas, loza o cerámica.",
  },
  {
    id: "ejemplo-2",
    nombre: "JVV Villa Olímpica",
    tipo: "Vidrio",
    direccion: "Sócrates 1237, Ñuñoa",
    horario: "Contenedor disponible las 24 horas.",
    materiales: "Botellas, frascos y envases de vidrio de uso doméstico.",
    prohibicion: "No depositar vidrios planos, espejos, ampolletas, loza o cerámica.",
  },
  {
    id: "ejemplo-3",
    nombre: "JVV Villa Yugoslavia",
    tipo: "Vidrio",
    direccion: "Bolsón Suárez Mujica, Ñuñoa",
    horario: "Contenedor disponible las 24 horas.",
    materiales: "Botellas, frascos y envases de vidrio de uso doméstico.",
    prohibicion: "No depositar vidrios planos, espejos, ampolletas, loza o cerámica.",
  },
  {
    id: "ejemplo-4",
    nombre: "Polideportivo de Ñuñoa",
    tipo: "Cartón y latas",
    direccion: "Juan Moya Morales 1370, Ñuñoa",
    horario: "Disponible entre 10:00 y 14:00 hrs o hasta las 19:00 hrs según disponibilidad.",
    materiales: "Cartón desarmado, aplastado o cortado. También latas limpias y aplastadas.",
    prohibicion: "No deben tener restos de comida, grasa o líquidos. Las latas deben estar limpias.",
  },
];

export default function Centros() {
  const [listaCentros, setListaCentros] = useState([]);
  const [esAdmin, setEsAdmin] = useState(false);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formulario, setFormulario] = useState({
    id: null,
    nombre: "",
    tipo: "",
    direccion: "",
    horario: "",
    materiales: "",
    prohibicion: "",
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: perfil } = await supabase
        .from("profiles")
        .select("rol")
        .eq("email", session.user.email)
        .maybeSingle();

      if (perfil?.rol === "admin") {
        setEsAdmin(true);
      }
    }

    const { data, error } = await supabase.from("centros").select("*");
    if (error || !data || data.length === 0) {
      setListaCentros(centrosEjemplo);
    } else {
      setListaCentros(data);
    }
  };

  const handleAñadirCentro = () => {
    setModoEdicion(false);
    setFormulario({ id: null, nombre: "", tipo: "", direccion: "", horario: "", materiales: "", prohibicion: "" });
    setMostrarModal(true);
  };

  const handleEditarCentro = (centro) => {
    if (String(centro.id).startsWith("ejemplo")) {
      alert("No puedes editar un centro de ejemplo estático. Por favor, crea uno nuevo primero.");
      return;
    }
    setModoEdicion(true);
    setFormulario(centro);
    setMostrarModal(true);
  };

  const handleEliminarCentro = async (id, nombre) => {
    if (String(id).startsWith("ejemplo")) {
      alert("No puedes eliminar un centro de ejemplo estático.");
      return;
    }

    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el centro "${nombre}"?`);
    if (!confirmar) return;

    const { error } = await supabase.from("centros").delete().eq("id", id);
    if (error) {
      alert("Error al intentar eliminar el centro.");
      console.error(error);
      return;
    }

    setListaCentros(listaCentros.filter((c) => c.id !== id));
    alert("Centro eliminado correctamente.");
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();

    if (modoEdicion) {
      const { error } = await supabase
        .from("centros")
        .update({
          nombre: formulario.nombre,
          tipo: formulario.tipo,
          direccion: formulario.direccion,
          horario: formulario.horario,
          materiales: formulario.materiales,
          prohibicion: formulario.prohibicion,
        })
        .eq("id", formulario.id);

      if (error) {
        alert("Error al actualizar el centro.");
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("centros")
        .insert([{
          nombre: formulario.nombre,
          tipo: formulario.tipo,
          direccion: formulario.direccion,
          horario: formulario.horario,
          materiales: formulario.materiales,
          prohibicion: formulario.prohibicion,
        }]);

      if (error) {
        alert("Error al crear el nuevo centro.");
        console.error(error);
        return;
      }
    }

    setMostrarModal(false);
    cargarDatos();
  };

  return (
    <main className="min-h-screen bg-[#f5f7f5] text-gray-900 px-6 md:px-10 py-10 relative">
      <section className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
              Centros cercanos 
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl">
              En la versión actual, ReUsa se enfoca sólo en la comuna de Ñuñoa.
              Aquí puedes revisar algunos puntos de acopio disponibles para
              materiales como vidrio, cartón y latas. Y si buscas opciones para otros materiales, puedes revisar en el mapa.
            </p>
          </div>

          {esAdmin && (
            <button 
              onClick={handleAñadirCentro}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 shadow-md whitespace-nowrap transition-colors"
            >
              + Añadir nuevo centro
            </button>
          )}
        </div>

      {/* --- BANNER DEL MAPA (Ajustado) --- */}
        <div className="mb-10 mx-auto max-w-4xl rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <a
            href="https://www.google.com/maps/d/u/1/viewer?hl=es&mid=10husxo5PgyvIchlhNMJuGbNobIMcMqE&ll=-33.455784856490396%2C-70.59476382502217&z=14"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="/mapa-nunoa.png"
              alt="Mapa de centros"
              className="w-full h-auto max-h-[200px] object-cover block"
            />
          </a>
        </div>
        {/* --- FIN DEL BANNER --- */}


        {/* --- FIN DEL BANNER --- */}

        <div className="grid md:grid-cols-2 gap-6">
          {listaCentros.map((centro, index) => (
            <div
              key={centro.id || index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600">
                      {centro.nombre}
                    </h2>
                    <p className="text-green-600 font-semibold mt-1">
                      ♻️ {centro.tipo}
                    </p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Ñuñoa
                  </span>
                </div>

                <div className="space-y-3 text-gray-700 mb-6">
                  <p><strong> Dirección:</strong> {centro.direccion}</p>
                  <p><strong> Horario:</strong> {centro.horario}</p>
                  <p><strong> Materiales aceptados:</strong> {centro.materiales}</p>
                  <p><strong> Restricciones:</strong> {centro.prohibicion}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centro.direccion + ', Ñuñoa')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Ver ubicación
                </a>

                <a
                  href="https://www.nunoa.cl/puntos-de-reciclaje-en-nunoa-informate-y-recicla-con-el-corazon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center border border-purple-600 text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center"
                >
                  Ver información
                </a>
                
                {esAdmin && (
                  <div className="w-full flex gap-3 mt-2 border-t pt-4">
                    <button 
                      onClick={() => handleEditarCentro(centro)}
                      className="flex-1 border-2 border-purple-600 text-purple-600 px-3 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleEliminarCentro(centro.id, centro.nombre)}
                      className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b flex justify-between items-center bg-purple-50">
              <h2 className="text-2xl font-bold text-purple-700">
                {modoEdicion ? "Editar Centro de Acopio" : "Añadir Nuevo Centro"}
              </h2>
              <button 
                onClick={() => setMostrarModal(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleGuardarCambios} className="p-6 overflow-y-auto flex-1">
              <div className="grid gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Nombre del Centro</label>
                  <input required type="text" value={formulario.nombre} onChange={(e) => setFormulario({...formulario, nombre: e.target.value})} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ej: CESFAM Salvador Bustos" />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Tipo de material (Etiqueta)</label>
                  <input required type="text" value={formulario.tipo} onChange={(e) => setFormulario({...formulario, tipo: e.target.value})} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ej: Vidrio, Cartón, Latas" />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Dirección</label>
                  <input required type="text" value={formulario.direccion} onChange={(e) => setFormulario({...formulario, direccion: e.target.value})} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ej: Av. Grecia 3980, Ñuñoa" />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Horario</label>
                  <input required type="text" value={formulario.horario} onChange={(e) => setFormulario({...formulario, horario: e.target.value})} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ej: Lunes a viernes de 9:00 a 18:00 hrs." />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Materiales Aceptados</label>
                  <textarea required value={formulario.materiales} onChange={(e) => setFormulario({...formulario, materiales: e.target.value})} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20" placeholder="Describe los materiales específicos..." />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Restricciones / Prohibiciones</label>
                  <textarea required value={formulario.prohibicion} onChange={(e) => setFormulario({...formulario, prohibicion: e.target.value})} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20" placeholder="Ej: No depositar vidrios planos o rotos..." />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setMostrarModal(false)} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300">
                  Cancelar
                </button>
                <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">
                  {modoEdicion ? "Guardar Cambios" : "Crear Centro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}