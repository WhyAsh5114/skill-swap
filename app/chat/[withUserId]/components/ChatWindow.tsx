"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Message } from "@prisma/client";
import { CirclePlus, File } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getNewMessages, sendMessageAction } from "./actions";
import SendButton from "./SendButton";
import { User } from "lucia";

type PropsType = {
  toUserId: string;
  allMessages: Omit<Message, "file">[];
  user: User;
};

export default function ChatWindow({ toUserId, allMessages, user }: PropsType) {
  const [messages, setMessages] =
    useState<Omit<Message, "file">[]>(allMessages);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File>();

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef(messages);

  function downloadFile(filename: string, createdAt: Number | Date) {
    const downloadUrl = `/api/downloadFile?fromUserId=${
      user.id
    }&toUserId=${toUserId}&createdAt=${Number(createdAt)}`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function sendMessage() {
    await sendMessageAction(message, toUserId, file);
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

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setFile(e.target.files[0]);
  }

  return (
    <>
      <div className="flex h-px grow flex-col overflow-y-auto my-4 gap-2">
        {messages.map((message, idx) => (
          <Badge
            key={idx}
            variant={message.fromUserId === toUserId ? "outline" : "default"}
            className={`${
              message.fromUserId === toUserId ? "mr-auto" : "ml-auto"
            } max-w-64 text-sm font-medium flex flex-col`}
          >
            <span className="w-full">{message.text}</span>
            {message.filename ? (
              <Button
                className="flex items-center gap-1 border my-1 p-2 rounded-lg"
                onClick={() =>
                  downloadFile(message.filename!, message.createdAt)
                }
              >
                <File className="h-4 w-4" />
                {message.filename}
              </Button>
            ) : (
              <></>
            )}
          </Badge>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="w-12" size="icon">
              <CirclePlus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex flex-col w-64 gap-2 text-sm"
          >
            <span className="font-light">
              Selected: <span className="font-semibold">{file?.name}</span>
            </span>
            <Input
              id="attachment"
              type="file"
              className="bg-background"
              onChange={handleFileChange}
            />
          </PopoverContent>
        </Popover>
        <form className="contents" action={sendMessage}>
          <Input
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton outerDisable={message === "" && file === undefined} />
        </form>
      </div>
    </>
  );
}
