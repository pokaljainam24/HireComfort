import mongoose, { Schema } from "mongoose";

export interface ICounterMaster {
  countMobile: number;
  countDesktop: number;
  todayTotal: number;
  date: Date;
}

const counterMasterSchema = new Schema<ICounterMaster>(
  {
    countMobile: {
      type: Number,
      default: 0,
    },

    countDesktop: {
      type: Number,
      default: 0,
    },

    todayTotal: {
      type: Number,
      default: 0,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CounterMaster = mongoose.model<ICounterMaster>(
  "CounterMaster",
  counterMasterSchema,
);

export default CounterMaster;
