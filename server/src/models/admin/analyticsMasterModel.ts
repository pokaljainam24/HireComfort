
import { Schema, model, type Document } from "mongoose";

interface IAnalytics extends Document {
    jobId: string;
    views: number;
    analyticDate: Date;
    totalApplication: number;
    uniqueViews: number;
    totalClicks: number;
    uniqueClicks: number;
    applyButtonClicks: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDisplay: boolean;
    createdBy: string;
    updatedBy: string;
    deletedAt: Date;
    deletedBy: string;
}
// TODO: Currently jobID is simple string, later change it to refer to the jobModel.
// jobId: {
// type: Schema.Types.ObjectId,
// ref: "Job",
//     required: true,
// index: true,
// }

const analyticsSchema = new Schema<IAnalytics>(
    {
        jobId: {
            type: String,
            required: true,
        },

        views: {
            type: Number,
            default: 0,
            min: 0,
        },

        analyticDate: {
            type: Date,
            required: true,
            index: true,
            default: () => new Date(),
        },

        totalApplication: {
            type: Number,
            default: 0,
            min: 0,
        },

        uniqueViews: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalClicks: {
            type: Number,
            default: 0,
            min: 0,
        },

        uniqueClicks: {
            type: Number,
            default: 0,
            min: 0,
        },

        applyButtonClicks: {
            type: Number,
            default: 0,
            min: 0,
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

// One analytics document per job per day
analyticsSchema.index(
    {
        jobId: 1,
        analyticDate: 1,
    },
    {
        unique: true,
    }
);

export const AnalyticsMaster = model<IAnalytics>(
    "AnalyticsMaster",
    analyticsSchema
);