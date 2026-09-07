import mongoose, { Schema } from "mongoose";

export interface ICity {
  id: number;
  state_id: number;
  name: string;
  latitude: string;
  longitude: string;

}

const citySchema = new Schema<ICity>(
  {
    id: {
      type: Number,
      required: true,
    },
    state_id: {
      type: Number,
      ref: "State",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: String,
      required: true,
      trim: true,
    },
    longitude: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "city",
  },
);

const City = mongoose.model<ICity>(
  "city",
  citySchema,
);

export default City;