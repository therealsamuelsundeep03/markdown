const mongo = require("../model/mongodb");

const helper = {
    createUser (username,email,password) {
        return mongo.db.collection('auth').insertOne({username,email,password});
    }
}

module.exports = helper;