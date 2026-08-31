
import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { createAnalyticsService, deleteAnalyticsService, getAnalyticsByIdService, getAnalyticsByJobService, incrementAnalyticsService, updateAnalyticsService } from "../../services/admin/analyticsMasterService.js";

export const createAnalyticsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { jobId, analyticDate } = req.body;

        if (!jobId) {
            throw new Error("jobId is required");
        }

        const analytics =
            await createAnalyticsService({
                jobId,
                analyticDate: analyticDate
                    ? new Date(analyticDate)
                    : undefined,
            });

        res.status(201).json({
            success: true,
            message: "Analytics created successfully",
            data: analytics,
        });
    } catch (error) {
        next(error);
    }
};

export const getAnalyticsByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const analytics =
            await getAnalyticsByIdService(
                req.params.id as string
            );

        res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        next(error);
    }
};

export const getAnalyticsByJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { jobId } = req.params;

        const startDate = req.query.startDate
            ? new Date(req.query.startDate as string)
            : undefined;

        const endDate = req.query.endDate
            ? new Date(req.query.endDate as string)
            : undefined;

        const analytics =
            await getAnalyticsByJobService(
                jobId as string,
                startDate,
                endDate
            );

        res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        next(error);
    }
};

export const updateAnalyticsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const analytics =
            await updateAnalyticsService(
                req.params.id as string,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Analytics updated successfully",
            data: analytics,
        });
    } catch (error) {
        next(error);
    }
};

export const incrementAnalyticsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { jobId } = req.params;

        const analytics =
            await incrementAnalyticsService(
                jobId as string,
                req.body.date
                    ? new Date(req.body.date)
                    : new Date(),
                {
                    views: req.body.views,
                    totalApplication: req.body.totalApplication,
                    uniqueViews: req.body.uniqueViews,
                    totalClicks: req.body.totalClicks,
                    uniqueClicks: req.body.uniqueClicks,
                    applyButtonClicks:
                        req.body.applyButtonClicks,
                }
            );

        res.status(200).json({
            success: true,
            message: "Analytics updated successfully",
            data: analytics,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAnalyticsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteAnalyticsService(
            req.params.id as string
        );

        res.status(200).json({
            success: true,
            message: "Analytics deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};