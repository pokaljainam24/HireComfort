import { Types } from "mongoose";
import { JobAnalyticsEventModel } from "../../models/admin/analyticsEventsModel.js";

interface CreateEventInput {
    jobId: string;
    applicantId?: string;
    eventType:
    | "view"
    | "click"
    | "apply_button_click"
    | "application";
}

const buildDateFilter = (startDate?: Date, endDate?: Date) => {
    const filter: any = {};
    if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = startDate;
        if (endDate) filter.createdAt.$lte = endDate;
    }
    return filter;
};

// TODO: Should the events be dynamically added by the admin?
export const createEventService = async (
    data: CreateEventInput
) => {
    if (!Types.ObjectId.isValid(data.jobId)) {
        throw new Error("Invalid job ID");
    }

    if (
        data.applicantId &&
        !Types.ObjectId.isValid(data.applicantId)
    ) {
        throw new Error("Invalid applicant ID");
    }

    return await JobAnalyticsEventModel.create(data);
};

export const getEventsByJobService = async (
    jobId: string,
    startDate?: Date,
    endDate?: Date
) => {
    if (!Types.ObjectId.isValid(jobId)) {
        throw new Error("Invalid job ID");
    }

    const filter = { jobId, ...buildDateFilter(startDate, endDate) };

    return await JobAnalyticsEventModel.find(filter)
        .sort({ createdAt: -1 })
        .lean();
};

export const getEventsByApplicantService = async (
    applicantId: string,
    startDate?: Date,
    endDate?: Date
) => {
    if (!Types.ObjectId.isValid(applicantId)) {
        throw new Error("Invalid applicant ID");
    }

    const filter = { applicantId, ...buildDateFilter(startDate, endDate) };

    return await JobAnalyticsEventModel.find(filter)
        .sort({ createdAt: -1 })
        .lean();
};

export const getEventsByTypeService = async (
    eventType: string,
    startDate?: Date,
    endDate?: Date
) => {
    const filter = { eventType, ...buildDateFilter(startDate, endDate) };

    return await JobAnalyticsEventModel.find(filter)
        .sort({ createdAt: -1 })
        .lean();
};

export const getAllEventsService = async (
    startDate?: Date,
    endDate?: Date
) => {
    const filter = buildDateFilter(startDate, endDate);

    return await JobAnalyticsEventModel.find(filter)
        .sort({ createdAt: -1 })
        .lean();
};