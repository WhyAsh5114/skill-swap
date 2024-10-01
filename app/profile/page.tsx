import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typographyH2";
import { Suspense } from "react";
import { SkillsDataWrapper } from "./components/SkillsDataWrapper";
import { UsernameComponent } from "./components/UsernameComponent";

export default async function Page() {
  return (
    <div className="h-px grow w-full max-w-xl">
      <TypographyH2>Profile</TypographyH2>
      <Suspense fallback={<Skeleton className="h-6 mt-2 w-32" />}>
        <UsernameComponent />
      </Suspense>
      <Card className="rounded-lg mt-4">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Manage your skills here</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Suspense fallback={<Skeleton className="h-36 w-full" />}>
            <SkillsDataWrapper />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
