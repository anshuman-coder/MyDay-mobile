require("dotenv").config();
const express = require("express");
const dbCon = require("./db.connection");
const app = express();



//database connection code
dbCon.connectionToDB(process.env.DB_HOST)
  .then(result => { 
    console.log(result);
  })
  .catch(err => { 
    console.log(err)
  })


app.listen(8080, () => { 
  console.log(`server is running on http://localhost:${8080}/`);
})