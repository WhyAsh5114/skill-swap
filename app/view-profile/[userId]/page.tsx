import { TypographyH2 } from "@/components/ui/typographyH2";
import UserCard from "./components/UserCard";

export default async function Page({ params }: { params: { userId: string } }) {
  return (
    <div className="flex flex-col grow w-full">
      <TypographyH2>View profile</TypographyH2>
      <UserCard viewingUserId={params.userId} />
    </div>
  );
}
