const Category = require("../models/Category");

const categoryapiActions = {
  updateCategory: async (req, res) => {

    const category =await new Category(req.body);
    try{
     const saved =await category.save();
     saved &&  res.status(200).json({
      category:saved,
    })
  }catch(e){
    res.status(400).json({
      message:e.message,
    })
  }
  },
  getCategory: async (req, res) => {
    try{
      const category =await Category.find();
      category &&  res.status(200).json({
      category:category,
    })
  }catch{
    res.status(400).json({
      category:category,
    })
  }
  },

};
module.exports = categoryapiActions;
