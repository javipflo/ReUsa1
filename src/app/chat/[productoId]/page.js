"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ChatPage() {
  const { productoId } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [input, setInput] = useState("");
  const [conversacion, setConversacion] = useState(null);
  const [producto, setProducto] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUsuarioActual(user);

      const { data: prod } = await supabase.from("productos").select("nombre").eq("id", productoId).single();
      setProducto(prod);

      const { data: conv } = await supabase
        .from("conversaciones")
        .select("*")
        .eq("producto_id", productoId)
        .maybeSingle(); // Usamos maybeSingle para evitar errores si no existe

      if (conv) {
        setConversacion(conv);
        const { data: msg } = await supabase
          .from("mensajes")
          .select("*")
          .eq("conversacion_id", conv.id)
          .order("created_at", { ascending: true });
        setMensajes(msg || []);
      }
    };
    initChat();
  }, [productoId]);

  const enviarMensaje = async () => {
    if (!input.trim() || !usuarioActual) return;
    
    let convId = conversacion?.id;

    // Si no hay chat, intentamos crearlo
    if (!convId) {
      const { data: nuevaConv, error } = await supabase
        .from("conversaciones")
        .insert([{ producto_id: productoId, usuario1_id: usuarioActual.id }])
        .select()
        .single();
        
      if (error) {
        console.error("Error al crear:", error);
        alert("Error al iniciar el chat. Verifica si RLS está desactivado.");
        return;
      }
      convId = nuevaConv.id;
      setConversacion(nuevaConv);
    }

    const { error } = await supabase.from("mensajes").insert([
      { conversacion_id: convId, sender_id: usuarioActual.id, contenido: input }
    ]);
    
    if (!error) setInput("");
  };

  return (
    // Fondo claro con contenedor central blanco para el chat
    <main className="min-h-screen bg-[#e6fcf0] p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 font-bold text-lg text-purple-700 text-center">
          Chat sobre: {producto?.nombre || "Cargando..."}
        </div>

        {/* Chat con fondo blanco */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-4 h-[60vh] overflow-y-auto border border-gray-100">
          {mensajes.length === 0 && <p className="text-gray-400 text-center">No hay mensajes aún. ¡Saluda!</p>}
          {mensajes.map((m) => (
            <div key={m.id} className={`mb-4 ${m.sender_id === usuarioActual?.id ? "text-right" : "text-left"}`}>
              <p className={`inline-block p-3 rounded-2xl ${m.sender_id === usuarioActual?.id ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                {m.contenido}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="flex-1 p-3 rounded-xl outline-none" 
            placeholder="Escribe un mensaje..." 
          />
          <button onClick={enviarMensaje} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition">
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}