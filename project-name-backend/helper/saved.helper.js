const mongo = require("../model/mongodb");

const helper = {
    findUser(email){
        return mongo.db.collection('code').findOne({email});
    },
    newUser(email,code){
        return mongo.db.collection('code').insertOne({email,code}); 
    },
    addCode(email,code){
        return mongo.db.collection('code').updateOne({email},{$set:{code}})
    },
    deleteCod(email,id){
        return mongo.db.collection('code').updateOne({email},{$pull:{code:{id}}})
    }
}

module.exports = helper;