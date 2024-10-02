import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Link from "next/link";
import AcceptConnectionRequestButton from "./AcceptConnectionRequestButton";
import CancelConnectionRequestButton from "./CancelConnectionRequestButton";
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
              <CancelConnectionRequestButton toUserId={sentRequest.toUserId} />
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
              <AcceptConnectionRequestButton
                fromUserId={receivedRequests.fromUserId}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
