const { 
  failResponse,
  errorResponse
} = require("../helper/response");
const jwt = require("jsonwebtoken");

const userFuncs = require("../funcs/users.funcs");

module.exports.userAuthentication = async function (req, res, next) { 
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== undefined) { 
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      if(!bearerToken) {
        return failResponse(req, res, "no token", 400);
      }
      req.token = bearerToken;
      jwt.verify(
        req.token,
        process.env.AUTH_SECRET_KEY,
        async function (err, AuthData) { 
          if (err) { 
            return failResponse(req, res, "TokenVerificationFailed", 403);
          }

          //get user details
          const user = await userFuncs.getUserById(AuthData._id);

          if (!user) { 
            return failResponse(req, res, "No user", 404);
          }

          if (!user.isActive) { 
            return failResponse(req, res, "Account is deleted", 405);
          }

          req.user = user;
          next();

        }
      )
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
}