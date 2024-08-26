const getHome = (req, res, next) => {
  try {
    res.status(200).json({
      message: "welcome home",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHome,
};
