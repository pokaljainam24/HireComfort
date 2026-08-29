import type { Request, Response } from "express";
import {
    getProfileService,
    updateProfileService
} from "../../services/admin/profileService.js";



async function getProfile(_req: Request, res: Response) {
    try {

        const profile = await getProfileService();
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: profile
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

async function updateProfile(req: Request, res: Response) {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ success: false, message: "Update payload is required" });
        }

        const profile = await updateProfileService(data);
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profile
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export { getProfile, updateProfile }