"use client"

import Link from 'next/link'
import { useState , useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react"
// import User from "../components/Context";

const Login = () => {
  // const {login , setLogin} = useContext(User);
  const [login , setLogin] = useState(false);
  let [user,setUser] = useState({email:"" , password:""});
  let [loading,setLoading] = useState(false);
  const router = useRouter(); 

const change = (e) =>{
    setUser({...user,[e.target.name] : e.target.value});
}

const submitForm = async (e) =>{
    e.preventDefault();
    setLoading(true);
    
    // const res = await fetch(process.env.NEXT_PUBLIC_URL+'/Login', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(user)
    // });
    // const data = await res.json();

    const status = await signIn("credentials",{
      redirect : false,
      email : user.email,
      password : user.password,
      callbackUrl : "/?catagory=all"
    });

    setLoading(false);
    if(status.ok){
        toast.success("Login succesfully", {
          position: toast.POSITION.TOP_RIGHT
      });
      
      setLogin(true);
      // localStorage.setItem("token" , data.token);
      // localStorage.setItem("user" ,data.email);

      setUser({email:"" , password:""});
        router.push('/?catagory=all');
    }
    else{
      toast.error(status.error, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
}


  return (
    <>
      <Head>
      <title>Login - CodeBlog | Access your account and join the community</title>
      <meta name="description" content="Login to CodeBlog and access your account to join our community of web developers. Our platform offers a supportive environment for learning, sharing, and collaborating on web development projects, with access to tutorials, code snippets, and Q&A forums." />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="keywords" content="CodeBlog, web development, login, account, community, tutorials, code snippets, Q&A forums" />
    </Head>

        <div className="my-10 min-h-screen flex flex-col">
            <div className="container check max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className=" backdrop-blur-xl px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        onChange={change}
                        value={user.email}
                        placeholder="Email" />
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        onChange={change}
                        value={user.password}
                        placeholder="Password" />

                    <button onClick={submitForm} type="submit" className="w-full bg-green-400 text-center py-3 rounded bg-green text-white hover:bg-green-300 focus:outline-none my-1">
                    {
                      loading ? loading && <span className='loading'> <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                      </svg>
                      Loading...
                      </span>
                      :
                     "Login"
                    }
                    </button>
                    <ToastContainer />
                    <div className="text-center text-sm text-grey-dark mt-4">
                      or
                      <div className="buttons">
                      <button onClick={() => signIn("google",{callbackUrl : "http://localhost:3000/"})} type="submit" className="w-full flex justify-center items-center gap-2 text-center py-3 rounded bg-green bg-white hover:bg-slate-50 focus:outline-none my-1">
                      Login with google
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1.3rem"
                        width="1.3rem"
                      >
                        <path d="M15.545 6.558a9.42 9.42 0 01.139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 118 0a7.689 7.689 0 015.352 2.082l-2.284 2.284A4.347 4.347 0 008 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 000 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 001.599-2.431H8v-3.08h7.545z" />
                      </svg>
                      </button>
                      <button onClick={() => signIn("github",{callbackUrl : "http://localhost:3000/"})} type="submit" className="w-full flex justify-center items-center gap-2 text-center py-3 rounded bg-green bg-white hover:bg-slate-50 focus:outline-none my-1">
                      Login with Github
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1.5rem"
                        width="1.5rem"
                      >
                        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                      </svg>
                      </button>
                      </div>
                    </div>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-blue-500" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark  text-blue-500" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                   Have an account? 
                    <Link className="ml-1 no-underline border-b border-blue text-blue-600" href="/signup">
                        Sign up
                    </Link>.
                </div>
            </div>
        </div>
        </>
  )
}

export default Login
