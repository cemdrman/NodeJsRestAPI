const mongoose = require('mongoose');

const UserShcema = new mongoose.Schema(
    {
        name : {type:String, required:true},
        date : {type:Date, default: Date.now},
        email: String,
        age: { type: Number, min: 18, max: 65 },
        password: String
    }
);

mongoose.model('User',UserShcema);
module.exports = mongoose.model('User');