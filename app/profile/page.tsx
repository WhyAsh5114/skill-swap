import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { Suspense } from "react";
import ProfileDataWrapper from "./components/ProfileDataWrapper";
import { SkillsDataWrapper } from "./components/SkillsDataWrapper";

export default async function Page() {
  return (
    <div className="h-px grow w-full max-w-xl">
      <TypographyH2>Profile</TypographyH2>
      <Tabs defaultValue="profile" className="w-full mt-4">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Make changes to your profile here
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Suspense fallback={<Skeleton className="h-36 w-full" />}>
                <ProfileDataWrapper />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Manage your skills here</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Suspense fallback={<Skeleton className="h-72 w-full" />}>
                <SkillsDataWrapper />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
