import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

type PropsType = { withUserId: string };

export default function AcceptConnectionButton({ withUserId }: PropsType) {
  return (
    <Button className="gap-2 w-28 ml-auto" asChild>
      <Link href={`/chat/${withUserId}`}>
        <span className="grow text-center">Chat</span>
        <MessageCircle className="h-4 w-4" />
      </Link>
    </Button>
  );
}
