import { ObjectId } from "mongodb";
import UserModel from "../models/user.model.js";


export async function getAllUsers(req, res) {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
}

export async function userInfo(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try {
        const docs = await UserModel.findById(req.params.id).select("-password");
        res.send(docs);
    } catch (err) {
        console.log('ID unknown : ' + err);
    }
}

export async function updateUser(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    try {
        const docs = await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
        res.send(docs);
    } catch (err) {
        return res.status(500).json({message: err})
    }
}

export async function deleteUser(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }

    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Successfully deleted."});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

export async function follow(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown: ' + req.params.id);
    }
    if (!ObjectId.isValid(req.body.idToFollow)) {
        return res.status(400).send('ID to follow unknown: ' + req.body.idToFollow);
    }
    try {
        const isFollowing = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true }
        );

        const isFollowed = await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true }
        );

        res.status(201).json({ isFollowing, isFollowed });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

export async function unfollow(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown: ' + req.params.id);
    }
    if (!ObjectId.isValid(req.body.idToUnfollow)) {
        return res.status(400).send('ID to unfollow unknown: ' + req.body.idToUnfollow);
    }
    try {
        const isUnfollowing = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true }
        );

        const isUnfollowed = await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true }
        );

        res.status(201).json({ isUnfollowing, isUnfollowed });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}