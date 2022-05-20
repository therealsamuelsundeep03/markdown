const {ObjectId} = require('mongodb');
const { findUser } = require('../helper/saved.helper');

const helper = require("../helper/saved.helper");

const service = {

    // adding code to the database...
    async saveCode(req,res){
        try{
            const {title,markdown,email} = req.body;

            // if only the feilds are filled, only then go to further proceedings.. else send
            // message sending that all the feild must be filled...

            if(title,markdown,email){
                const userInfo = await helper.findUser(email);
                // console.log(userInfo)
                // if user already exists in the code record then add new code to the array..
                if(userInfo){
                    const save = [...userInfo.code];
                    const id = ObjectId();
                    save.push({title,markdown,id});
                    const saveCode = await helper.addCode(email,save);
                    console.log("new project is added to the user's array::", saveCode);
                    res.status(200).send("Project added to your list")
                }else{

                    const id = ObjectId();
                    console.log(id)
                    // if user is new then add him to the code record and save the code in an array feild...
                    const newUser = await helper.newUser(email,[{title, markdown,id}]);
                    console.log(newUser);
                    res.status(200).send("codesaved");
                }
            }else{
                res.send("Fill all the input");
            }
        }
        catch(err){
            console.log("Error in sving the code to the database::", err);
            res.status(500).send("Error in sving the code to the database");
        }
    },

    // getting code from the database...
    async getCode (req,res) {
        try{

            // query the user by id if there the user is present meaning he had
            // saved code before send the code, or else the user didn't saved any
            // code...

            const userInfo = await helper.findUser(req.body.email);
            const {_id} = {...userInfo};
            const id = (ObjectId(_id).toString())
            if(userInfo){
                res.status(200).json({status:'success',saved:userInfo.code,id});
            }else{
                console.log("no code saved");
                res.status(200).send("No Codes Saved");
            }
        }catch(err){
            console.log("Error in retrieving the saved code::", err);
            res.status(500).json({status : "success", error:"Error in retrieving the saved code"});
        }
    },

    // delete a code from the database
    async deleteCode (req,res){
        const {email,id} = req.params;
        const response = await helper.deleteCod(email,ObjectId(id));
        console.log(response);
        res.status(200).send("code deleted")
    }
}

module.exports=service;