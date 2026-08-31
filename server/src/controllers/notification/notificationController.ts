import type { Request, Response, NextFunction } from "express";
import {
    getNotificationsService,
    getNotificationByIdService,
    createNotificationService,
    updateNotificationService,
    deleteNotificationService
} from "../../services/notification/notificationService.js";

export const getNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.query.user as string;
        const notifications = await getNotificationsService(userId);
        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        next(error);
    }
};

export const getNotificationById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const notification = await getNotificationByIdService(req.params.id as string);
        res.status(200).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};

export const createNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const notification = await createNotificationService(req.body);
        res.status(201).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};

export const updateNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const notification = await updateNotificationService(req.params.id as string, req.body);
        res.status(200).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteNotificationService(req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
