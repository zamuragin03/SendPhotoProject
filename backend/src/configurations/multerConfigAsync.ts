import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerConfigForPhotos: MulterOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            const media_id = req.params.id;
            const media_path = `./user_photos/${media_id}`;
            
            // Проверка, существует ли папка
            if (fs.existsSync(media_path)) {
                const filesInDir = fs.readdirSync(media_path);
                const imageFiles = filesInDir.filter(f => ['.jpeg', '.png', '.jpg'].includes(extname(f)));
                
                // Проверка наличия фото
                if (imageFiles.length > 0) {
                    return cb(new BadRequestException('Фото уже добавлено. Удалите текущее для его обновления'), null);
                }
            }

            // Создание папки, если она не существует
            fs.mkdirSync(media_path, { recursive: true });
            cb(null, media_path);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = uuidv4();
            cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
    }),
    dest: 'user_photos',
    limits: {
        fileSize: 1024 * 1024 * 10, // Лимит на размер файла: 10MB
    },
    fileFilter: (req, file, callback) => {
        const allowedFormats = ['.jpeg', '.png', '.jpg'];
        const ext = path.extname(file.originalname).toLowerCase();
        
        // Проверка формата файла
        if (!allowedFormats.includes(ext)) {
            return callback(new BadRequestException('Only images are allowed'), false);
        }
        callback(null, true);
    },
};
