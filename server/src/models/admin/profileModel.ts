import { model, Schema } from "mongoose";

const AdminProfileScehma = new Schema({
    adminId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    IsActive: { type: Boolean, default: true },
    IsDisplay: { type: Boolean, default: true },
    CreatedAt: { type: Date, default: Date.now },
    CreatedBy: { type: String, default: "Admin" },
    UpdateAt: { type: Date, default: Date.now },
    UpdatedBy: { type: String, default: "Admin" },
    DeleteAt: { type: Date, default: null },
    DeleteBy: { type: String, default: null },
});

export default model("admin_profiles", AdminProfileScehma);
