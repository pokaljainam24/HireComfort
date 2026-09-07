export interface Contact {
  _id: string;

  name: string;

  company: string;

  email: string;

  phone: string;

  message: string;

  isActive: boolean;

  isDisplay: boolean;

  createdAt: string;

  createdBy: string;

  updatedAt: string;

  updatedBy: string | null;

  deleteAt: string | null;

  deleteBy: string | null;
}

export interface ContactForm {
  name: string;

  company: string;

  email: string;

  phone: string;

  message: string;
}
