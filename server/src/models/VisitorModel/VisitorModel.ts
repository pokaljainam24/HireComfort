import mongoose, { Document, Model, Schema } from "mongoose";

export interface IVisitor extends Document {
  sessionId: string;
  ipHash: string;
  lastVisitedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const visitorSchema = new Schema<IVisitor>(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    ipHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    lastVisitedAt: {
      type: Date,
      required: true,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const VisitorModel: Model<IVisitor> =
  (mongoose.models.Visitor as Model<IVisitor>) ||
  mongoose.model<IVisitor>("Visitor", visitorSchema);

export default VisitorModel;