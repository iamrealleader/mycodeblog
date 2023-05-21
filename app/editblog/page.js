"use client"
import Design from "@components/Design"
import { useState , useEffect } from "react"
import { useSearchParams  } from "next/navigation";

const page = () => {

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
            console.log(res[0]);
            setBlog({
                id : res[0]._id,
                catagory : res[0].catagory ,
                title : res[0].title ,
                description : res[0].description
              });
           }

  return (
    <div>
        <Design method={"PATCH"} data={blog} />
    </div>
  )
}

export default page
