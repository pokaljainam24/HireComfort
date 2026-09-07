export interface CmsSection {
  _id: string;

  title: string;
  content: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: string;
  createdBy: string;

  updatedAt: string;
  updatedBy: string | null;

  deleteAt: string | null;
  deleteBy: string | null;
}

export interface CmsSectionForm {
  title: string;
  content: string;
}
