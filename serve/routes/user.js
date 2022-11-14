const express = require("express");
const userapiActions = require("../controllers/userapiActions");
const router = express.Router();

router.post("/register", userapiActions.registerUser);

router.post("/login", userapiActions.loginUser);
router.post("/forgotpassword", userapiActions.forgotPassword);

router.put("/:id", userapiActions.updateUser);
router.put("/passwordreset/:resetid", userapiActions.resetPassword);

router.delete("/:id", userapiActions.deleteUser);

router.get("/:id", userapiActions.getOneUser);
router.get("/", userapiActions.getAllUser);

module.exports = router;
