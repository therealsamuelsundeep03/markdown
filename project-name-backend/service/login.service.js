const {ObjectId} = require('mongodb');

const helper = require("../helper/login.helper");

const service = {
    async findUser(req,res){
        try{
            const email = req.body.email;
            const password = req.body.password;
            console.log(email,password);

            // checking if the email exists, if exists then check the password...
            let response = await helper.findUserByEmail(email);
            console.log(response)
            if(response === null){
                    res.status(200).send( "Email doesnt exists");
            }else{
                const {username,email} = response 

                // if the password is correct then redirect to the login page or send the message...
                if(response.password == password){
                    res.status(200).json({"UserExists":`${username},${email}`});           
                }else{
                    res.status(200).send("password is incorrect");
                }
            }
        }catch(err){
            console.log("Error in verifing the user::",err);
        }
    }
}

module.exports = service;