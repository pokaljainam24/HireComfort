export interface EmailCredential {
  _id: string;

  smtpServer: string;
  emailFrom: string;
  username: string;
  securityType: string;
  password: string;
  port: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: string;
  createdBy: string;

  updatedAt: string;
  updatedBy: string | null;

  deleteAt: string | null;
  deleteBy: string | null;
}

export interface EmailCredentialForm {
  smtpServer: string;
  emailFrom: string;
  username: string;
  securityType: string;
  password: string;
  port: string;
}
