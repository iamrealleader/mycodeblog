import Blog from '@schemas/Blog';
import connectDb from '@utils/connectdb';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from "jsonwebtoken";
 
//get the blogs
export async function GET(req) {
 try {

  await connectDb();

  // we can use this code to get query from searchParams also shorhad code below
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get('id');
  // const catagory = searchParams.get('catagory');
  // const page = searchParams.get('page');
  // const searchquery = searchParams.get('searchquery');
  // console.log(id , catagory , page , searchquery);

  // gettting all query or params values from search params
  //  [id, catagory, page, searchquery] is getting these keys values from an arrray ... it can sometypoe of array desstructuring
  let blogs;
  const { searchParams } = new URL(req.url);
  const [id, catagory, page, searchquery , user ] = ['id', 'catagory', 'page', 'searchquery' , 'user'].map(param => searchParams.get(param));
  if(id){
    // then it will fetch only it 
    // if we give it an id of spacific post in headers
     blogs = await Blog.find({_id : id});
    }
    else if (catagory && page){
      const skip = (page-1)*10
      const limit = (page)*10
      blogs = await Blog.find(catagory === "all" ? {} : {catagory}).skip(skip).limit(limit).sort({$natural : -1});
     }
     else if (searchquery && page){ 
        const skip = (page-1)*10
        const limit = (page)*10
        blogs = await Blog.find(
          { $text: { $search: searchquery } },
          { score: { $meta: 'textScore' } } // Include the text search score in the results
        )
          .sort({ score: { $meta: 'textScore' } }) // Sort by the text search score in descending order
          .skip(skip).limit(limit) // Limit the search results and more result in next request
          .exec();

        // if i want anythying some sepecific like title only the we can use it 
          // .select('auther title description category')
      }else if (user && page){
        const skip = (page-1)*10
        const limit = (page)*10
        console.log(user);
        blogs = await Blog.find({"email" : user}).skip(skip).limit(limit).sort({$natural : -1});
        console.log(blogs);
       }
     else{
      return NextResponse.json({ success : false , msg : "internal Server error"});
     }

    return NextResponse.json( blogs );
} catch (error) {
     return NextResponse.json({ success : false , msg : "internal Server error"}); 
 }
}


// create blogs using this endpoint
export async function POST(req) {
 try {
    await connectDb();

    // Get the token from the request headers

    // Get the blog post data from the request body
    const { title, catagory, description } = await req.json();
    const headersList = headers();
    const token = headersList.get('token');

    // Check that the required fields are provided
    if (!description ) {
      return NextResponse.json({ success: false, message: "Please fill in all required fields" });
    }
    if (!token) {
      redirect(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }

    //  get the user from authentication 
    const user = await verifyToken(token);
    if (user) {
      const newBlog = new Blog({
        email: user.email ? user.email : user.name,
        auther: user.name,
        title,
        catagory,
        description,
        profileImage : user.image
      });

      // Save the new blog post to the database
      await newBlog.save(); 
      return NextResponse.json({ success : true , msg : "Blog has been created Succesfully!"});
    }
    else{
     redirect(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }
  
} catch (error) {
     return NextResponse.json({ success : false , msg : "internal Server error"});
    
 }
}


//upadte th blog
export async function PATCH(req) {
 try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log(id);
    const headersList = headers();
    const token = headersList.get('token');
    const {title,catagory,description} = await req.json();
    if (!token) {
      redirect(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }

    let user = await verifyToken(token);
    if(user){
      let blog = await Blog.find({_id : id});
      if(user.email === blog[0].email){
      await Blog.findByIdAndUpdate({_id : id},{title,email : user.email ? user.email : user.name ,auther : user.name,catagory,description}, {new : true,upsert : true});
      return NextResponse.json({success : true , msg : "Blog has been updated Successfully!"});   
      }
      else{
        return NextResponse.json({ success : false , msg : "Invalid user"});
      }
    }else{
     redirect(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }
} catch (error) {
  // console.log(error);
     return NextResponse.json({ success : false , msg : "internal Server error"});
    
 }
}

// to delte a post 
export async function DELETE(req) {
 try {
    await connectDb();
    const headersList = headers();
    const token = headersList.get('token');
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!token) {
      redirect(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }

    let user = await verifyToken(token);
    if(user){
      let blog = await Blog.find({_id : id});
      if(user.email ===  blog[0].email){
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({success : true , msg : "Blog Deleted Successfully!"});
      }
      else{
        return NextResponse.json({ success : false , msg : "Invalid user"});
      }
         
    }
    else{
      redirect(`${process.env.NEXT_PUBLIC_HOST}/login`);
    }
} catch (error) {
     return NextResponse.json({ success : false , msg : "internal Server error"});
    
 }
}


// verify the token sended in ther headers
async function verifyToken(token){
    let secret = process.env.JWT_SECRET;
    let user = jwt.verify(token,secret);
    return user;
}