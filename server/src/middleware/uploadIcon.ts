import multer from "multer";
import path from "path";
import fs from "fs";

// =====================================
// STORAGE
// =====================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDirectory = "";

    // =====================================
    // JOB CATEGORY
    // =====================================

    if (req.baseUrl.includes("job-categories")) {
      uploadDirectory = "uploads/job-categories";
    }

    // =====================================
    // JOB SUB CATEGORY
    // =====================================
    else if (req.baseUrl.includes("job-sub-categories")) {
      uploadDirectory = "uploads/job-sub-categories";
    }

    // =====================================
    // BLOG
    // =====================================
    else if (req.baseUrl.includes("blogs")) {
      uploadDirectory = "uploads/blogs";
    }

    // =====================================
    // INVALID ROUTE
    // =====================================
    else {
      return cb(new Error("Invalid upload directory"), "");
    }

    // Create folder if not exists
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, {
        recursive: true,
      });
    }

    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    let filePrefix = "";

    // =====================================
    // JOB CATEGORY
    // =====================================

    if (req.baseUrl.includes("job-categories")) {
      filePrefix = "job-category";
    }

    // =====================================
    // JOB SUB CATEGORY
    // =====================================
    else if (req.baseUrl.includes("job-sub-categories")) {
      filePrefix = "job-sub-category";
    }

    // =====================================
    // BLOG
    // =====================================
    else if (req.baseUrl.includes("blogs")) {
      filePrefix = "blog";
    }

    // =====================================
    // INVALID ROUTE
    // =====================================
    else {
      return cb(new Error("Invalid upload file prefix"), "");
    }

    const extension = path.extname(file.originalname);

    const fileName = `${filePrefix}-${Date.now()}${extension}`;

    cb(null, fileName);
  },
});

// =====================================
// FILE FILTER
// =====================================

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, WEBP and SVG images are allowed"));
  }
};

// =====================================
// MULTER
// =====================================

const uploadIcon = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export default uploadIcon;
