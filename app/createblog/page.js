"use client"
import Design from "@components/Design"
import { useState } from "react"

const Page = () => {
    const [data,setData] = useState({
        catagorie : "all",
        title : "",
        description : ""
      })

  return (
    <>
    {/* <head>
      <title>Create Blog - CodeBlog | Share your expertise with the community</title>
      <meta name="description" content="Create a blog post on CodeBlog and share your expertise with the community. Our plathtmlForm offers a user-friendly editor and a supportive community of web developers, helping you reach a wider audience and gain valuable feedback on your writing and coding skills." />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="keywords" content="CodeBlog, web development, blog post, share your expertise, user-friendly editor, supportive community" />
    </head> */}
      <div>
          <Design method={"POST"} data={data} />
      </div>
    </>
  )
}

export default Page
