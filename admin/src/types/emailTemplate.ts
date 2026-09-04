export interface EmailTemplate {
  _id: string;

  templateName: string;
  description: string;

  // Status
  isActive: boolean;
  isDisplay: boolean;

  // Audit
  createdAt: string;
  createdBy: string;

  updatedAt: string;
  updatedBy: string | null;

  // Soft Delete
  deleteAt: string | null;
  deleteBy: string | null;
}

export interface EmailTemplateForm {
  templateName: string;
  description: string;
}
