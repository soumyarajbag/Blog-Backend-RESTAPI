const {Blog}  = require("../models/Blog.js");
const {User}  = require("../models/User.js");

 const getAllBlogs = async (req , res ,next)=>{
    let blogs ;
    try{
        blogs = await Blog.find();
    }
    catch(err){
      return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message : "No Blogs Found"});
    }
    return res.status(200).json({blogs});
};

 const addBlog = async (req , res , next)=>{
    let {title , description , image , user} = req.body;
    let existingUser ;
    try{
        existingUser = await User.findById(user);
    }
    catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message : "User Not Found !"});
    }
    
    const blog = new Blog({
        title , 
        description ,
        image ,
        user
    })
   try{
     const session = await mongoose.startSession();
     session.startTransaction();
     await blog.save({session});
     existingUser.blogs.push(blog);
     await existingUser.save({session})
     await session.commitTransaction();
   }
   catch(err){
         return console.log(err);
        
   }
   return res.status(201).json({blog , message : "New Blog Created"});
};

 const updateBlog = async (req, res, next )=>{
    const {title , description } = req.body;
      const blogId = req.params.id ;
      let blog ;
        
      try{
        blog = await Blog.findByIdAndUpdate(blogId , {
            title , 
            description 
      })
      }
      catch(err){
        return console.log(err);
      }
      if(!blog){
        return res.status(500).json({message : "Failed to Update the Blog !"});
      }
      return res.status(200).json({ blog , message : "Blog Updated Successfully !"});
};

 const getBlogbyId = async (req , res , next)=>{
    const blogId = req.params.id ;
    let blog ;
    try{
    blog = await Blog.findById(blogId).exec();
    }
    catch(err){ 
      return console.log(err);
    }
    if(!blog){
      return res.status(404).json({message : "No Blog Found !"});
    }
    return res.status(200).json({blog});
} ;

 const DeleteBlog =async (req , res , next)=>{
    const blogId = req.params.id ;
    let blog ;
    try{
        blog = await Blog.findByIdAndRemove(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(500).json({message : "Failed to Delete the Blog !"});
    }
    return res.status(200).json({message : "Blog Deleted Successfully !"});

};

 const getUserBlogs = async (req , res , next)=>{
    const userId = req.params.id ;
    let userBlogs ;
    try{
        userBlogs = await User.findById(userId).populate('blogs');

    }
    catch(err){
        return console.log(err);
    };
    if(!userBlogs){
        return res.status(404).json({message : "No Blogs Found !"});
    }
    return res.status(200).json({userBlogs});
}
module.exports = {getAllBlogs , addBlog , updateBlog , getBlogbyId , DeleteBlog , getUserBlogs}
