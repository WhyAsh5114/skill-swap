import { Button } from "@/components/ui/button";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SendButton({ outerDisable }: { outerDisable: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="gap-2" disabled={pending || outerDisable}>
      {pending ? <LoaderCircle className="animate-spin h-6 w-6" /> : "Send"}
      <SendHorizontal className="h-4 w-4" />
    </Button>
  );
}
