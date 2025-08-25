import { Router } from "express";
import UserService from "../services/UserService.js"; // <-- ruta relativa + .js
import fs from "fs";
import path from "path";
import multer from "multer";

const router = Router();
const svc = new UserService();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.params.id;
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
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten archivos de imagen'), false);
    }
    cb(null, true);
  }
});

router.post('/foto/:id', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const alumno = await svc.geyByIdAsync(id);
    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }
    if (!req.file) {
      return res.status(404).json({ error: "Falta archivo" });
    }

    const publicUrl = `/static/usuarios/${id}/${req.file.filename}`;
    alumno.imagen = publicUrl;

    const returnEntity = await svc.updateAlumno(alumno);
    if (returnEntity == 0) {
      return res.status(500).json({ error: "No se pudo actualizar el alumno" });
    }

    res.json({ mensaje: "Imagen actualizada", alumno });
  } catch (err) {
    res.status(500).json({ error: "No se pudo actualizar la imagen" });
  }
});

export default router;
