export interface RecruiterProfileType {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  userName: string;
  password?: string;
  department: string;
  designation: string;
  profilePic?: string;
}

export type RecruiterResponse = {
  recruiter: RecruiterProfileType;
};