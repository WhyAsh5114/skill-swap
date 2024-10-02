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
import Link from "next/link";
import { redirect } from "next/navigation";

export async function UsersTable() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");
  const users = await prisma.user.findMany({
    include: { knownSkills: true, wantedSkills: true },
    where: { id: { not: user.id } },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2}>User</TableHead>
          <TableHead className="w-28">Known</TableHead>
          <TableHead className="w-28">Wanted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.username}>
            <TableCell>
              <Link href={`/view-profile/${user.id}`}>
                <Avatar>
                  <AvatarImage src={user.profilePicture ?? ""} />
                  <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                </Avatar>
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/view-profile/${user.id}`}>{user.username}</Link>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {user.knownSkills.map((skill) => (
                  <Badge key={skill.skillName}>{skill.skillName}</Badge>
                ))}
                {user.knownSkills.length === 0 ? (
                  <Badge variant="outline">None</Badge>
                ) : (
                  <></>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {user.wantedSkills.map((skill) => (
                  <Badge key={skill.skillName}>{skill.skillName}</Badge>
                ))}
                {user.wantedSkills.length === 0 ? (
                  <Badge variant="outline">None</Badge>
                ) : (
                  <></>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
