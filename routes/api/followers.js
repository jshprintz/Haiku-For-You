const express = require('express');
const router = express.Router();
const followersCtrl = require('../../controllers/followers')

router.post('/user/:id/followers', followersCtrl.create)
router.delete('/followers/:id', followersCtrl.deleteFollower)

module.exports = router;