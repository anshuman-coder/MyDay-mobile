require("dotenv").config();
const express = require("express");
const dbCon = require("./db.connection");
const app = express();
const Routes = require("../routes/index");

//database connection code
dbCon.connectionToDB(process.env.DB_HOST)
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err)
  });

//application json middleware
app.use(express.json());

app.use("/api", Routes);


const port = process.env.API_POST || 8080
app.listen(port, () => { 
  console.log(`server is running on http://localhost:${port}/`);
})