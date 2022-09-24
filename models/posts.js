const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    poem: String,
    likes: [likesSchema]
}, {
    timestamps: true
  });

module.exports = mongoose.model("Post", postSchema)