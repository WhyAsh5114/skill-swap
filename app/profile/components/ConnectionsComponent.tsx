import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInitials } from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import { UserRoundX } from "lucide-react";
import Link from "next/link";
import AcceptConnectionButton from "./AcceptConnectionButton";
import ChatButton from "./ChatButton";

type PropsType = {
  userData: Prisma.UserGetPayload<{
    include: {
      connections: true;
      connectionOf: true;
      sentRequests: { include: { toUser: true } };
      receivedRequests: { include: { fromUser: true } };
    };
  }>;
};

export default function ConnectionsComponent({ userData }: PropsType) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2}>User</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.connections
          .concat(userData.connectionOf)
          .map((connection) => (
            <TableRow key={connection.id}>
              <TableCell>
                <Link href={`/view-profile/${connection.id}`}>
                  <Avatar>
                    <AvatarImage src={connection.profilePicture ?? ""} />
                    <AvatarFallback>
                      {getInitials(connection.username)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </TableCell>
              <TableCell>{connection.username}</TableCell>
              <TableCell className="text-right">
                <ChatButton withUserId={connection.id} />
              </TableCell>
            </TableRow>
          ))}
        {userData.sentRequests.map((sentRequest) => (
          <TableRow key={sentRequest.toUserId}>
            <TableCell>
              <Link href={`/view-profile/${sentRequest.toUser.id}`}>
                <Avatar>
                  <AvatarImage src={sentRequest.toUser.profilePicture ?? ""} />
                  <AvatarFallback>
                    {getInitials(sentRequest.toUser.username)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </TableCell>
            <TableCell>{sentRequest.toUser.username}</TableCell>
            <TableCell className="text-right">
              <Button className="gap-2 w-28" variant="outline">
                <span className="grow text-center">Cancel</span>{" "}
                <UserRoundX className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {userData.receivedRequests.map((receivedRequests) => (
          <TableRow key={receivedRequests.fromUserId}>
            <TableCell>
              <Link href={`/view-profile/${receivedRequests.fromUser.id}`}>
                <Avatar>
                  <AvatarImage
                    src={receivedRequests.fromUser.profilePicture ?? ""}
                  />
                  <AvatarFallback>
                    {getInitials(receivedRequests.fromUser.username)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </TableCell>
            <TableCell>{receivedRequests.fromUser.username}</TableCell>
            <TableCell className="text-right">
              <AcceptConnectionButton
                fromUserId={receivedRequests.fromUserId}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
