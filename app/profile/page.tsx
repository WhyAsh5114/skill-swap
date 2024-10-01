import { TypographyH2 } from "@/components/ui/typographyH2";
import { UsernameComponent } from "./UsernameComponent";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <CardContent className="flex items-end gap-1.5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="skill-name">Search skills</Label>
            <Input id="skill-name" placeholder="Type here" />
          </div>
          <Button variant="secondary">Add</Button>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
