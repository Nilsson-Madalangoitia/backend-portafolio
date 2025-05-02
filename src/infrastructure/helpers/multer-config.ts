import multer from 'multer';
import { Request } from 'express';
import fs from 'fs';

// Configuración de multer
const storage = multer.memoryStorage(); // Almacena el archivo en memoria como un buffer
const upload = multer({ storage });

// Middleware para manejar la carga de archivos
export const uploadMiddleware = upload.single('file'); // Espera un campo llamado 'file'

// Función de middleware personalizado para adjuntar el archivo cargado al cuerpo de la solicitud
export const attachFileToBody = (req: Request, res, next) => {
  // Si hay un archivo cargado, lo adjuntamos al cuerpo de la solicitud en la propiedad 'file'
  if (req.file) {
    req.body.file = req.file.buffer;
  }
  next();
};