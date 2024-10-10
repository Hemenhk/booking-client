// components/skeletons/TheSkeletonCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Skeleton from "@mui/material/Skeleton";

export const TheSkeletonCard = () => {
  return (
    <Card className="flex flex-row bg-white border-none shadow-none rounded-lg">
      <div className="h-64 w-96 rounded-lg relative overflow-hidden">
        <Skeleton variant="rectangular" width={384} height={256} />
      </div>
      <div className="w-2/4">
        <CardHeader>
          <Skeleton variant="text" width="70%" height={40} />
          <div className="flex flex-row gap-3">
            <div className="flex flex-col gap-2">
              <Skeleton variant="text" width="50%" />
              <div className="flex flex-row items-center gap-1 text-base">
                <Skeleton variant="text" width={30} height={30} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="80%" />
        </CardContent>
      </div>
    </Card>
  );
};
