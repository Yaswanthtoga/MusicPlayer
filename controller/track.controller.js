import trackModel from "../models/track.model.js";
import albumModel from "../models/album.model.js"

// Add New Track
export const addTrack = async (req,res)=>{
    const { userId } = req.body;
    const { albumId } = req.params;

    try {
        // Album Find
        const album = await albumModel.findOne({
            $and:[
                {_id:albumId},
                {userId}
            ]
        });

        if(!album)return res.status(404).json("Album doesn't exists");

        // Create New Track add into the tracks
        const newTrack = new trackModel({
            name: req.body.name,
            imageURL: req.body.imageURL,
            songUrl: req.body.songUrl,
            albumId: albumId,
            artists: req.body.artists,
            language: req.body.language,
            category: req.body.category
        });

        const result = await newTrack.save();

        // Add this TrackId into the Specific Album Id
        await albumModel.findOneAndUpdate({_id:albumId},{
            $push:{ tracks:result._id }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json("Server Failed");
    }
};

// Get all tracks
export const getTracks = async(req,res)=>{
    const { albumId } = req.params;
    const { userId } = req.body;

    try {
        // Album Find
        const album = await albumModel.findOne({
            $and:[
                {_id:albumId},
                {userId}
            ]
        });

        if(!album)return res.status(404).json("Album doesn't exists");

        // Get All the Tracks
        const tracks = await trackModel.find({ albumId });

        res.status(200).json(tracks);

    } catch (error) {
        res.status(500).json("Server Failed");
    }
};

// Delete a track
export const deleteTrack = async (req,res)=>{
    const { trackId } = req.params;
    
    try {
        // Find the track
        const track = await trackModel.findOne({_id:trackId});
        if(!track)return res.status(404).json("Track doesn't exits");

        // Delete in Album First
        const { albumId } = track;
        await albumModel.updateOne({_id:albumId},{
            $pull:{
                tracks:trackId
            }
        });

        // Then delete the Track
        await trackModel.deleteOne({ _id:trackId });

        res.status(200).json("Track Deleted Successfully");
        
    } catch (error) {
        res.status(500).json("Server Failed");
    }
}
