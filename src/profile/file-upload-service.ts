// import { Injectable } from '@nestjs/common';
// import { existsSync, mkdirSync } from 'fs';
// import { writeFile } from 'fs/promises';
// import { join } from 'path';
// import { v4 as uuid } from 'uuid';

// @Injectable()
// export class FileUploadService {
//   private readonly uploadDir = 'uploads';

//   constructor() {
//     this.ensureUploadDirectoryExists();
//   }

//   private ensureUploadDirectoryExists() {
//     if (!existsSync(this.uploadDir)) {
//       mkdirSync(this.uploadDir, { recursive: true });
//     }
//   }

//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     const fileName = `${uuid()}-${file.originalname}`;
//     const filePath = join(this.uploadDir, fileName);
    
//     await writeFile(filePath, file.buffer);
    
//     return `/${this.uploadDir}/${fileName}`;
//   }
// }
