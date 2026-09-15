export interface CompanyType {
  _id: string;
  companyTypeId: string;
  code: string;
  name: string;
  description: string;

  isActive?: boolean;
  isDisplay?: boolean;

  createdAt?: string;
  updatedAt?: string;
  deleteAt?: string | null;
}
