const {MongoClient} = require("mongodb");

const mongo = {
    db : null,

    async connect(){
        const client =  new MongoClient("mongodb+srv://samuel:plmqazsam123@guvi-experiment.etqqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        await client.connect()
            .then(() => {
                console.log("connected to the database");
            })
            .catch((err) => {
                console.log("Errorr in connecting to the database::", err);
            })

        // connecting to the databse
        this.db = client.db('markdown');
    }
}

module.exports = mongo;