"use client"

import Link from "next/link";
import Blog from "@components/Blog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const[search , setSearch] = useState('');

  const handleSearch = async (e) =>{
    e.preventDefault();
    router.push(`/?searchquery=${search}#here`);
 }
  return (
      <>
    <section className="w-full mt-20 flex flex-col justify-center items-center ">
        <h1 className="head_text pt-10 text-center">
          Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient my-10 text-center">
            Amazing blogs
          </span>
        </h1>
        <p className="desc text-center">
          Codeblog is an open-source bloging webvsite for modern world to
          discover, create and share creative blogs.
        </p>

        <form onSubmit={handleSearch} className="flex items-center my-5 md:my-8 w-[20rem] md:w-[40rem]">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input name="search" type="search" onChange={(e) => setSearch(e.target.value)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search any Blog , Catagory or User" required />
          </div>
          <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg bg-green-700 hover:bg-green-500 outline-none ">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
          <div className="blog"  id="here">
            <div className="w-full">
              <h1 className="font-bold text-3xl font-serif text-center">Latest Blogs</h1>
              <div className="navbar boder-5 border-black my-5">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold font-mono text-2xl my-3">Catagories</h1>
                  <div className="links mx-7">
                    <Link className="my-1 text-[1.1rem] mx-3 text-blue-700 font-extrabold" href="/?catagory=all">All</Link>
                    <Link className="my-1 text-[1.1rem] mx-3 text-blue-700 font-extrabold" href="/?catagory=coding">Coding</Link>
                    <Link className="my-1 text-[1.1rem] mx-3 text-blue-700 font-extrabold" href="/?catagory=web-development">Web development</Link>
                    <Link className="my-1 text-[1.1rem] mx-3 text-blue-700 font-extrabold" href="/?catagory=front-end">Front-end</Link>
                    <Link className="my-1 text-[1.1rem] mx-3 text-blue-700 font-extrabold" href="/?catagory=back-end">Back-end</Link>
                  </div>
                </div>
              </div>
             <Blog/>
            </div>
            </div>
      </section>
      </>
  );
}

