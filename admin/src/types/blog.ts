export type BlogCategory = "Job Seekers" | "Recruiters";

export interface Blog {
  _id: string;

  categoryId: BlogCategory;

  title: string;

  description: string;

  metaTitle: string;

  metaDescription: string;

  blogImg: string;

  authorImg: string;

  authorName: string;

  date: string;

  durationInMin: string;

  section: "big" | "latest";

  isActive: boolean;

  isDisplay: boolean;

  createdAt: string;

  createdBy: string;

  updatedAt: string;

  updatedBy: string | null;

  deleteAt: string | null;

  deleteBy: string | null;
}

export interface BlogForm {
  categoryId: BlogCategory | "";

  title: string;

  description: string;

  metaTitle: string;

  metaDescription: string;

  blogImg: File | null;

  authorImg: File | null;

  authorName: string;

  date: string;

  durationInMin: string;

  section: "big" | "latest";
}
