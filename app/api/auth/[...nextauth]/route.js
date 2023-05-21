import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from '@utils/connectdb';
import User from '@schemas/User';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// import User from '@models/user';
// import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        let user;
        try {
          await connectDb();
          const {email,password} = credentials;
          if (!email || !password) {
            return user = null;
          }
          
          const match = await User.findOne({email});
          
          if(match){
            let encryptedPass = await bcrypt.compare(password,match.password);
            if(encryptedPass){
                      return user = match;
                  }
                  else{
                      return null;
                  }
               }
          else{
            return  user = null;
          }
      
      } catch (error) {
           return user = null;  
       }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      const token = jwt.sign(JSON.parse(JSON.stringify(session.user)),process.env.JWT_SECRET);
        session.user.token = token;
        return session;
    },
    async signIn({ account , user }) {
      try {
        
        if(account.provider !== "credentials"){
          console.log("ok1");
          await connectDb();
          const {name , email , image} = user;
          const myuser = await User.findOne({email});
          
          if(!myuser){ 
            console.log("ok2");
            console.log(image);
            console.log(myuser);
            const data = new User({name,email, profileImage : image ,password : "null_password"}); 

            await data.save();
          }

        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
