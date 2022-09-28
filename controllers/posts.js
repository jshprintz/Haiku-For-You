const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  create,
  index,
  deletePost,
  getPost,
};

async function create(req, res) {
  try {
    const post = await Post.create({
      lineOne: req.body.lineOne,
      lineTwo: req.body.lineTwo,
      lineThree: req.body.lineThree,
      user: req.user,
      title: req.body.title,
    });

    res.status(201).json({ data: post });
  } catch (err) {
    res.status(400).json({ err });
  }
}


// INDEX
async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ data: posts });
  } catch (err) {
    res.status(400).json({ err });
  }
}

// DELETE
async function deletePost(req, res) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(201).json({});
  } catch (err) {
    console.log(err, "<<-Error in deletePost controller");
    res.status(400).json({ err });
  }
}

// Get
async function getPost(req, res) {
  try {
    const temp = await Post.findById(req.params.postId);
    const user = await User.findById(temp.user._id);
    const posts = await Post.findById(req.params.postId)
      .populate("user")
      .exec();

    res.status(201).json({
      data: {
        posts: posts,
        user: user,
      },
    });
  } catch (err) {
    console.log(err, "<<-Error in getpost controller");
    res.status(400).json({ err });
  }
}
