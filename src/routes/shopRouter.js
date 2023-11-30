import express from 'express';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const carritoRouter = express.Router();

carritoRouter.get('/shop', async (req, res) => {
    // Ruta al archivo HTML que deseas enviar
    const htmlFilePath = path.join(__dirname, '../../public/HTML/productos.html');
  
    // Envía el archivo HTML como respuesta
    res.sendFile(htmlFilePath);
  });
  

//loginrouter.post('/', async(req,res)=>{
//const result = await users.postUsers(req.body);
//})

export default shopRouter;





