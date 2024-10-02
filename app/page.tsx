import { TypographyH2 } from "@/components/ui/typographyH2";
import { UsersTable } from "./components/UsersTable";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="flex flex-col grow w-full">
      <TypographyH2>Home</TypographyH2>
      <Suspense fallback={<Skeleton className="grow w-full" />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}
