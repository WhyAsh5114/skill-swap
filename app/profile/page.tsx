import { TypographyH2 } from "@/components/ui/typographyH2";
import { UsernameComponent } from "./components/UsernameComponent";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { SkillsComponent } from "./components/SkillsComponent";

export default async function Page() {
  return (
    <div className="h-px grow w-full">
      <TypographyH2>Profile</TypographyH2>
      <Suspense fallback={<Skeleton className="h-8 w-32" />}>
        <UsernameComponent />
      </Suspense>
      <Card className="rounded-lg mt-4">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Manage your skills here</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <SkillsComponent />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
