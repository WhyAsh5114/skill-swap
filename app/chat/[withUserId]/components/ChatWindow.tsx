"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Message } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { getNewMessages, sendMessageAction } from "./actions";
import SendButton from "./SendButton";

type PropsType = {
  toUserId: string;
  allMessages: Message[];
};

export default function ChatWindow({ toUserId, allMessages }: PropsType) {
  const [messages, setMessages] = useState<Message[]>(allMessages);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef(messages);

  async function sendMessage() {
    await sendMessageAction(message, toUserId);
    setMessage("");
  }

  useEffect(() => {
    async function fetchNewMessages() {
      const lastMessage = messagesRef.current.at(-1);
      const newMessages = await getNewMessages(
        Number(lastMessage?.createdAt ?? 0),
        toUserId
      );
      if (newMessages.length === 0) return;

      setMessages((previousMessages) => previousMessages.concat(newMessages));
    }

    const intervalId = setInterval(fetchNewMessages, 1000);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    return () => clearInterval(intervalId);
  }, [toUserId]);

  useEffect(() => {
    messagesRef.current = messages;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex h-px grow flex-col overflow-y-auto my-4 gap-2">
        {messages.map((message, idx) => {
          if (message.fromUserId === toUserId) {
            return (
              <Badge
                key={idx}
                className="mr-auto max-w-64 text-sm font-medium"
                variant="outline"
              >
                {message.text}
              </Badge>
            );
          } else {
            return (
              <Badge key={idx} className="ml-auto max-w-64 text-sm font-medium">
                {message.text}
              </Badge>
            );
          }
        })}
        <div ref={bottomRef} />
      </div>
      <form className="flex gap-1" action={sendMessage}>
        <Input
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton />
      </form>
    </>
  );
}
