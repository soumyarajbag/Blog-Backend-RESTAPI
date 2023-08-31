import User from "../models/User.js";

const  getAllUsers = async (req , res , next)=>{
    let users ;
    try{
        users = await User.find();
    }
    catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message : "No Users Found"});
    }
    res.status(200).json({users});
}
export default getAllUsers;