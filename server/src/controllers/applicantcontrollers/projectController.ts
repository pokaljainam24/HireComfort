import type { Request, Response } from "express";

import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  getProjectsByApplicantService,
  updateProjectService,
  deleteProjectService,
} from "../../services/applicantServices/projectService.js";


// =========================
// CREATE PROJECT
// =========================

export const createProject = async (
  req: Request,
  res: Response
) => {
  try {
    const project =
      await createProjectService(req.body);

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET ALL PROJECTS
// =========================

export const getAllProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const projects =
      await getAllProjectsService();

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET PROJECT BY ID
// =========================

export const getProjectById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const project =
      await getProjectByIdService(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// GET PROJECTS BY APPLICANT
// =========================

export const getProjectsByApplicant = async (
  req: Request<{ applicantId: string }>,
  res: Response
) => {
  try {
    const projects =
      await getProjectsByApplicantService(
        req.params.applicantId
      );

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// UPDATE PROJECT
// =========================

export const updateProject = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const project =
      await updateProjectService(
        req.params.id,
        req.body
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =========================
// DELETE PROJECT
// =========================

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const project =
      await deleteProjectService(
        req.params.id,
        req.body.deleteBy
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};