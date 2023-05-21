"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState , useEffect } from "react";
import { usePathname , useSearchParams , useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Blog = () => {

  const { data: session, status } = useSession();
  console.log(session?.user);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [catagory, setCatagory] = useState("all");
  const [loading , setLoading] = useState(false)
  
  useEffect( () =>{
      setBlogs([]);
      setPage(1);
      setHasMore(true);
      console.log("check");
      if(pathName === "/"){
        setCatagory("all");
      }else{
        setCatagory(searchParams.get('catagory'));   
      }
  },[searchParams.get('catagory') , searchParams.get('searchquery') , searchParams.get('user')]);

    async function  fetchMoreData () {
    // console.log(searchParams.get('catagory'));
    // console.log(searchParams.get('searchquery'));
    // console.log(searchParams.get('user'));
    // console.log(catagory);
    // console.log("hello");

    if (searchParams.get('searchquery')){
      console.log(page);
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/blog?searchquery=${searchParams.get('searchquery')}&page=${page}`);
      const newBlogs = await res.json();
      // console.log(newBlogs);
      console.log(newBlogs.length);
      setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
      setHasMore(newBlogs.length > 0);
    }
    else if (searchParams.get('user')){
      console.log(searchParams.get('user'));
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/blog?user=${searchParams.get('user')}&page=${page}`);
      const newBlogs = await res.json();
      // console.log(newBlogs);
      setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
      setHasMore(newBlogs.length > 0);
    } else if(catagory){
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/blog?catagory=${catagory ? catagory : "all" }&page=${page}`);
      const newBlogs = await res.json();
      console.log(newBlogs);
      setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
      setHasMore(newBlogs.length > 0);
      }
    setPage(page+1);
    
  }

  const handleDelete = async (id) => {
    setLoading(true);
    let req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/blog?id=${id}`,{
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

      // Remove the deleted blog post from the 'blogs' array
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));

       }
  else{
    toast.error(res.msg, {
      position: toast.POSITION.TOP_RIGHT
  });
     }
   }

  return (
    <InfiniteScroll
      dataLength={blogs.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
      <div className='my-10 flex justify-center items-center'>
        <Image src={"/images/loading.gif"} width={70} height={70} alt="loading..."></Image>
      </div> }
  >
    <div className="p-5 w-[95vw] mx-auto flex justify-center flex-wrap gap-5 transition-transform">
        {blogs && blogs.length > 0 && blogs.map((blog) => {
          return (
            <div key={blog._id} className='prompt_card'>
              <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' >
                <Link href={`/profile?user=${blog.email}`}>{ blog.profileImage ? <Image
                    src={blog.profileImage}
                    alt='user_image'
                    width={36}
                    height={36}
                    className='rounded-full object-contain'
                    />
                    :
                    <svg viewBox="0 0 512 512" fill="currentColor" height="2.2rem" width="2.2rem">
                      <path d="M399 384.2c-22.1-38.4-63.6-64.2-111-64.2h-64c-47.4 0-88.9 25.8-111 64.2 35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zm-256 16c39.8 0 72-32.2 72-72s-32.2-72-72-72-72 32.2-72 72 32.2 72 72 72z" />
                    </svg>
                } </Link>
                  <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                      {blog.auther}
                    </h3>
                    <p className='font-inter text-sm text-gray-500'>
                      {blog.email}
                    </p>
                  </div>
                </div>
              </div>
              <Link  href={`/getblog?id=${blog._id}`} >
              { blog.title && <h3 className='my-2 font-satoshi text-lg font-bold text-black'> {blog.title.length > 100 ? blog.title.substring(0, 100) + "..." : blog.title }</h3> }
              <p className=' my-2 font-satoshi text-sm text-gray-700'> {blog.description.length > 200 ? blog.description.substring(0, 200) + "..." : blog.description}</p>
              </Link>
              <p className='font-inter text-sm blue_gradient cursor-pointer font-bold text-blue-700'>
                <span className="font-normal text-black">Catagory : </span> <Link href={`/?catagory=${blog.catagory}#here`}> {blog.catagory ? blog.catagory : 'all'} </Link>
              </p>

              {session?.user.email === blog.email && pathName === "/profile" && (
                <div className='mt-5 flex items-center gap-4 border-t border-gray-100 pt-3'>
                  <Link href={`/editblog?id=${blog._id}`} className='font-inter text-sm font-bold text-blue-600  cursor-pointer' >
                    Edit
                  </Link>
                  <p onClick={() => handleDelete(blog._id)} className='font-inter text-sm font-bold text-red-600  cursor-pointer' >
                    { loading ? "loading..." : "Delete"}
                  </p>
                  <ToastContainer />
                </div>
              )}
            </div>
          );
        })}
    </div>
   </InfiniteScroll>
  )
}

export default Blog
