import { useLocation } from "react-router-dom";
import { navConfig } from "@/data/navConfig";

export function usePageTitle(): string {
  const { pathname } = useLocation();
  for (const group of navConfig) {
    for (const item of group.items) {
      if (item.path === pathname) return item.label;
    }
  }
  return "Dashboard";
}
