import mongoose, { Schema } from "mongoose";

export interface ICountry {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;


}

const countrySchema = new Schema<ICountry>(
  {
    id: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    iso2: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
    },

    iso3: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 3,
      maxlength: 3,
    },

    phonecode: {
      type: String,
      required: true,
      trim: true,
    },

    capital: {
      type: String,
      required: true,
      trim: true,
    },

    currency: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "country",
  },
);

const Country = mongoose.model<ICountry>(
  "Country",
  countrySchema,
);

export default Country;