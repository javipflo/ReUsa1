"use client";
import { useEffect, useState } from "react";
import Talk from "talkjs";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ChatPage() {
  const { productoId } = useParams();
  const [isTalkLoaded, setIsTalkLoaded] = useState(false);

  useEffect(() => {
    // Aseguramos que Talk esté listo
    Talk.ready.then(() => setIsTalkLoaded(true));
  }, []);

  useEffect(() => {
    if (!isTalkLoaded || !productoId) return;

    const initChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const me = new Talk.User({ id: user.id, name: user.email });
      const session = new Talk.Session({ appId: "tNmopj3a", me: me });

      const conversation = session.getOrCreateConversation(`prod_${productoId}`);
      conversation.setParticipant(me);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(document.getElementById("talkjs-container"));
    };

    initChat();
  }, [isTalkLoaded, productoId]);

  return (
    <main className="min-h-screen bg-[#e6fcf0] p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-3xl shadow-sm">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Chat sobre el producto</h2>
        {/* Usamos un ID fijo en lugar de ref para asegurar el montaje */}
        <div id="talkjs-container" style={{ height: "60vh", width: "100%" }} />
      </div>
    </main>
  );
}