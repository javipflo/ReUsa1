"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Perfil() {
  const [activeTab, setActiveTab] = useState("datos");
  const [items, setItems] = useState([]);
  const [chats, setChats] = useState([]);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (activeTab === "publicaciones" || activeTab === "solicitados") {
        let query = activeTab === "publicaciones" 
          ? supabase.from("productos").select("*").eq("usuario_id", user.id)
          : supabase.from("productos").select("*").eq("solicitante_id", user.id);
        const { data } = await query;
        setItems(data || []);
      } else if (activeTab === "chats") {
        const { data } = await supabase
          .from("conversaciones")
          .select(`id, producto:producto_id (nombre, imagen_url)`)
          .or(`usuario1_id.eq.${user.id},usuario2_id.eq.${user.id}`);
        setChats(data || []);
      }
    };
    fetchData();
  }, [activeTab]);

  const actualizarEstado = async (id, nuevoEstado, removerSolicitante = false) => {
    const updateData = { estado: nuevoEstado };
    if (removerSolicitante) updateData.solicitante_id = null;
    await supabase.from("productos").update(updateData).eq("id", id);
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-[#e6fcf0] p-6 md:p-10">
      {/* Header Perfil */}
      <div className="bg-white p-8 rounded-3xl shadow-sm text-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">usuario</h1>
        <p className="text-green-600 font-bold tracking-wide uppercase text-sm">USER</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {["datos", "publicaciones", "solicitados", "chats"].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-6 py-2.5 rounded-full font-semibold transition-all ${activeTab === tab ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm max-w-4xl mx-auto min-h-[300px]">
        
        {activeTab === 'datos' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Mis Datos Personales</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Nombre</label>
                <input type="text" disabled={!editando} className="border border-gray-200 p-3 w-full rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 transition" defaultValue="usuario1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Correo electrónico</label>
                <input type="email" disabled={!editando} className="border border-gray-200 p-3 w-full rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-green-500 transition" defaultValue="usuario1@example.com" />
              </div>
              <button 
                onClick={() => setEditando(!editando)} 
                className={`w-full py-3 rounded-xl font-bold transition ${editando ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {editando ? "Guardar cambios" : "Editar Perfil"}
              </button>
            </div>
            <button onClick={async () => {
              const email = prompt("Ingresa tu correo para restablecer contraseña:");
              if(email) { await supabase.auth.resetPasswordForEmail(email); alert("Correo de recuperación enviado."); }
            }} className="mt-6 text-red-500 underline text-sm hover:text-red-700">¿Olvidaste tu contraseña?</button>
          </div>
        )}

        {(activeTab === 'publicaciones' || activeTab === 'solicitados') && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-800">{activeTab === 'publicaciones' ? 'Mis Publicaciones' : 'Productos Solicitados'}</h2>
            {items.map(p => (
              <div key={p.id} className="border-b border-gray-100 py-5 flex justify-between items-center">
                <span className="font-medium text-gray-700">{p.nombre} - <span className="font-bold text-green-600 ml-1">{p.estado}</span></span>
                {activeTab === 'publicaciones' && p.estado === 'Reservado' && (
                  <div className="flex gap-2">
                    <button onClick={() => actualizarEstado(p.id, 'Disponible', true)} className="bg-yellow-50 text-yellow-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-yellow-100">Re-publicar</button>
                    <button onClick={() => actualizarEstado(p.id, 'Entregado')} className="bg-green-50 text-green-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-green-100">Completado</button>
                  </div>
                )}
                {activeTab === 'solicitados' && p.estado === 'Reservado' && (
                  <button onClick={() => actualizarEstado(p.id, 'Disponible', true)} className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-100">Anular</button>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chats' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-gray-800">Mis Chats</h2>
            {chats.length > 0 ? (
              <div className="grid gap-3">
                {chats.map((chat) => (
                  <Link href={`/chat/${chat.id}`} key={chat.id} className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 hover:bg-gray-100 transition border border-gray-100">
                    <div className="w-14 h-14 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                      {chat.producto?.imagen_url && <img src={chat.producto.imagen_url} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{chat.producto?.nombre}</h3>
                      <p className="text-sm text-gray-500">Haz clic para continuar la conversación</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <p>Aún no hay chats disponibles</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}