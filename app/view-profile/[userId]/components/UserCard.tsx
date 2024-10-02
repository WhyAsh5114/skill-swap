import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { getInitials } from "@/lib/utils";
import AddConnectionButton from "./AddConnectionButton";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

type PropsType = { viewingUserId: string };

export default async function UserCard({ viewingUserId }: PropsType) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const viewingUser = await prisma.user.findUnique({
    where: { id: viewingUserId },
    include: {
      knownSkills: true,
      wantedSkills: true,
      connections: true,
      receivedRequests: true,
      connectionOf: true,
    },
  });
  if (!viewingUser) {
    return (
      <span className="mt-4 font-light">
        <span className="font-semibold">404</span> Profile not found
      </span>
    );
  }

  return (
    <Card className="mt-4 rounded-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={viewingUser.profilePicture ?? ""} />
          <AvatarFallback>{getInitials(viewingUser.username)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle>{viewingUser.username}</CardTitle>
          <CardDescription className="text-sm">
            {viewingUser.id}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm">Known skills</span>
          <div className="flex flex-wrap gap-1">
            {viewingUser.knownSkills.map((skill) => (
              <Badge key={skill.skillName}>{skill.skillName}</Badge>
            ))}
            {viewingUser.knownSkills.length === 0 ? (
              <Badge variant="outline">None</Badge>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <span className="font-medium text-sm">Wanted skills</span>
          <div className="flex flex-wrap gap-1">
            {viewingUser.wantedSkills.map((skill) => (
              <Badge variant="outline" key={skill.skillName}>
                {skill.skillName}
              </Badge>
            ))}
            {viewingUser.wantedSkills.length === 0 ? (
              <Badge variant="outline">None</Badge>
            ) : (
              <></>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <AddConnectionButton viewingUser={viewingUser} user={user} />
      </CardFooter>
    </Card>
  );
}
