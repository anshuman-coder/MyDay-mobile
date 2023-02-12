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

  // console.log(searchFilter);

  const result = await UserSchema.find({
    $or: searchFilter
  });

  // console.log(result)

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