const express = require('express');
const router = express.Router();
const followersCtrl = require('../../controllers/followers')

router.user('/users/:id/followers', followersCtrl.create)
router.delete('/followers/:id', followersCtrl.deleteLike)

module.exports = router;