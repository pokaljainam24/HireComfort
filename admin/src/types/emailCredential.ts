export interface EmailCredential {
  _id: string;

  emailSetUpName: string;
  email: string;
  host: string;
  port: string;
  isSSL: boolean;

  // Password is not returned from GET API
  password?: string;

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
  emailSetUpName: string;
  email: string;
  host: string;
  port: string;
  isSSL: boolean;
  password: string;
}
