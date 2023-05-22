import Image from "next/image"

const loading = () => {
  return (
    <div className="blurbg loadingCenter">
      <Image priority src='/images/loading.gif' width={50} height={50} alt="Loading..."></Image>
    </div>
  )
}

export default loading
