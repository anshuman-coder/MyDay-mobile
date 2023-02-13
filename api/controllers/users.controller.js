const { 
  successResponse,
  failResponse,
  errorResponse
} = require("../helper/response");
const userFuncs = require("../funcs/users.funcs");

module.exports.getUserProfileById = async function (req, res) { 
  try {
    let { userId } = req.body;
    if (!userId) userId = req.user.id;

    const data = await userFuncs.getUserById(userId);
    if (!data) { 
      return failResponse(req, res, "No user", 404);
    }

    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
}