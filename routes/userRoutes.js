const express = require('express');
const {AddNewUser, getAllUsers , LoginUser } = require('../controllers/userController.js');
const router = express.Router();

router.get('/' , getAllUsers);
router.post("/signup" , AddNewUser );
router.post("/login" , LoginUser);
module.exports =  router;