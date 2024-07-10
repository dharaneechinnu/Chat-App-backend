const express = require("express");
const { createMessage, getmessages } = require("../Controller/MessageController");
const router = express.Router()

router.route('/').post(createMessage);
router.route('/:chatId').get(getmessages);

module.exports = router;