exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got the access to this data",
  });
};
