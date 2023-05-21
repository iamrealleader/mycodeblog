import User from '@schemas/User';
import connectDb from '@utils/connectdb';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import jwt from "jsonwebtoken";
 
//get the blogs
export async function GET(req) {
    try {
        await connectDb();
        const { searchParams } = new URL(req.url);
        const user = searchParams.get('user');
        let myuser = await User.find({"email" : user});
        return NextResponse.json({success : true , myuser : myuser[0]}); 
       
    } catch (error) {
         return NextResponse.json({ success : false , msg : "internal Server error"});
        
     }
}