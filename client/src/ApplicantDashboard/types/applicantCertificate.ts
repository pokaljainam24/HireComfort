
export interface ApplicantCertificateType {
  _id: string;
  applicantId: string;

  credentialId: string;
  IssuedBy: string;
  IssuedDate: Date;
  ExpirationDate: Date;
  certificationName: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;
}

export interface ApplicantCertificateForm {
  applicantId: string;

  credentialId: string;
  IssuedBy: string;
  IssuedDate: Date;
  ExpirationDate: Date;
  certificationName: string;
}
