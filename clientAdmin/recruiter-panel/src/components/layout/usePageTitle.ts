import { useLocation } from "react-router-dom";
import { navConfig } from "@/data/navConfig";

export function usePageTitle(): string {
  const { pathname } = useLocation();

  for (const group of navConfig) {
    for (const item of group.items) {
      if (item.path === pathname) return item.label;
    }
  }

  // Routes reached by drilling into a list (edit/detail pages) aren't in
  // the sidebar itself, so resolve their titles here.
  if (pathname.startsWith("/post-job/")) return "Edit Job";
  if (pathname.startsWith("/applications/")) return "Application Detail";

  return "Dashboard";
}
