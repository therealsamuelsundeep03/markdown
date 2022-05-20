const helper = require("../helper/create.helper");

const service = {
    async user (req,res) {
        try{
            const {username,email,password} = req.body;
            console.log(username,email,password)
            if(username,email,password){
                let response = await helper.createUser(username,email,password);
                console.log("user created::", response);
                res.status(200).send("user created");
            }
        }
        catch(err){
            console.log("Error in creating the user::",err);
            res.status(500).send("Error in creating the user");
        }
    } 
}

module.exports = service;