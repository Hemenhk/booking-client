import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function TheUsersTable({ storeData }: { storeData: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Användare</TableHead>
          <TableHead className="text-right">Roll</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {storeData?.sub_users.map((user) => {
          const userRole = user.role === "sub_user" && "Arbetare";
          return (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                <div className="flex flex-row items-center gap-3">
                  <div className="flex justify-center items-center bg-black text-white text-xl font-light rounded-full size-14">
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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
