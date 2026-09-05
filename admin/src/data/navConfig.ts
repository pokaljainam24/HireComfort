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
    label: "Location Masters",
    items: [
      {
        label: "Country Master",
        path: "/country-master",
        icon: "globe",
      },
      {
        label: "State Master",
        path: "/state-master",
        icon: "map",
      },
      {
        label: "City Master",
        path: "/city-master",
        icon: "pin",
      },
    ],
  },

  {
    label: "Job Masters",
    items: [
      {
        label: "Job Category",
        path: "/job-category",
        icon: "briefcase",
      },
      {
        label: "Job Sub Category",
        path: "/job-sub-category",
        icon: "layers",
      },
      {
        label: "Skills Master",
        path: "/skills-master",
        icon: "skills",
      },
      {
        label: "Qualification Master",
        path: "/qualification-master",
        icon: "qualification",
      },

      {
        label: "Employment Types",
        path: "/employment-types",
        icon: "employment",
      },
      {
        label: "Industry Types",
        path: "/industry",
        icon: "industry",
      }
    ],
  },

  {
    label: "Content",
    items: [
      {
        label: "Blogs",
        path: "/blogs",
        icon: "file-text",
      },
      {
        label: "CMS Pages",
        path: "/cms",
        icon: "layout",
      },
      {
        label: "Newsletter",
        path: "/newsletter",
        icon: "mail",
      },
    ],
  },

  {
    label: "Engagement",
    items: [
      {
        label: "Contact Queries",
        path: "/contact",
        icon: "message",
      },
      {
        label: "FAQ",
        path: "/faq",
        icon: "faq",
      },
      {
        label: "Email Credential",
        path: "/email-credential",
        icon: "email",
      },
      {
        label: "Email Templates",
        path: "/email-templates",
        icon: "mail-template",
      },
    ],
  },
];
