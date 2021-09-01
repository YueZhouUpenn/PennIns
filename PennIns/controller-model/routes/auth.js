/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { async } = require('validate.js');
const { json } = require('body-parser');

const ReturnMessage = {
  SUCCESS: "success",
  WRONG_PASSWORD: "wrong_password",
  NO_SUCH_USER: "user_not_found",
  ERROR: "server error",
  ALREADY_USED_USER_NAME: "already_used",
}

//密码加密
const encrypt = async (password, saltTimes) => {
  const hash = await bcrypt.hash(password, 10)
  return hash
}
//密码hash校验
const validate = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match
}

router.post('/login', async (req, res) => {

  const { username } = req.body;
  let { password } = req.body;

  console.log({ username });
  console.log({ password });


  User.findOne({ username }, async (err, foundUser) => {

    if (err) {
      console.log(err);
    } else if (foundUser == null) {
      res.json({
        message: ReturnMessage.NO_SUCH_USER,
        no_such_name: username
      });
    } else {
      console.log(foundUser.username);
      console.log(foundUser.password);
      let authRight = await validate(password, foundUser.password);

      if (authRight) {
        console.log(foundUser.password);
        console.log(password);
        res.json({
          message: ReturnMessage.SUCCESS,
          userId: foundUser._id,
        });
      } else if (!authRight) {
        console.log("wrong password");
        res.json({
          message: ReturnMessage.WRONG_PASSWORD,
        });
      } else {
        res.json({
          message: ReturnMessage.ERROR,
        });
      }
    }
  })
});


/* logout */
router.get('/logout', (req, res) => {
  req.logout();
  console.log('log you out!');
});

/* create a new user: user registration */
router.post('/register', async (req, resp) => {
  console.log('CREATE A NEW USER');

  const { username } = req.body;
  const { image } = req.body;
  let { password } = req.body;

  console.log("request comes in: username : " + username);
  console.log("request comes in: image : too long");
  console.log("request comes in: password : " + password);
  var doesUserExitResult = false;
  await User.exists({"username" : username}).then((res) => {
    doesUserExitResult = res;
  });

  if (doesUserExitResult == true) {
    console.log("name [" +username+ "] already used");
    resp.json({
      message: ReturnMessage.ALREADY_USED_USER_NAME,
      alreadyUsedName: username
    });
  } else {
    // eslint-disable-next-line consistent-return
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        // eslint-disable-next-line no-undef
        return next(err);
      }
      // console.log('hashed:', hash);
      // console.log('original password', password);
      password = hash;

      const newUser = {
        username,
        password,
        image,
        posts: [],
        followed: [],
        following: [],
        mentioned: [],
        liking: [],
        commenting: [],
        join: Date.now(),
      };

      User.insertMany(newUser, (err2, result) => {
        if (err2) {
          console.log(err2);
          throw err;
        }
        console.log(`new User success! name: ${result[0].username}`);
        console.log(`new User success! password: ${result[0].password}`);
        resp.json({
          message: ReturnMessage.SUCCESS,
          userId: result[0]._id,
        });
      });
    });
  }
})

module.exports = router;
