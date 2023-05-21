const mongoose = require("mongoose");

const blogSchema  = new mongoose.Schema({
            email:{
                type : String,
                required: [true, "Please enter your Email"],
            },
            auther:{
                type : String,
                required: [true, "Auther missing"],
            },
            title:{
                type : String,
            },
            description:{
                type : String,
                required: [true, "Please enter the description"],
            },
            catagory:{
                type : String,
                default : "all"
            },
            profileImage : {
                type : String
            }
        },
        {
            timestamps : true
        }
        );
    
        blogSchema.index({
            title: 'text',
            description: 'text',
            category: 'text',
            author: 'text'
          });

const Blog = mongoose.models.Blog || mongoose.model("Blog",blogSchema);
module.exports = Blog;
