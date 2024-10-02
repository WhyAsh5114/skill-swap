import { TypographyH2 } from "@/components/ui/typographyH2";
import prisma from "@/lib/db";

export default async function WithUserHeader({
  withUserId,
}: {
  withUserId: string;
}) {
  const withUser = await prisma.user.findUnique({ where: { id: withUserId } });
  if (!withUser) {
    return <TypographyH2>User not found</TypographyH2>;
  }

  return (
    <TypographyH2>
      Chat with{" "}
      <span className="text-primary">{withUser.username}</span>
    </TypographyH2>
  );
}
