"use client";

import { getAppointments } from "@/lib/actions/appointments";
import { useQuery } from "@tanstack/react-query";

export const useAppointments = () => {
  const result = useQuery({
    queryKey: ["getAppointments"],
    queryFn: getAppointments,
  });
  return result;
};
