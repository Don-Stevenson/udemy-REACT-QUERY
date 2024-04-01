import { useState } from "react";

import type { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";

// query function for useQuery 
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff(): Staff[] {

  const fallBack: Staff[] = []
  // for filtering staff by treatment

  const {data: staff = fallBack} = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
  })
  const [filter, setFilter] = useState("all");

  // TODO: get data from server via useQuery
 
  return { staff, filter, setFilter };
}
