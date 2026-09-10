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
    items: [{ label: "Dashboard", path: "/recruiter-panel", icon: "grid" }],
  },
  {
    label: "Profile",
    items: [
      { label: "Company Profile", path: "/recruiter-panel/company-profile", icon: "building" },
      { label: "Recruiter Profile", path: "/recruiter-panel/recruiter-profile", icon: "user" },
    ],
  },
  {
    label: "Jobs",
    items: [
      { label: "Post a Job", path: "/recruiter-panel/post-job", icon: "plus" },
      { label: "Manage Jobs", path: "/recruiter-panel/manage-jobs", icon: "briefcase" },
    ],
  },
  {
    label: "Applications",
    items: [{ label: "Applications", path: "/recruiter-panel/applications", icon: "inbox" }],
  },
  {
    label: "Account",
    items: [{ label: "Change Password", path: "/recruiter-panel/change-password", icon: "key" }],
  },
];
