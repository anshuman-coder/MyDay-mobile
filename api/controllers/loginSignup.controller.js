const {
  successResponse,
  errorResponse,
  failResponse
} = require("../helper/response");

const loginSignupFuncs = require("../funcs/loginSignup.funcs");

module.signup = async function (req, res) {
  try {
    const {
      fullName,
      userName,
      email,
      password
    } = req.body;

    const checkUser = await loginSignupFuncs.checkUserWithFields({ userName, email });
    if (checkUser) { 
      return failResponse(req, res, "Already a user!", 401);
    }

    const userData = await loginSignupFuncs.createUser({ fullName, userName, email, password });

    return successResponse(req, res, userData);
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

module.isUserNameAvailable = async function (req, res) {
  try {
    const { userName } = req.body;

    if (!userName) { 
      return failResponse(req, res, "Please enter userName!");
    }

    let result = await loginSignupFuncs.checkUserWithFields({ userName });

    if (result) { 
      return failResponse(req, res, "userName not Available!", 400);
    }

    return successResponse(req, res, "Available");
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

module.isEmailAvailable = async function (req, res) {
  try {
    const { email } = req.body;

    if (!email) { 
      return failResponse(req, res, "please provide Email!");
    }

    const result = await loginSignupFuncs.checkUserWithFields({ email });

    if (result) { 
      return failResponse(req, res, "Email is unavailable!");
    }

    return successResponse(req, res, "Available");
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

module.login = async function(req, res) {
  try {
    const { loginMode, loginId, password } = req.body;

    const loginModes = {
      email: true,
      userName: true
    };

    if (!loginModes[loginMode]) { 
      return failResponse(req, res, "Invalid mode of login!");
    }

    const checkUser = await loginSignupFuncs.checkUserWithFields({
      email: loginId,
      userName: loginId
    });

    if (!checkUser) { 
      return failResponse(req, res, "No user!");
    }

    const data = await loginSignupFuncs.login(req.body);

    return successResponse(req, res, data);

  } catch (error) {
    if (error == "Incorrect password!") { 
      return failResponse(req, res, error);
    }
    return errorResponse(req, res, error);
  }
}

module.exports = module