import mongoose, { Schema } from "mongoose";

interface IRecruiter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  userName: string;
  password: string;
  department: string;
  remark: string;
  joiningDate: Date;
  designation: string;
}

const recruiterSchema = new Schema<IRecruiter>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    default: "",
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

const Recruiter = mongoose.model<IRecruiter>("Recruiter", recruiterSchema);

export default Recruiter;
