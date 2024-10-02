"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { acceptConnectionAction } from "./actions";
import ChatButton from "./ChatButton";

export default function AcceptConnectionButton({
  fromUserId,
}: {
  fromUserId: string;
}) {
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  async function acceptConnection() {
    setAccepting(true);
    await acceptConnectionAction(fromUserId);
    setAccepting(false);
    setAccepted(true);
  }

  if (accepted) {
    return <ChatButton withUserId={fromUserId} />;
  }

  return (
    <Button
      disabled={accepting}
      onClick={acceptConnection}
      variant="outline"
      className="gap-2"
    >
      Accept
      <UserRoundCheck className="h-4 w-4" />
    </Button>
  );
}
