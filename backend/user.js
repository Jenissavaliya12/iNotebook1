const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    Name : {
        type : String   
    },
    Email : {
        type : String
    }
})

const user = mongoose.model("user" , userschema)
module.exports = user