import type {
    Request,
    Response,
    NextFunction,
} from "express";
import {
    createEventService,
    getEventsByJobService,
    getEventsByApplicantService,
    getEventsByTypeService,
    getAllEventsService
} from "../../services/admin/analyticsEventsService.js";

const parseDates = (req: Request) => {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    return { startDate, endDate };
};

export const createEventController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { jobId, applicantId, eventType } = req.body;

        if (!jobId || !eventType || !applicantId) {
            throw new Error(
                "jobId, applicantId and eventType are required"
            );
        }

        const event = await createEventService({
            jobId,
            applicantId,
            eventType,
        });

        res.status(201).json({
            success: true,
            message: "Analytics event created successfully",
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

export const getEventsByJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { startDate, endDate } = parseDates(req);
        const events = await getEventsByJobService(
            req.params.jobId as string,
            startDate,
            endDate
        );

        res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

export const getEventsByApplicantController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { startDate, endDate } = parseDates(req);
        const events = await getEventsByApplicantService(
            req.params.applicantId as string,
            startDate,
            endDate
        );

        res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

export const getEventsByTypeController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { startDate, endDate } = parseDates(req);
        const events = await getEventsByTypeService(
            req.params.eventType as string,
            startDate,
            endDate
        );

        res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

export const getEventsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { startDate, endDate } = parseDates(req);
        const events = await getAllEventsService(
            startDate,
            endDate
        );

        res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};