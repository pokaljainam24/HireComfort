import { NotificationModel } from "../../models/Notification/NotificationModel.js";

export const getNotificationsService = async (userId?: string) => {
    const filter = userId ? { user: userId } : {};
    return await NotificationModel.find(filter).sort({ createdAt: -1 });
};

export const getNotificationByIdService = async (id: string) => {
    const notification = await NotificationModel.findById(id);
    if (!notification) {
        throw new Error("Notification not found");
    }
    return notification;
};

export const createNotificationService = async (data: any) => {
    const notification = new NotificationModel(data);
    return await notification.save();
};

export const updateNotificationService = async (id: string, data: any) => {
    // If status is being updated to "Seen", automatically set readAt
    if (data.status === "Seen" && !data.readAt) {
        data.readAt = new Date();
    }

    const notification = await NotificationModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    );

    if (!notification) {
        throw new Error("Notification not found");
    }
    return notification;
};

export const deleteNotificationService = async (id: string) => {
    const notification = await NotificationModel.findByIdAndUpdate(id, { IsActive: false, DeleteAt: new Date(), DeleteBy: "admin" });
    if (!notification) {
        throw new Error("Notification not found");
    }
    return notification;
};
