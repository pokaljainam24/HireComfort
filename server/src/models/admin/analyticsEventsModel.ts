import { Schema, model, type Document, type Types } from "mongoose";

export interface IJobAnalyticsEvent extends Document {
    jobId: Types.ObjectId;
    applicantId?: Types.ObjectId;
    eventType: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDisplay: boolean;
    createdBy: string;
    updatedBy: string;
    deletedAt: Date;
    deletedBy: string;
}

const jobAnalyticsEventSchema = new Schema<IJobAnalyticsEvent>(
    {
        jobId: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },

        applicantId: {
            type: Schema.Types.ObjectId,
            ref: "Applicant",
        },

        eventType: {
            type: String,
            required: true,
            enum: [
                "view",
                "click",
                "apply_button_click",
                "application",
            ],
        },
        isActive: { type: Boolean, default: true },
        isDisplay: { type: Boolean, default: true },
        createdBy: { type: String, default: "Admin" },
        updatedBy: { type: String, default: "Admin" },
        deletedAt: { type: Date, default: null },
        deletedBy: { type: String, default: null },
    },
    {
        timestamps: true,
    }
);

export const JobAnalyticsEventModel = model<IJobAnalyticsEvent>(
    "JobAnalyticsEvent",
    jobAnalyticsEventSchema
);