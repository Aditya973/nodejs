const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    industry : String
});

module.exports = mongoose.model('Client',customerSchema); // model(name of collection in mongodb, schema)
// mongo db pluralizes the name of the collection and set the first letter to lowercase(ex: Client -> clients)
// exports -> means what things are we going to export from the customer.js file when we import them or require them on other file like app.js