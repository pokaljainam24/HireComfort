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
        path: "/applicant-panel/profile",
        icon: "user",
      }
    ],
  },

  {
    label: "Education",
    items: [
      {
        label: "Applicant Education",
        path: "/applicant-panel/applicant-education",
        icon: "education",
      },
    ],
  },

  {
    label: "Certificates",
    items: [
      {
        label: "Applicant Certificate",
        path: "/applicant-panel/applicant-certificates",
        icon: "file-text",
      },
    ],
  },

  {
    label: "Experience",
    items: [
      {
        label: "Applicant Experience",
        path: "/applicant-panel/applicant-experience",
        icon: "briefcase",
      },
    ],
  },

  {
    label: "Project",
    items: [
      {
        label: "Applicant Project",
        path: "/applicant-panel/applicant-project",
        icon: "briefcase"
      },
    ],
  },

  {
    label: "Account",
    items: [
      {
        label: "Change Password",
        path: "/applicant-panel/change-password",
        icon: "lock",
      },
    ],
  },
]
