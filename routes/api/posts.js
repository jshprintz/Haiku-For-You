const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');


// /*---------- Public Routes ----------*/
router.post('/', postsCtrl.create);
router.get('/', postsCtrl.index);
router.delete('/:id', postsCtrl.deletePost);


/*---------- Protected Routes ----------*/




module.exports = router;