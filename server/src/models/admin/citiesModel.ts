import { model, Schema } from "mongoose";

const citiesSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  stateId: { type: Schema.Types.ObjectId, required: true },

  IsActive: { type: Boolean, default: true },
  IsDisplay: { type: Boolean, default: true },
  CreatedAt: { type: Date, default: Date.now },
  CreatedBy: { type: String, default: "Admin" },
  UpdateAt: { type: Date, default: Date.now },
  UpdatedBy: { type: String, default: "Admin" },
  DeleteAt: { type: Date, default: null },
  DeleteBy: { type: String, default: null },
});

export default model("cities", citiesSchema);
