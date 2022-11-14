const express = require("express");
const categoryapiActions = require("../controllers/categoryapiActions");
const router = express.Router();


router.post("/create-category", categoryapiActions.updateCategory);

module.exports = router;
