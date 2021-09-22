const express = require('express');
const {SignUp, Login} = require('../mongoDB/controller/user')

const router = express.Router();

router.post("/signup", SignUp);

router.post("/login", Login);


module.exports = router;