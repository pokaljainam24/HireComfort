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
    items: [{ label: "Dashboard", path: "/recruiter", icon: "grid" }],
  },
  {
    label: "Profile",
    items: [
      { label: "Company Profile", path: "/recruiter/company-profile", icon: "building" },
      { label: "Recruiter Profile", path: "/recruiter/recruiter-profile", icon: "user" },
    ],
  },
  {
    label: "Jobs",
    items: [
      { label: "Post a Job", path: "/recruiter/post-job", icon: "plus" },
      { label: "Manage Jobs", path: "/recruiter/manage-jobs", icon: "briefcase" },
    ],
  },
  {
    label: "Applications",
    items: [{ label: "Applications", path: "/recruiter/applications", icon: "inbox" }],
  },
  {
    label: "Account",
    items: [{ label: "Change Password", path: "/recruiter/change-password", icon: "key" }],
  },
];
