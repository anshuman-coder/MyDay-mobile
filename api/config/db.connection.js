const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

function connectionToDB(url) { 
  return new Promise((resolve, reject) => { 
    mongoose.connect(url)
      .then((result) => { 
        // console.log("database connection successful!");
        resolve("database connection successful!")
      })
      .catch(err => { 
        reject(err)
      })
  })
};

module.exports = { connectionToDB };