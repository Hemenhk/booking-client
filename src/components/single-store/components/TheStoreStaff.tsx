import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { AdminUser, Service, SubUser } from "@/types/types";

type Props = {
  admin: AdminUser | undefined;
  subUsers: SubUser[];
  storeHandle: string;
};

export default function TheStoreStaff({ admin, subUsers, storeHandle }: Props) {
  const router = useRouter();

  const lastIndexOfAdminServices = admin && admin?.services?.length - 1;

  const handleRedirect = (
    storeHandle: string,
    userId: string,
    service?: Service
  ) => {
    if (service) localStorage.setItem("service", JSON.stringify(service));

    console.log(service?.createdBy);

    router.push(`/store/${storeHandle}/${userId}`);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-medium pb-5">Personal & Tjänster</h3>
      <ul>
        <Accordion type="single" collapsible className="w-3/4">
          <AccordionItem value={admin?._id as string}>
            <AccordionTrigger className="hover:no-underline">
              <li
                key={admin?._id}
                className="flex flex-row items-center justify-between py-6 w-3/4"
              >
                <div className="flex flex-row items-center gap-3">
                  <Avatar className="size-20">
                    <AvatarImage
                      className="object-cover"
                      src={admin?.profileImage}
                    />
                    <AvatarFallback className="text-3xl">
                      {admin?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col text-left">
                    <h3 className="font-medium text-lg">{admin?.name}</h3>
                    <p className="text-sm text-gray-500">{admin?.email}</p>
                  </div>
                </div>
              </li>{" "}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-8">
                {admin?.services.map((service, index) => (
                  <li
                    key={service._id}
                    className={`flex flex-row w-full justify-between ${
                      index === lastIndexOfAdminServices
                        ? "border-none"
                        : "border-b"
                    } pb-6`}
                  >
                    <p className="text-[16px] tracking-wide capitalize">
                      {service.name}
                    </p>
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-col gap-0.5">
                        <p className="font-medium">{service.price}kr</p>
                        <p className="text-xs text-gray-600">
                          {service.duration}min
                        </p>
                      </div>
                      <Button
                        onClick={() =>
                          handleRedirect(storeHandle, admin._id, service)
                        }
                      >
                        Boka
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          {subUsers?.map((user) => {
            const lastIndexOfUserServices = user?.services?.length - 1; // Get the last index for each sub-user's services

            return (
              <AccordionItem value={user._id} key={user._id}>
                <AccordionTrigger className="hover:no-underline">
                  <li className="flex flex-row items-center justify-between py-6 w-3/4">
                    <div className="flex flex-row items-center gap-3">
                      <Avatar className="size-20">
                        <AvatarImage
                          className="object-cover"
                          src={user.profileImage}
                        />
                        <AvatarFallback className="text-3xl">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col text-left">
                        <h3 className="font-medium text-lg">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </li>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-8">
                    {user?.services.map((service, index) => (
                      <li
                        key={service._id}
                        className={`flex flex-row w-full justify-between ${
                          index === lastIndexOfUserServices
                            ? "border-none"
                            : "border-b"
                        } pb-6`}
                      >
                        <p className="text-[16px] tracking-wide capitalize">
                          {service.name}
                        </p>
                        <div className="flex flex-row items-center gap-4">
                          <div className="flex flex-col gap-0.5">
                            <p className="font-medium">{service.price}kr</p>
                            <p className="text-xs text-gray-600">
                              {service.duration}min
                            </p>
                          </div>
                          <Button
                            onClick={() =>
                              handleRedirect(storeHandle, user._id, service)
                            }
                          >
                            Boka
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ul>
    </div>
  );
}
