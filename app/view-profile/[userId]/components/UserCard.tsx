import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/db";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";

export default async function UserCard({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { knownSkills: true, wantedSkills: true },
  });
  if (!user) {
    return (
      <span className="mt-4 font-light">
        <span className="font-semibold">404</span> Profile not found
      </span>
    );
  }

  return (
    <Card className="mt-4 rounded-lg">
      <CardHeader className="grid grid-cols-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.profilePicture ?? ""} />
          <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col col-span-3 justify-between">
          <CardTitle>{user.username}</CardTitle>
          <CardDescription className="text-sm">{user.id}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm">Known skills</span>
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
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <span className="font-medium text-sm">Wanted skills</span>
          <div className="flex flex-wrap gap-1">
            {user.wantedSkills.map((skill) => (
              <Badge variant="outline" key={skill.skillName}>
                {skill.skillName}
              </Badge>
            ))}
            {user.wantedSkills.length === 0 ? (
              <Badge variant="outline">None</Badge>
            ) : (
              <></>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto gap-2">
          Add
          <UserRoundPlus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
