import express from 'express';
import { addAlbum, deleteAlbum, getAlbum, getAllAlbums } from '../controller/album.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
const router = express.Router();

// Get All Albums
router.get('/',verifyToken,getAllAlbums);

// New Album Insertion
router.post('/add-album',verifyToken,addAlbum);

// Get only Specific Album
router.get('/:albumId',verifyToken,getAlbum);

// Delete the Specific Album
router.delete('/:albumId',verifyToken,deleteAlbum);

export default router;