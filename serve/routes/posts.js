const express = require("express");
const postapiAction = require("../controllers/postapiActions");
const router = express.Router();

router.post("/create-post", postapiAction.createPost);
router.put("/:id", postapiAction.updatePost);
router.delete("/:id", postapiAction.deletePost);

router.get("/:id", postapiAction.getOnePost);
router.get("/", postapiAction.getAllPost);

module.exports = router;
