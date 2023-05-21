"use client"
import Design from "@components/Design"
import { useState } from "react"

const page = () => {
    const [data,setData] = useState({
        catagorie : "all",
        title : "",
        description : ""
      })

  return (
    <div>
        <Design type={"createblog"} method={"PATCH"} data={data} />
    </div>
  )
}

export default page
