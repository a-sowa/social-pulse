import Router from 'express';
import * as postController from '../controllers/post.controller.js';
import multer from 'multer';
import { fileValidationMiddleware } from '../middleware/fileValidationMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router(); 

router.get('/', postController.readPost);
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// Comments routes
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

export default router;