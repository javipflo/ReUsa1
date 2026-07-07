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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await Talk.ready;
      
      const me = new Talk.User({
        id: user.id,
        name: user.email, // O puedes buscar su nombre en tu tabla profiles
      });

      const session = new Talk.Session({
        appId: "tNmopj3a",
        me: me,
      });

      const conversation = session.getOrCreateConversation(`prod_${productoId}`);
      
      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxRef.current);
    };

    initChat();
  }, [productoId]);

  return <div ref={chatboxRef} style={{ height: "70vh", width: "100%" }} />;
}