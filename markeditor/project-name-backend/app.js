const express = require("express");
const cors = require('cors');
require('dotenv').config()


const mongo = require("./model/mongodb");
const loginRouter = require("./routes/login.route");
const verifyRouter = require("./routes/verify.route");
const createRouter = require("./routes/create.route.js");
const savedRouter = require("./routes/saved.route");

const app = express();

(async () => {
    // establishing a connection to the database...
    await mongo.connect();

    // middleware.
    app.use(express.json());
    app.use(cors());
    app.use((res,req,next) => {
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
        res.header("Access-Control-Allow-Methods","PUT,DELTE,POST,GET,OPTIONS");
        next();
    })


    // routes for login, signup , create user and save code...
    app.use("/login",loginRouter);
    app.use("/verify",verifyRouter);
    app.use("/createaccount",createRouter);
    app.use("/saved",savedRouter);

})()

// port connection
app.listen(process.env.PORT,()=>{
    console.log(`server is listening at ${process.env.PORT}`)
})