"use client"

import { useQuery } from "@tanstack/react-query";
import { getSingleStoreDetail } from "@/axios/stores";


export function useAdminQuery(storeHandle: string, year?: number, month?: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["single-store", storeHandle, year, month], // Include year and month in the query key
    queryFn: () => getSingleStoreDetail(storeHandle, year, month), // Pass year and month to the fetch function
  });

  return {
    admin: data?.store.admin,
    subUsers: data?.store.sub_users || [],
    storeData: data,
    isLoading,
    isError,
    error,
  };
}
