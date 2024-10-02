"use client";

import { Button } from "@/components/ui/button";
import {
  LoaderCircle,
  UserRoundCheck,
  UserRoundCog,
  UserRoundPlus,
} from "lucide-react";
import { sendConnectionRequest } from "./actions";
import { useState } from "react";
import type { Prisma } from "@prisma/client";
import { User } from "lucia";

type PropsType = {
  viewingUser: Prisma.UserGetPayload<{
    include: { connections: true; receivedRequests: true };
  }>;
  user: User;
};

export default function AddConnectionButton({ viewingUser, user }: PropsType) {
  const [adding, setAdding] = useState(false);

  const [requestSent, setRequestSent] = useState(
    viewingUser.receivedRequests.some(
      (request) => request.fromUserId === user.id
    )
  );
  const isConnection = viewingUser.connections.some(
    (connection) => connection.id === user.id
  );

  async function addConnection() {
    setAdding(true);
    await sendConnectionRequest(viewingUser.id);
    setAdding(false);
    setRequestSent(true);
  }

  if (isConnection) {
    return (
      <Button className="ml-auto gap-2" disabled>
        Connected
        <UserRoundCheck className="h-4 w-4" />
      </Button>
    );
  }

  if (requestSent) {
    return (
      <Button className="ml-auto gap-2" disabled>
        Request sent
        <UserRoundCog className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button className="ml-auto gap-2" onClick={addConnection} disabled={adding}>
      {adding ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          Add
          <UserRoundPlus className="h-4 w-4" />
        </>
      )}
    </Button>
  );
}