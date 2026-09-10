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
    items: [{ label: "Dashboard", path: "/applicant-panel", icon: "grid" }],
  },


 {
    label: "Profile",
    items: [
      {
        label: "Applicant Profile",
        path: "applicant-profile",
        icon: "user",
      }
    ],
  },

  {
    label: "Education",
    items: [
      {
        label: "Applicant Education",
        path: "/applicant-education",
        icon: "education",
      },
    ],
  },

  {
    label: "Certificates",
    items: [
      {
        label: "Applicant Certificate",
        path: "/applicant-certificates",
        icon: "file-text",
      },
    ],
  },

  {
    label: "Experience",
    items: [
      {
        label: "Applicant Experience",
        path: "/applicant-experience",
        icon: "briefcase",
      },
    ],
  },

  {
    label: "Project",
    items: [
    {
    label:"Applicant Project",
    path: "/applicant-project",
    icon: "briefcase"
  },
],
}
]
