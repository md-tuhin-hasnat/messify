
const getUser = async (req, res, next) => {
  try {
    if(req.isAuthenticated()){
      const {name, image} = req.user;
      res.status(200).send({
        success:true,
        user: {name, image},
      });
    }
    else res.status(401).send({success:false, message:"Not Authorized"});
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getUser,
};
