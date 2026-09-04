export interface Faq {
  _id: string;
  que: string;
  ans: string;

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

export interface FaqForm {
  que: string;
  ans: string;
}
