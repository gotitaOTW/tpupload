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
router.post('/foto/:id',upload)

export default router;