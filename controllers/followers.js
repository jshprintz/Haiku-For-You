const User = require("../models/user");

module.exports = {
  create,
  deleteFollower,
};

async function create(req, res) {
  try {
    const user = await User.findById(req.params.id);
    // What this is doing is it's adding the logged in user to the user from the post
    // that the logged in user wanted to follow, hence, followers list on the post user
    user.followers.push({ username: req.user.username, userId: req.user._id });
    await user.save();
    // const loggedInUser = await User.findById(req.user._id);
    // loggedInUser.followers.push({ username: user.username, userId: user._id});
    // await loggedInUser.save();
    res.status(201).json({ data: "follower added" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function deleteFollower(req, res) {
  try {
    const user = await User.findOne({
      "followers._id": req.params.id,
      "followers.username": req.user.username,
    });
    user.followers.remove(req.params.id);
    await user.save();
    res.json({ data: "follwer removed" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
