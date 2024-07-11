import { PostModel } from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import * as utilsErrors from "../utils/errors.utils.js";
import { ObjectId } from "mongodb";
import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function readPost(req, res) {
  try {
    const docs = await PostModel.find().sort({ createdAt: -1 });
    res.send(docs);
  } catch (err) {
    console.log("Error to get data : " + err);
  }
}

export async function createPost(req, res) {
  let fileName;

  if (req.file) {
    try {
      fileName = req.body.posterId + Date.now() + ".jpg";
      const uploadPath = path.join(
        __dirname,
        "../client/public/uploads/posts",
        fileName
      );

      await fs.writeFile(uploadPath, req.file.buffer);
    } catch (err) {
      const errors = utilsErrors.uploadErrors(err);
      return res.status(400).json({ errors });
    }
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function updatePost(req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  try {
    const docs = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true }
    );
    res.send(docs);
  } catch (err) {
    console.log("Update error : " + err);
  }
}

export async function deletePost(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    const docs = await PostModel.findByIdAndDelete(req.params.id);
    res.send(docs);
  } catch (err) {
    console.log("Delete error : " + err);
  }
}

export async function likePost(req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const likedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    );
    const likingUser = await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    );
    res.send(likingUser);
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function unlikePost(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    const unlikedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    );
    const unlikingUser = await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    );
    res.send(unlikingUser);
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function commentPost(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    const docs = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    );
    res.send(docs);
  } catch (err) {
    return res.status(400).send(err);
  }
}

export async function editCommentPost(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }

  try {
    const docs = await PostModel.findById(req.params.id);
    const theComment = docs.comments.find((comment) =>
      comment._id.equals(req.body.commentId)
    );
    if (!theComment) {
      return res.status(404).send("Comment not found");
    }
    theComment.text = req.body.text;

    try {
      docs.save();
      res.status(200).send(docs);
    } catch (err) {
      return res.status(500).send(err);
    }
  } catch (err) {
    return res.status(400).send("Not ok" + err);
  }
}

export async function deleteCommentPost(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    const docs = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    );
    return res.send(docs);
  } catch (err) {
    return res.status(400).send(err);
  }
}
