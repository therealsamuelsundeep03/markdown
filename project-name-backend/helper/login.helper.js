const mongo = require("../model/mongodb");

const helper = {
    findUserByEmail(email){
        return mongo.db.collection('auth').findOne({email});
    }
}

module.exports = helper;