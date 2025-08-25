import { Router } from "express";
import UserService from "../services/UserService";
import multer from "multer";
const router = Router();
const svc = new UserService();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const id  = req.params.id;
      const dir = path.join(process.cwd(), 'uploads', 'usuarios', id);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname) || '.jpg';
      cb(null, 'pp' + ext);
    }
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Solo se permiten archivos de imagen'), false);
      }
      cb(null, true);
    }
  });

//endpoints
router.post('/foto/:id', upload.single('image'), async (req,res)=>{
  try{
    const id=req.params.id;
    const alumno = await svc.geyByIdAsync(id);
      if(!alumno){
        return "falta alumno"
      }
      if(!req.file){
        return "falta archivo"
      }
    
      const relativePath = `/uploads;/usuarios/${id}/${req.file.filename}`
      const publicUrl = `/static/usuarios/${id}/${req.file.filename}`;
      alumno.imagen=publicUrl;

      returnEntity = svc.updateAlumno(alumno);
      if(returnEntity==0){
        return "No se pudo crear al alumno"
      }
  }
  catch(err){
    return "No se puedo actualizar la imagen"
  }
})

export default router;