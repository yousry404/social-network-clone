const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const postCtrl = require("../controllers/post.controller");
const passport = require("passport")
router.post("/signup", userCtrl.signUp)
router.post("/login", userCtrl.logIn)
router.get("/posts", passport.authenticate("jwt", { session: false}) , postCtrl.getPosts )
router.post("/add-post", passport.authenticate("jwt", { session: false}) , postCtrl.addPost )
router.post("/edit-post", passport.authenticate("jwt", { session: false}) , postCtrl.editPost )
module.exports = router;