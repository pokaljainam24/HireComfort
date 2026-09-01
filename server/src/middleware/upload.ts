import path from "path";
import fs from "fs";
import multer from "multer";

const uploadPath = path.join(
  process.cwd(),
  "uploads",
  "blogs",
);

// Create uploads/blogs folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
}


// =====================================
// Multer Storage
// =====================================

const storage = multer.diskStorage({

  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

  filename: (_req, file, cb) => {

    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9,
      )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },

});


// =====================================
// File Filter
// =====================================

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb,
) => {

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed",
      ),
    );

  }
};


// =====================================
// Upload Configuration
// =====================================

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;