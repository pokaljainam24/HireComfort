import { useLocation } from "react-router";
import { navConfig } from "../../data/navConfig.ts";

export function usePageTitle(): string {
  const { pathname } = useLocation();
  for (const group of navConfig) {
    for (const item of group.items) {
      if (item.path === pathname) return item.label;
    }
  }
  return "Dashboard";
}
