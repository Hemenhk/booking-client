import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

type Props = {
  deleteSubUserMutation: UseMutateAsyncFunction<void, Error, string, unknown>;
  userId: string;
};

export default function TheDeleteUser({
  deleteSubUserMutation,
  userId,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FaTrash className="mx-auto size-4 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Är du helt säker?</AlertDialogTitle>
          <AlertDialogDescription>
            Den här handlingen kommer permanent ta bort kontot.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteSubUserMutation(userId)}>
            Radera
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
