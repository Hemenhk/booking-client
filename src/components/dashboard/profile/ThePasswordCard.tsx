import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TheUpdatePasswordForm from "@/components/forms/updatePassword/TheUpdatePasswordForm";
import { KeyRound, Pencil } from "lucide-react";

export default function ThePasswordCard({ userId }: { userId: string }) {
  return (
    <Card className="overflow-hidden max-w-[600px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Lösenord</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
              <Pencil size={15} />
            </span>
          </DialogTrigger>
          <TheUpdatePasswordForm userId={userId} />
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2 p-3 border rounded-lg">
          <KeyRound size={18} />
          <p>**********</p>
        </div>
      </CardContent>
    </Card>
  );
}
