const express = require('express')
const router = express.Router()

router.route('/register').post(require('../Controller/AuthController').register);

router.route('/login').post(require('../Controller/AuthController').login);

router.route('/find/:userId').get(require('../Controller/AuthController').findUser);
router.route('/').get(require('../Controller/AuthController').getuser);


module.exports = router