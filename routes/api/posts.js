const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/posts");

router.post("/", postsCtrl.create);
router.get("/", postsCtrl.index);
router.delete("/:id", postsCtrl.deletePost);
router.get("/details/:postId", postsCtrl.getPost);

module.exports = router;
