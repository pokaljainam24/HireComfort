import { model, Schema } from "mongoose";

const NotificationSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ["Recruiter", "Applicant", "Admin"]
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Sent", "Received", "Seen", "Created", "Scheduled"],
        default: "Created"
    },
    title: {
        type: String,
        required: true,
    },
    readAt: Date,
    IsActive: { type: Boolean, default: true },
    IsDisplay: { type: Boolean, default: true },
    CreatedBy: { type: String, default: "Admin" },
    UpdatedBy: { type: String, default: "Admin" },
    DeleteAt: { type: Date, default: null },
    DeleteBy: { type: String, default: null },
}, { timestamps: true });

// Add index to quickly fetch user's recent notifications
NotificationSchema.index({ user: 1, createdAt: -1 });

export const NotificationModel = model("Notification", NotificationSchema);