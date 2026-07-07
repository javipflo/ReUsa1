"use client";
import { useEffect, useRef } from "react";
import Talk from "talkjs";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ChatPage() {
  const { productoId } = useParams();
  const chatboxRef = useRef(null);

  useEffect(() => {
    const initChat = async () => {
      // Obtenemos solo el usuario, no buscamos en conversaciones
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await Talk.ready;
      
      const me = new Talk.User({
        id: user.id,
        name: user.email,
      });

      const session = new Talk.Session({
        appId: "tNmopj3a", // Tu ID correcto
        me: me,
      });

      // Creamos o seleccionamos la conversación basada en el ID del producto
      const conversation = session.getOrCreateConversation(`prod_${productoId}`);
      
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxRef.current);
    };

    initChat();
  }, [productoId]);

  return (
    <main className="min-h-screen bg-[#e6fcf0] p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-3xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Chat sobre el producto</h2>
        <div ref={chatboxRef} style={{ height: "60vh", width: "100%" }} />
      </div>
    </main>
  );
}