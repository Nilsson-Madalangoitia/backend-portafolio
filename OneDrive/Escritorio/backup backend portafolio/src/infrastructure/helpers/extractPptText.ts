import officeParser from 'officeparser';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const extractPptxText = async (buffer: Buffer): Promise<string> => {
  // Crear archivo temporal
  const tempFilename = `${uuidv4()}.pptx`;
  const tempFilePath = path.join(__dirname, '../../uploads', tempFilename);

  await fs.writeFile(tempFilePath, buffer);

  return new Promise((resolve, reject) => {
    officeParser.parseOffice(tempFilePath, async (err: any, data: string) => {
      // Borrar el archivo temporal después de procesar
      await fs.unlink(tempFilePath);

      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};