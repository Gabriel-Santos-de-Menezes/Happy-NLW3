import { Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesControllers'


const routes = Router();
const upload = multer(uploadConfig);

//index, show, create, update, delete

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images') ,OrphanagesController.create);
    //console.log(request.query)
    //console.log(request.params)
    //console.log(request.body)

export default routes;