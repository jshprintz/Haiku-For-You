const Post = require("../models/post");


module.exports = {
  create,
  index,
};

async function create(req, res) {
  console.log(req.body, "<-Req.BODY posts controller");
  console.log(req.user, "<--Here is the user")

  try {
    const post = await Post.create({
      poem: req.body.poem,
      user: req.user,
      title: req.body.title,
    });
    
    res.status(201).json({ data: post });
  } catch (err) {
    res.status(400).json({ err });
  }
}

async function index(req, res) {
    
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ err });
  }
}
