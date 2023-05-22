"use client"
import Design from "@components/Design"
import { useState , useEffect } from "react"
import { useSearchParams  } from "next/navigation";

const Page = () => {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [blog,setBlog] = useState({
        id : "",
        catagorie : "all",
        title : "",
        description : ""
      })

    useEffect( () =>{
        fetchdata(id)
          },[]);
    
          async function fetchdata (id) {
            let req = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/blog?id=${id}`,{
             method : "GET",
             headers :{
               "Content-Type" : "application/json",
              }
            })
            let res = await req.json();
            setBlog({
                id : res[0]._id,
                catagory : res[0].catagory ,
                title : res[0].title ,
                description : res[0].description
              });
           }

  return (
    <>
    {/* <head>
      <title>Edit Blog - CodeBlog | Update your blog post and reach more readers</title>
      <meta name="description" content="Edit your blog post on CodeBlog and update your content to reach more readers. Our platform offers a user-friendly editor and a supportive community of web developers, helping you improve your writing and coding skills and attract more readers to your blog." />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="keywords" content="CodeBlog, web development, blog post, update your content, user-friendly editor, supportive community" />
    </head> */}
      <div>
          <Design method={"PATCH"} data={blog} />
      </div>
    </>
  )
}

export default Page
