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
        <Design method={"POST"} data={data} />
    </div>
  )
}

export default page
