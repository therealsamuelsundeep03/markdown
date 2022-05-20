const nodemailer = require("nodemailer");

const helper = require("../helper/verify.helper");
const loginHelper = require("../helper/login.helper");

const service = {
    async verifyUser(req,res) {
        try{
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            console.log(username,email,password)


            if(username,email,password){
                const isUserExist = await loginHelper.findUserByEmail(email);
                if(isUserExist){
                    res.status(200).send("User Exists");
                    console.log("User Exists");
                }else{
                    console.log("user can be created");
                
                    // console.log(process.env.PASSWORD);

                    // if email doesn't exists
                    // sending a verification code to the gmail...
                    const transporter = nodemailer.createTransport({
                        service : "gmail",
                        auth : {
                            user: "hebestore6@gmail.com",
                            pass: `${process.env.PASSWORD}`
                        }
                    });
 
                     // generating a random code as a verification... 
                    let code = num = Math.floor(9000*Math.random())+1000;
                    const mailOptions = {
                        from : "hebestore6@gmail.com",
                        to : email,
                        subject : "verification of your account",
                        text : `Hi ${username},
                         This is to verify your email address, please enter the code ${code} in the website to login `
                    }
 
                    const sendResponse = (response) => {
                        res.send({response,code});
                    }
 
                    transporter.sendMail(mailOptions,(err,res) => {
                        if(err){
                            console.log("Error in sending the mail::", err);
                            sendResponse("Error in sending the mail");
                        }else{
                            console.log("Email sent::", res.response);
                             sendResponse("Email sent");
                        }
                    })
                }
            }else{
                res.send("fill all the inputs");
            }
        }
        catch(err){
            console.log("Error in Validating the User::", err);
            res.status(500).send("Error in validating the user");
        }
    }
}

module.exports = service;