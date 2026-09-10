export interface CompanyProfileType {
  _id?: string;
  recruiterId?: string;
  companyName: string;
  contactNumber: string;
  companyEmail: string;
  numberOfEmployee: string;
  companyType: string;
  website: string;
  gstNumber: string;
  companyLogo: string;
  aboutCompany: string;
  address: string;
  countryId: string;
  stateId: string;
  cityId: string;
  country?: number;
  state?: number;
  city?: number;
  instagram: string;
  twitter: string;
  linkedin: string;
  facebook: string;
}