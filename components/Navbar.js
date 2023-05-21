"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession , signOut } from "next-auth/react";
// import User from "./Context";

function Navbar() {
  const router = useRouter();
  const[text , setText] = useState('');
  const [login , setLogin] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState(false);

  const {data : session} = useSession();
  console.log(session?.user);


  const showDropdown = () =>{
     setDropdown(!dropdown)
  }

  const showProfile = () =>{
    setProfile(!profile);
  }

  const handleSearch = async (e) =>{
    e.preventDefault();
    router.push(`/?searchquery=${text}#here`);
 }

 const logout = () =>{
   signOut({redirect: false, callbackUrl: "/?catagory=all"});
   setProfile(!profile);
 }

  return (
    <div>
      <nav className="w-full backdrop-blur shadow bg-transparent fixed left-0 top-0 z-10">
        <div className="justify-between mx-auto lg:max-w-7xl md:items-center flex px-5 py-2 md:py-3 md:px-8">
          <div>
          <div className="logo flex gap-2">
             <Link href={"/?catagory=all"}><Image src={"/images/codeblog.png"} width={100} height={40} alt="only puzzles" className="image"></Image></Link>
          </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className=" pt-10 sm:pt-0 items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li onClick={() => setNavbar(!navbar)} className="text-black font-bold">
                  <Link href="/?catagory=all">Home</Link>
                </li>
                <li className="text-black font-bold">
                  <div className="relative inline-block text-left">
                      <div>
                        <div onClick={showDropdown} onMouseEnter={ () => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className="select-none flex w-full justify-center items-center md:px-3 py-2 font-bold" id="menu-button" aria-expanded="true" aria-haspopup="true">
                          Catagory
                          <svg className={`-mr-1 h-5 w-5 text-gray-600 transition-transform ${dropdown ? "rotate-180" : "rotate-360"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                     { dropdown && <div onMouseEnter={ () => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className="absolute top-8 md:top-0 -right-24 md:-right-5 z-10 mt-2  md:m-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                          <Link onClick={showDropdown} href="/?catagory=all#here" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-0">All</Link>
                          <Link onClick={showDropdown} href="/?catagory=coding#here" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-1">Coding</Link>
                          <Link onClick={showDropdown} href="/?catagory=front-end#here" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-2">Front-end web development</Link>
                          <Link onClick={showDropdown} href="/?catagory=backend-end#here" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-2">Back-end web development</Link>
                        </div>
                      </div>}
                  </div>
  
                </li>
                <li  onClick={() => setNavbar(!navbar)} className="text-black font-bold">
                  <Link href="/contact">Contact US</Link>
                </li>
                <li  onClick={() => setNavbar(!navbar)} className="text-black font-bold">
                  <Link href="/about">About US</Link>
                </li>
                
              </ul>
            </div>
          </div>
          <div>
          <div className="flex items-center justify-center gap-2">
            <div className="search">
            <svg onClick={() =>{ setSearch((prev) =>!prev)}} viewBox="0 0 24 24" fill="currentColor" height="2.2rem" width="2.2rem">
              <path d="M19.023 16.977a35.13 35.13 0 01-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0016 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
             </svg>
             <form onSubmit={handleSearch} className={` transition-all absolute top-20 ${search ?  " right-10" : "-right-[80rem]" }`}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input name="search" onChange={(e) => setText(e.target.value)} type="search" id="default-search" className="block w-80 md:w-[30rem] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
                    <button onClick={() =>{ setSearch((prev) =>!prev)}} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            </div>
              <div className=" font-bold md:mx-3">
                 {
                    session?.user ?
                    (<div onClick={showProfile} onMouseEnter={ () => setProfile(true)} onMouseLeave={() => setProfile(false)} className="profileimg">
                        { session?.user.image ? 
                          <Image unoptimized className="rounded-full" src={session?.user.image} width={36} height={36} alt="user"/>
                        : 
                        <svg  viewBox="0 0 512 512" fill="currentColor" height="2.2rem" width="2.2rem">
                        <path d="M399 384.2c-22.1-38.4-63.6-64.2-111-64.2h-64c-47.4 0-88.9 25.8-111 64.2 35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256 114.6 0 256 0s256 114.6 256 256zm-256 16c39.8 0 72-32.2 72-72s-32.2-72-72-72-72 32.2-72 72 32.2 72 72 72z" />
                        </svg> }
                    </div>)
                   :  
                    <Link href="/login"><button className="bg-green-600 text-white py-[3px] px-4 mx-0 border-x-slate-50 rounded-lg font-bold hover:bg-white transition-all border-2 hover:border-green-700 hover:text-green-800">Login</button></Link>
                   }
               { profile && <div onMouseEnter={ () => setProfile(true)} onMouseLeave={() => setProfile(false)} className="absolute top-16 md:top-2 right-20 md:right-10 z-10 mt-2  md:m-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                     <div className="py-3" role="none">
                       <Link href={`${session?.user ? `/profile?user=${session?.user.email}` : "/login"}`} className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-0">Profile</Link>
                       <Link href="/createblog" className="text-green-600 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-1">Create blog</Link>
                       <div onClick={logout} className="text-red-600 block px-4 py-2 text-sm hover:bg-slate-100" role="menuitem" tabIndex="-1" id="menu-item-0">Log-Out</div>
                     </div>
                   </div>}
              </div>
             <div className="md:hidden">
               <button
                 className="p-2 text-gray-700 rounded-md outline-none border-gray-400 border"
                 onClick={() => setNavbar(!navbar)}
               >
                 {navbar ? (
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6 text-black"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                   >
                     <path
                       fillRule="evenodd"
                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                       clipRule="evenodd"
                     />
                   </svg>
                 ) : (
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6 text-black"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth={2}
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       d="M4 6h16M4 12h16M4 18h16"
                     />
                   </svg>
                 )}
               </button>
             </div>
           </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
