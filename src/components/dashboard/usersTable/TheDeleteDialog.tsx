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
import { FaTrash } from "react-icons/fa";


type Props<T extends any[]> = {
  deleteMutation: (...args: T) => Promise<void>; 
  mutationArgs: T; 
  title: string;
  description: string; 
};

export default function TheDeleteDialog<T extends any[]>({
  deleteMutation,
  mutationArgs,
  title,
  description,
}: Props<T>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FaTrash className="mx-auto size-4 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              try {
                await deleteMutation(...mutationArgs);
              } catch (error) {
                console.error("Error deleting:", error);
              }
            }}
          >
            Radera
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
