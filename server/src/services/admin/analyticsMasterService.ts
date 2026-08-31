import { Types } from "mongoose";
import { AnalyticsMaster } from "../../models/admin/analyticsMasterModel.js";

interface CreateAnalyticsInput {
    jobId: string;
    analyticDate?: Date | undefined;
}

interface UpdateAnalyticsInput {
    views?: number;
    totalApplication?: number;
    uniqueViews?: number;
    totalClicks?: number;
    uniqueClicks?: number;
    applyButtonClicks?: number;
}

interface IncrementAnalyticsInput {
    views?: number;
    totalApplication?: number;
    uniqueViews?: number;
    totalClicks?: number;
    uniqueClicks?: number;
    applyButtonClicks?: number;
}

export const createAnalyticsService = async (
    data: CreateAnalyticsInput
) => {
    const { jobId, analyticDate = new Date() } = data;


    // if (!Types.ObjectId.isValid(jobId)) {
    //     throw new Error("Invalid job ID");
    // }

    const date = new Date(analyticDate);
    date.setHours(0, 0, 0, 0);

    const existingAnalytics = await AnalyticsMaster.findOne({
        jobId,
        analyticDate: date,
        IsActive: { $ne: false },
    });

    if (existingAnalytics) {
        throw new Error(
            "Analytics already exists for this job and date"
        );
    }

    return AnalyticsMaster.create({
        jobId,
        analyticDate: date,
    });
};

export const getAnalyticsByIdService = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid analytics ID");
    }

    const analytics = await AnalyticsMaster.findOne({
        _id: id,
        IsActive: { $ne: false },
    }).populate("jobId");

    if (!analytics) {
        throw new Error("Analytics not found");
    }

    return analytics;
};

export const getAnalyticsByJobService = async (
    jobId: string,
    startDate?: Date,
    endDate?: Date
) => {
    if (!Types.ObjectId.isValid(jobId)) {
        throw new Error("Invalid job ID");
    }

    const filter: {
        jobId: string;
        IsActive: any;
        analyticDate?: {
            $gte?: Date;
            $lte?: Date;
        };
    } = {
        jobId,
        IsActive: { $ne: false },
    };

    if (startDate || endDate) {
        filter.analyticDate = {};

        if (startDate) {
            filter.analyticDate.$gte = startDate;
        }

        if (endDate) {
            filter.analyticDate.$lte = endDate;
        }
    }

    return AnalyticsMaster.find(filter)
        .sort({ analyticDate: 1 })
        .lean();
};

export const updateAnalyticsService = async (
    id: string,
    data: UpdateAnalyticsInput
) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid analytics ID");
    }

    const analytics = await AnalyticsMaster.findOneAndUpdate(
        { _id: id, IsActive: { $ne: false } },
        {
            $set: data,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!analytics) {
        throw new Error("Analytics not found");
    }

    return analytics;
};

export const incrementAnalyticsService = async (
    jobId: string,
    date: Date,
    data: IncrementAnalyticsInput
) => {
    if (!Types.ObjectId.isValid(jobId)) {
        throw new Error("Invalid job ID");
    }

    const analyticDate = new Date(date);
    analyticDate.setHours(0, 0, 0, 0);

    const incrementData: Record<string, number> = {};

    if (data.views !== undefined) {
        incrementData.views = data.views;
    }

    if (data.totalApplication !== undefined) {
        incrementData.totalApplication = data.totalApplication;
    }

    if (data.uniqueViews !== undefined) {
        incrementData.uniqueViews = data.uniqueViews;
    }

    if (data.totalClicks !== undefined) {
        incrementData.totalClicks = data.totalClicks;
    }

    if (data.uniqueClicks !== undefined) {
        incrementData.uniqueClicks = data.uniqueClicks;
    }

    if (data.applyButtonClicks !== undefined) {
        incrementData.applyButtonClicks = data.applyButtonClicks;
    }

    return AnalyticsMaster.findOneAndUpdate(
        {
            jobId,
            analyticDate,
        },
        {
            $inc: incrementData,
            $set: {
                IsActive: true,
                IsDisplay: true,
                DeletedAt: null,
                deleteBy: null
            },
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
        }
    );
};

export const deleteAnalyticsService = async (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid analytics ID");
    }

    const analytics = await AnalyticsMaster.findByIdAndUpdate(
        id,
        {
            IsActive: false,
            IsDisplay: false,
            DeletedAt: new Date(),
            deleteBy: "admin"
        },
        { new: true }
    );

    if (!analytics) {
        throw new Error("Analytics not found");
    }

    return analytics;
};