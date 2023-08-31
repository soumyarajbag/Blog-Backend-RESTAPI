import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,

    },
    email : {
        type : String ,
        required : true,
        unique : true ,
    },
    password : {
        type : String ,
        required : true,
        minlength : 8 ,
    },
    blogs:[{type : mongoose.Schema.Types.ObjectId , ref : "Blog" , required : true }]
});

export default mongoose.model("User", UserSchema);