import { Router } from "express";
import {
    getNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification
} from "../../controllers/notification/notificationController.js";

const router = Router();

router.get("/", getNotifications);
router.post("/", createNotification);
router.get("/:id", getNotificationById);
router.patch("/:id", updateNotification);
router.delete("/:id", deleteNotification);

export default router;