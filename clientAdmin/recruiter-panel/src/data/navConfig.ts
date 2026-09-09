export interface NavItem {
  label: string;
  path: string;
  icon: string; // key into Icon map
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navConfig: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", path: "/", icon: "grid" }],
  },
  {
    label: "Profile",
    items: [
      { label: "Company Profile", path: "/company-profile", icon: "building" },
      { label: "Recruiter Profile", path: "/recruiter-profile", icon: "user" },
    ],
  },
  {
    label: "Jobs",
    items: [
      { label: "Post a Job", path: "/post-job", icon: "plus" },
      { label: "Manage Jobs", path: "/manage-jobs", icon: "briefcase" },
    ],
  },
  {
    label: "Applications",
    items: [{ label: "Applications", path: "/applications", icon: "inbox" }],
  },
  {
    label: "Account",
    items: [{ label: "Change Password", path: "/change-password", icon: "key" }],
  },
];
