const Post = require("../models/post");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const savePost = async (req, res) => {
  if (!req.body.text) return res.status(400).send("Incomplete data");

  let post = new Post({
    userId: req.user._id,
    text: req.body.text,
    status: "to-do",
  });

  let result = await post.save();

  if (!result) return res.status(400).send("Failed to register post");

  return res.status(200).send({ result });
};
const listPost = async (req, res) => {
  let post = await Post.find({ userId: req.user._id });

  if (!post || post.length === 0) return res.status(400).send("No exist post");
  return res.status(200).send({ post });
};
const updatePost = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.status)
    return res.status(400).send("Incomplete data");

  let post = await Post.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    status: req.body.status,
  });

  if (!post) return res.status(400).send("post not found");
  return res.status(200).send({ post });
};

const savePostImg = async (req, res) => {
  if (!req.body.text) return res.status(400).send("Incomplete data");

 
  let imageUrl = "";
  if (req.files.image) {
    if (req.files.image.type != null) {
      const url = req.protocol + "://" + req.get("host") + "/";
      const serverImg =
        "./uploads/" + moment().unix() + path.extname(req.files.image.path);
      fs.createReadStream(req.files.image.path).pipe(
        fs.createWriteStream(serverImg)
      );
      imageUrl =
        url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
    }

  }

  let post = new Post({
    userId: req.user._id,
    text: req.body.text,
    status: "to-do",
    imageUrl: imageUrl,
  });

  let result = await post.save();

  if (!result) return res.status(400).send("Failed to register post");

  return res.status(200).send({ result });
};

const deletePost = async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  let postImg = await Post.findById(req.params._id);
  let serverImg
  if(postImg.imageUrl){ console.log("lo encontramos")
  postImg = postImg.imageUrl;
  postImg = postImg.split("/")[4];
  serverImg = "./uploads/" + postImg;
  }

  const post = await Post.findByIdAndDelete(req.params._id);
  if (!post) return res.status(400).send("post not found");
  try {
    fs.unlinkSync(serverImg);
  } catch (error) {
    console.log("image no found in server");
  }

  return res.status(200).send({ message: "Post deleted" });
};



module.exports = { savePost, listPost, updatePost, savePostImg ,deletePost};
