const createHttpError = require("http-errors");

async function getMealExpense(req, res, next) {
  try {
  } catch (error) {
    next(createHttpError(400, error.message));
  }
}

// async function getMess(req, res, next) {
//   const userId = req?.user?.id;
//   try {
//     const _userToMess = await userToMess.find({ userId: userId });
//     if (_userToMess) {
//       var allMessOfUser = [];
//       for (const u2m of _userToMess) {
//         const messcode = u2m.messCode;
//         const messInfo = await mess.findOne({ code: messcode });
//         const { name, code } = messInfo;
//         allMessOfUser.push({ name, code });
//       }
//       res.status(200).send({
//         success: true,
//         allMessOfUser,
//       });
//     } else {
//       res.status(404).send({
//         success: false,
//       });
//     }
//   } catch (error) {
//     next(createHttpError(5000, error.message));
//   }
// }
module.exports = {
  // getMess,
  getMealExpense,
};
