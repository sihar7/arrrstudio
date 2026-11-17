"use client";

import { useLayoutEffect } from "react";
import { syncRootState } from "@/utils/theme";

// Pasang ulang tema + kelas root sebelum paint setiap kali layout bahasa dipasang (ganti bahasa tidak mereset tema).
export default function RootStateSync() {
  useLayoutEffect(() => {
    syncRootState();
  }, []);
  return null;
}
