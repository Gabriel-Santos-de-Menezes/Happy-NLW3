import { request } from 'express';
import multer from 'multer';
import path from 'path';

export default{
    //Onde armazenar as imagens
    storage: multer.diskStorage({
        //retona o caminho até o diretorio config
        destination: path.join(__dirname, '..', '..', 'uploads'),
        //Novo nome para a imagem
        filename: (request, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`
            
            cb(null, filename);
        },
    })
};