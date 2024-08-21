import { deleteSubUser } from "@/axios/stores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Store } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import TheDeleteUser from "./TheDeleteUser";

export default function TheUsersTable({ storeData }: { storeData: Store }) {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteSubUserMutation } = useMutation({
    mutationFn: (userId: string) => deleteSubUser(storeData._id, userId),
    onSuccess: (data) => {
      queryClient.setQueriesData({ queryKey: ["single-store"] }, data);
      queryClient.refetchQueries({ queryKey: ["single-store"] });
    },
  });
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Användare</TableHead>
          <TableHead className="text-right">Roll</TableHead>
          <TableHead className="text-right">Ta bort</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storeData?.sub_users.map((user) => {
          const userRole = user.role === "sub_user" && "Arbetare";
          return (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                <div className="flex flex-row items-center gap-3">
                  <div className="flex justify-center items-center bg-black text-white text-lg font-light rounded-full size-10">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm">{user.name}</p>
                    <p className="text-sm font-light text-gray-600">
                      {user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">{userRole}</TableCell>
              <TableCell className="w-24">
                <TheDeleteUser userId={user._id} deleteSubUserMutation={deleteSubUserMutation} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
