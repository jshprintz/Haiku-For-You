const User = require("../models/user");

module.exports = {
  create,
  deleteFollower,
};

//We want to add the id of the user who's post we clicked on
// to the followers list of the logged in user.

async function create(req, res) {
console.log(req.params, "<---  req.params (POST USER WE WANT TO ADD")
console.log(req.user, "<---Req.user")

  try {
    const user = await User.findById(req.params.id);
    console.log(user, "<--AHA THE USER")
    user.followers.push({ username: req.user.username, userId: req.user._id });
    await user.save();
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
