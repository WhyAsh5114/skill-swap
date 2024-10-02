"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { sendMessageAction } from "./actions";
import type { Message } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

type PropsType = {
  toUserId: string;
  allMessages: Message[];
};

export default function ChatWindow({ toUserId, allMessages }: PropsType) {
  const [messages, setMessages] = useState<Message[]>(allMessages);
  const [message, setMessage] = useState("");

  async function sendMessage() {
    const sentMessage = await sendMessageAction(message, toUserId);
    setMessage("");
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
      <div className="flex h-px grow flex-col overflow-y-auto my-4 gap-1.5">
        {messages.map((message, idx) => {
          if (message.fromUserId === toUserId) {
            return (
              <Badge key={idx} className="mr-auto max-w-64" variant="outline">
                {message.text}
              </Badge>
            );
          } else {
            return (
              <Badge key={idx} className="ml-auto max-w-64">
                {message.text}
              </Badge>
            );
          }
        })}
      </div>
      <div className="flex gap-1">
        <Input
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </>
  );
}
