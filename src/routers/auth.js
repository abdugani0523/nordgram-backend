import { Router } from "express";
import { LOGIN, REGISTER } from '#controllers/auth.js'
import multer from 'multer';
import { storageOptions, fileFilter, limits } from '#config/upload.js';

const storage = multer.diskStorage(storageOptions)
const upload = multer({
    storage,
    fileFilter,
    limits
})

const router = Router()

router.post('/login', LOGIN);
router.post('/register', upload.single('avatar'), REGISTER);

export default router;