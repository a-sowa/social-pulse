import Router from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as userController from '../controllers/user.controller.js';
import * as uploadController from '../controllers/upload.controller.js';
import { fileValidationMiddleware } from '../middleware/fileValidationMiddleware.js';
import multer from 'multer';

const router = Router(); 
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logOut);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo); 
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

router.post('/upload', upload.single('file'), fileValidationMiddleware, uploadController.uploadProfil);

export default router;