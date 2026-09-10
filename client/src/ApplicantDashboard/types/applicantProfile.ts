export interface ApplicantProfileType {
  _id:string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;

  resume: string;
  profilePic?: string;

  HighestQualification: string;
  experience?: string;

  skills: string[];
  preferredLocation: string[];

  address?: string;
  state?: string;

  userName: string;
  password: string;

  dob?: Date;
  gender?: string;

  isActive: boolean;
  isDisplay: boolean;

  createdAt: Date;
  createdBy?: string;

  updatedAt: Date;
  updatedBy?: string;

  deleteAt?: Date | null;
  deleteBy?: string | null;

}

export interface ApplicantForm{
    _id:string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;

  resume: string;
  profilePic?: string;

  HighestQualification: string;
  experience?: string;

  skills: string[];
  preferredLocation: string[];

  address?: string;
  state?: string;

  userName: string;
  password: string;

  dob?: Date;
  gender?: string;
}