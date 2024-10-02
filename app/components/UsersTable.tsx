import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { getInitials } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function UsersTable() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");
  const users = await prisma.user.findMany({
    include: { skills: true },
    where: { id: { not: user.id } },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2}>
            User
          </TableHead>
          <TableHead className="w-40">Skills</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.username}>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.profilePicture ?? ""} />
                <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell className="flex flex-wrap gap-1">
              {user.skills.map((skill) => (
                <Badge key={skill.skillName}>{skill.skillName}</Badge>
              ))}
              {user.skills.length === 0 ? (
                <Badge variant="outline">None</Badge>
              ) : (
                <></>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
