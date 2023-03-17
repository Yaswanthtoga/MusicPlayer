import albumModel from "../models/album.model.js";
import trackModel from "../models/track.model.js";

// Add New Album
export const addAlbum = async (req,res)=>{
    const { name,imageURL,userId } = req.body;

    // Check the existence of the album name in the same user
    const listAlbums = await albumModel.find({name});
    if(listAlbums.length>0)return res.status(200).json("Album Already Existed");

    try {
        const newAlbum = new albumModel({
            name,
            imageURL,
            userId
        });

        const result = await newAlbum.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json("Server Failed");
    }
};

// Get All the Albums
export const getAllAlbums = async(req,res)=>{
    const { userId } = req.body;

    try {
        const listofalbums = await albumModel.find({userId});
        res.status(200).json(listofalbums);
    } catch (error) {
        res.status(500).json("Server Failed");
    }
}

// Get a specific album
export const getAlbum = async(req,res)=>{
    const { userId } = req.body;
    const { albumId } = req.params;

    try {

        const album = await albumModel.findOne(
            {
                $and:[
                    {userId},
                    {_id:albumId}
                ]
            }
        );

        res.status(200).json(album);
    } catch (error) {
        res.status(500).json("Server Failed");
    }
};

// Delete a specific Album
export const deleteAlbum  = async (req,res)=>{
    const { userId } = req.body;
    const { albumId } = req.params;

    try {
        const album = await albumModel.findOne(
            {
                $and:[
                    {userId},
                    {_id:albumId}
                ]
            }
        );

        if(!album)res.status(200).json("Album doesn't exists");

        // Delete All it's Tracks first
        const { tracks } = album;

        if(tracks.length>0){
            // An Array of awaits
            Promise.all(
                tracks.map((trackId)=>trackModel.deleteOne({_id:trackId}))
            );
        };

        // Then delete the Album itself
        await albumModel.deleteOne({_id:album._id});
        res.status(200).json("Album Deleted Successfully");

    } catch (error) {
        res.status(500).json("Server Failed");
    }
};

