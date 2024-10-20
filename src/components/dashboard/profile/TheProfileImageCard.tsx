import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TheUpdateProfileForm from "@/components/forms/updateProfile/TheUpdateProfileForm";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Store } from "@/types/types";
import { useSession } from "next-auth/react";

type Props = {
  userId: string;
  storeData?: Store;
  subuserProfileImage?: string;
};

export default function TheProfileImageCard({
  userId,
  storeData,
  subuserProfileImage,
}: Props) {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div>Ingen användare hottades</div>;
  }

  const getProfileImage = (userRole: string) => {
    switch (userRole) {
      case "store_admin":
        return storeData?.admin.profileImage;
      case "sub_user":
        return subuserProfileImage;

      default:
        ""; // Default to the session's profile image
    }
  };

  const profileImageSrc = getProfileImage(session?.user.role);

  return (
    <Card className="overflow-hidden max-w-[600px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Profilbild</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <span className="cursor-pointer p-2 rounded-lg transition duration-300 ease-out hover:bg-gray-100">
              <Pencil size={15} />
            </span>
          </DialogTrigger>
          <TheUpdateProfileForm
            userId={userId}
            profileImage={profileImageSrc}
          />
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="p-3 border rounded-lg w-40 flex justify-center ">
          <div className="relative overflow-hidden size-32 rounded-lg">
            <Image
              src={profileImageSrc}
              alt="profile image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
