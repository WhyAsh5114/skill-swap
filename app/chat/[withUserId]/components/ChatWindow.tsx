"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { sendMessageAction } from "./actions";
import type { Message } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { LoaderCircle, SendHorizontal } from "lucide-react";

type PropsType = {
  toUserId: string;
  allMessages: Message[];
};

export default function ChatWindow({ toUserId, allMessages }: PropsType) {
  const [messages, setMessages] = useState<Message[]>(allMessages);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [sending, setSending] = useState(false);

  async function sendMessage() {
    setSending(true);
    const sentMessage = await sendMessageAction(message, toUserId);
    setMessage("");
    setSending(false);
    setMessages([...messages, sentMessage]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/chat/${toUserId}?lastMessageAt=${Number(
            messages.at(-1)?.createdAt
          )}`
        );
        const result = await response.json();
        setMessages([...messages, ...result]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
      <form
        className="flex gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <Input
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" className="gap-2" disabled={sending}>
          {sending ? <LoaderCircle className="animate-spin h-6 w-6" /> : "Send"}
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
}
