import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TheUpdatePhoneNumber from "@/components/forms/updatePhone/TheUpdatePhoneNumber";
import { Pencil, Smartphone } from "lucide-react";
import { Store } from "@/types/types";

type Props = {
    storeData: Store
}
export default function ThePhoneCard({storeData} : Props) {
  return (
    <Card className="overflow-hidden max-w-[600px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Telefonnummer</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
                <Pencil size={15} />
              </span>
            </DialogTrigger>
            <TheUpdatePhoneNumber />
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center gap-2 p-3 border rounded-lg">
            <Smartphone size={18} />
            <p>{storeData?.phone_number}</p>
          </div>
        </CardContent>
      </Card>
  )
}
