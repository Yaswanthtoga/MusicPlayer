import express from 'express';
import { verifyToken } from "../middlewares/verifyToken.middleware.js"
import { addTrack, deleteTrack, getTracks } from '../controller/track.controller.js';
const router = express.Router();

// Add New Track
router.post('/:albumId/add-track',verifyToken,addTrack);

// Get all the Tracks
router.get('/:albumId',verifyToken,getTracks);

// Delete a track
router.delete('/:trackId',verifyToken,deleteTrack);

export default router;