import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <AlertDialog open>
      <AlertDialogContent className="text-center flex justify-center bg-transparent border-none shadow-none">
        <LoadingSpinner size={32} className="text-neutral-50" />
      </AlertDialogContent>
    </AlertDialog>
  );
}
