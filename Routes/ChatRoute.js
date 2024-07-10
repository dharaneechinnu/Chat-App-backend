const express = require("express");
const router = express.Router()

router.route('/').post(require('../Controller/ChatController').CreateChat);
router.route('/:userId').get(require('../Controller/ChatController').finduserchat);
router.route('/find/:firstId/:secondId').get(require('../Controller/ChatController').findchat);

module.exports = router;