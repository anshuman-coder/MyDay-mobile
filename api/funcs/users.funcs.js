const { 
  UserSchema
} = require("../model/index");
module.exports.getUserById = async function (userId) { 
  const result = await UserSchema.findById(userId);

  if (result) { 
    const userData = result.toObject();
    console.log(userData);

    return userData;
  }

  return false
}