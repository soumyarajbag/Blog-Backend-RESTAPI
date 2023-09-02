const express = require("express");
const { getAllBlogs , addBlog ,updateBlog , getBlogbyId , DeleteBlog , getUserBlogs } = require('../controllers/blogController.js');


const blogRouter = express.Router();

blogRouter.get('/' , getAllBlogs );
blogRouter.post('/add' , addBlog);
blogRouter.put('/update/:id' , updateBlog);
blogRouter.get('/:id' , getBlogbyId );
blogRouter.delete('/delete/:id' , DeleteBlog);
blogRouter.get('/user/:id' , getUserBlogs);

module.exports = blogRouter ;