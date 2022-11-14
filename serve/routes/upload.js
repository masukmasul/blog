const express = require("express");
const categoryapiActions = require("../controllers/categoryapiActions");
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
    destination : (req,file,cb)=>{
      cb(null,'./images');
    },
    filename : (req,file,cb)=>{
      cb(null,file.originalname);
    }
  })

const upload = multer({storage:storage});
router.post("/",upload.single("file"),(req,res)=>{
    res.status(200).json(
      {
        file : req.file ,
        message : "File has been uploaded"
      }
    );
  });

router.post("/multimages" , upload.array("demo_image"),(req,res)=>{
    res.status(200).json(
        {
          file : req.files,
          message : "File has been uploaded"
        }
      );
})
module.exports = router;
