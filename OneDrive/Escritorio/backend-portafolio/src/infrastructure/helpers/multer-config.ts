import { Request, Response, NextFunction } from "express";
import { uploadToS3 } from "../helpers/s3-helper";
import multer from "multer";

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage }).single("file");

export const attachFileToBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if (!req.file) return next();

  try {
    const s3Url = await uploadToS3(req.file);
    console.log(`Archivo subido correctamente a S3 ${s3Url}`)
    req.body.url = s3Url;

    next();
  } catch (err) {
    console.error("Error subiendo a S3:", err);
    return res.status(500).json({ success: false, message: "S3 upload failed." });
  }
};