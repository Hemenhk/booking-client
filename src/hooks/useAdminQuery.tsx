"use client"

import { useQuery } from "@tanstack/react-query";
import { getSingleStoreDetail } from "@/axios/stores";
import { AdminUser } from "@/types/types";

export function useAdminQuery(storeHandle: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["single-store", storeHandle], // Include storeHandle as part of the query key to make it unique per store
    queryFn: () => getSingleStoreDetail(storeHandle),
  });

  return {
    admin: data?.admin,
    subUsers: data?.sub_users || [],
    storeData: data,
    isLoading,
    isError,
    error,
  };
}