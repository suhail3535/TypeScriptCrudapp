const mongoose = require("mongoose")
const connection = mongoose.connect("mongodb+srv://khansohail015:crudapp@cluster0.tdxufn4.mongodb.net/AllUserData?retryWrites=true&w=majority")
const userSchema = mongoose.Schema(
    {
        name: String,
        email:String,
        course: String,
        age: Number,
        mobile: Number,
        gender:String

    },
    {
        versionKey: false,
    }
);

const UserModel = mongoose.model("userDetails", userSchema);


module.exports = {
    connection,
    UserModel
}