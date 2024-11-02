import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <Loader2 className="w-16 h-16 text-primary animate-spin" />
    </div>
  );
}
