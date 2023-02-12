require("dotenv").config();
const {
  UserSchema
} = require("../model/index");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");

module.exports.checkUserWithFields = async function (body) { 
  let searchFilter = [];

  for (const [key, value] of Object.entries(body)) { 
    let data = {};
    data[key] = value;

    searchFilter.push(data)
  };

  let result = await UserSchema.find({
    $or: searchFilter
  });

  if (result.length > 0) { 
    return true
  }

  return false;
}

module.exports.createUser = async function (data) { 
  const { fullName, userName, email, password } = data;

  const hashPass = crypto.createHash("md5").update(password).digest("hex");

  const newUser = new UserSchema({
    fullName,
    userName,
    email,
    password: hashPass
  });

  let result = await newUser.save();

  result = result.toObject();

  if (result) { 
    let token = this.createAuthToken(result, { expiryTime: '240h' });

    result.token = token;

    delete result.password;

    return result;
  }
  
}

module.exports.createAuthToken = function (data, { expiryTime }) { 
  delete data.password;
  const token = jwt.sign(data, process.env.AUTH_SECRET_KEY, {
    expiresIn: expiryTime
  });

  return token;
}

module.exports.getUserByEmail = async function (email) { 
  let result = await UserSchema.findOne({ email, isActive: true });

  result = result.toObject();

  if (result) { 
    return result;
  }
  return false;
}

module.exports.getUserByUserName = async function (userName) { 
  let result = await UserSchema.findOne({ userName, inActive: true });

  result = result.toObject();

  if (result) { 
    return result;
  }

  return false;
}

module.exports.login = async function (data) { 
  const { loginMode, loginId, password } = data;
  const hashPass = crypto.createHash("md5").update(password).digest("hex");

  if (loginMode == "email") { 
    let result = await this.getUserByEmail(loginId);

    if (result) {
      

      if (result.password != hashPass) {
        throw "Incorrect password!";
      }

      let token = this.createAuthToken(result, { expiryTime: '240h' });

      result.token = token;

      delete result.password;

      return result;
    }
  }

  if (loginMode == "userName") { 
    let result = await this.getUserByUserName(loginId);

    if (result) {

      if (result.password != hashPass) { 
        throw "Incorrect password!";
      }

      let token = this.createAuthToken(result, { expiryTime: '240h' });

      result.token = token;

      delete result.password;

      return result;
    }
  }

  throw "No user!";
}