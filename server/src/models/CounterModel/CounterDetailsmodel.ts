import mongoose, { Schema } from "mongoose";

export interface ICounterDetails {
  isMobile: boolean;
  dateAndTime: Date;
  ipAddress: string;
  country: string;
  countrycode: string;
  city: string;
  zipcode: string;
  longitude: string;
  latitude: string;
  continent: string;
}

const counterDetailsSchema = new Schema<ICounterDetails>(
  {
    isMobile: {
      type: Boolean,
      required: true,
    },

    dateAndTime: {
      type: Date,
      default: Date.now,
    },

    ipAddress: {
      type: String,
      default: "",
      trim: true,
      maxlength: 50,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    countrycode: {
      type: String,
      default: "",
      trim: true,
      maxlength: 50,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    zipcode: {
      type: String,
      default: "",
      trim: true,
      maxlength: 50,
    },

    longitude: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    latitude: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    continent: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const CounterDetails = mongoose.model<ICounterDetails>(
  "CounterDetails",
  counterDetailsSchema,
);

export default CounterDetails;
