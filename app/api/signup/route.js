import connectDb from '@utils/connectdb';
import User from '@schemas/User';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import bcrypt from "bcrypt"
 
export async function POST(req) {
 try {
    await connectDb();
    const {name,email,password} = await req.json()
    
    if (!name && !email && !password) {
      return NextResponse.status(404).json({success : false , msg : "please fill the following inputs"});
    }
    let encryptedPass = await bcrypt.hash(password,10);
    const match = await User.findOne({email});
    console.log(match);
    if(match){
      return NextResponse.json({success : false , msg : "User with this Email Already Exists!"});
    }
    const user = new User({name,email,password : encryptedPass}); 
    await user.save();
     
    // return NextResponse.status(200).json({token,email, success : true , msg : 'Sign up Successfully!'});
    return NextResponse.json({ success : true , msg : 'Sign up Successfully!'});
    // return NextResponse.redirect("/login");

  // const data = await Blog.find();
  // return NextResponse.json({ data});
} catch (error) {
     return NextResponse.json({ success : false , error : "internal Server error"});
    
 }
}