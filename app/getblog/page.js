"use client"
import {useEffect , useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment"
import { useSession } from "next-auth/react";
import { useSearchParams  } from "next/navigation";

const GetBlog = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {data : session} = useSession();
    const id = searchParams.get('id');

   let [blog,setBlog] = useState({}); 
   let [loading,setLoading] = useState(false);

   useEffect( () =>{
    fetchdata(id)
      },[]);

      async function fetchdata (id) {
        let req = await fetch(`/api/blog?id=${id}`,{
         method : "GET",
         headers :{
           "Content-Type" : "application/json",
          }
        })
        let res = await req.json();
        setBlog(res[0]);
       }

     const handleDelete = async (id) => {
        setLoading(true);
        let req = await fetch(`/api/blog?id=${id}`,{
         method : "DELETE",
         headers :{
           "Content-Type" : "application/json",
           "token" : session?.user.token,
          }
        })
        let res = await req.json();
        setLoading(false);
        if(res.success){
          toast.success(res.msg, {
            position: toast.POSITION.TOP_RIGHT
           });  
            setTimeout(() => {
              router.push('/?catagory=all');
            }, 1000);
           }
      else{
        toast.error(res.msg, {
          position: toast.POSITION.TOP_RIGHT
      });
         }
       }

       

  return (
    <>
    {/* <head>
      <title>{blog.title}</title>
      <meta name="description" content={blog.description} />
      <meta name="robots" content="index,follow" />
      <meta name="keywords" content="CodeBlog, web development, login, account, community, tutorials, code snippets, Q&A forums" />
    </head> */}
    {
      blog && <div className="container w-[95vw] mx-auto pt-20">
      <div className='flex justify-between items-center'>
        <div className="information my-5 flex items-center">
        <Link href={`/profile?user=${blog.email}`}>
          { blog.profileImage ? 
              <Image className="rounded-full" src={blog.profileImage} width={45} height={45} alt="user"/>
            : 
            <svg  viewBox="0 0 512 512" fill="currentColor" height="2.7rem" width="2.7rem">
              <path d="M399 384.2c-22.1-38.4-63.6-64.2-111-64.2h-64c-47.4 0-88.9 25.8-111 64.2 35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zm-256 16c39.8 0 72-32.2 72-72s-32.2-72-72-72-72 32.2-72 72 32.2 72 72 72z" />
            </svg> 
          }
        </Link>
        <div className="flex flex-col mx-2 my-1">
        <p className="font-bold mx-1 text-blue-600"> By {blog.auther}</p>
        <p className="">{moment(blog.createdAt).format('MMM D, YYYY')}</p>
        </div>
        </div>
        { 
           session?.user.email === blog.email &&
            <div className="icons flex gap-2">
                <Link href={`/editblog?id=${blog._id}`} >
                    <svg className="text-yellow-600" viewBox="0 0 24 24" fill="currentColor" height="1.8rem" width="1.8rem" >
                    <path d="M16 2.012l3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z" />
                    </svg>
                </Link>
                <button onClick={ () => handleDelete(blog._id)}>
                    {
                      loading ? loading && <span className='loading'> <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-red-600 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                      </svg>
                      </span>
                      :
                      <svg className="text-red-500" viewBox="0 0 24 24" fill="currentColor" height="1.8rem" width="1.8rem">
                      <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                      </svg>
                    }
                </button>
                  <ToastContainer />
              </div>
            }
      </div> 
      <div className="content my-5">
         <h4 className=" mx-5 email my-1"> Email : <span className="font-bold text-blue-600">{blog.email}</span></h4>
         <h3 className=" mx-5 font-sans my-1">Catagory : <span className="font-serif font-bold">{blog.catagory}</span></h3>
         <h2 className=" mx-5 font-bold font-sans text-green-600"> Last Update : {moment(blog.updatedAt).format('MMM D, YYYY')}</h2>
         { blog.title && <h1 className=" my-2 mt-5 md:mt-10 font-bold font-serif text-2xl mx-3">{blog.title}</h1>}
          <p className=" my-2 font-light font-sans indent-10 text-lg">
            {blog.description}
          </p>
      </div>
    </div>
     }
    </>
  )
}

export default GetBlog
