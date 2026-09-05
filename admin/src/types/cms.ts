export interface CmsSection {
  _id: string;

  smtpServer: string;
  emailFrom: string;
  username: string;
  securityType: string;
  password: string;
  port: number;
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
  smtpServer: string;
  emailFrom: string;
  username: string;
  securityType: string;
  password: string;
  port: string;
  content: string;
}