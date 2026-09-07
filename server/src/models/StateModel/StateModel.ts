import mongoose, { Schema } from "mongoose";

export interface IState {
  id: number;
  country_id: number;
  name: string;
  iso2: string;
  iso3166_2: string;
  type: string;

  
 
}

const stateSchema = new Schema<IState>(
  {
    id: {
      type: Number,
      required: true,
    },

    country_id: {
      type: Number,
      ref: "Country",
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
    },

    iso3166_2: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    
    collection: "state",
  },
);

const State = mongoose.model<IState>(
  "state",
  stateSchema,
);

export default State;