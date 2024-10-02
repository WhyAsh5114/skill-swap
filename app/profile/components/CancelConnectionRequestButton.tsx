"use client";

import { Button } from "@/components/ui/button";
import { UserRoundX } from "lucide-react";
import { useState } from "react";
import { cancelConnectionRequest } from "./actions";

export default function CancelConnectionRequestButton({
  toUserId,
}: {
  toUserId: string;
}) {
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  async function cancelConnection() {
    setCancelling(true);
    await cancelConnectionRequest(toUserId);
    setCancelling(false);
    setCancelled(true);
  }

  if (cancelled) {
    return (
      <Button className="gap-2 w-28" disabled variant="outline">
        <span className="grow text-center">Cancelled</span>
      </Button>
    );
  }

  return (
    <Button
      className="gap-2 w-28"
      disabled={cancelling}
      variant="outline"
      onClick={cancelConnection}
    >
      <span className="grow text-center">Cancel</span>
      <UserRoundX className="h-4 w-4" />
    </Button>
  );
}
