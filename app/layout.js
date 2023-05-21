"use client"

import Footer from '@components/Footer'
import Navbar from '@components/Navbar'
import '@styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: "CodeBlog | Latest articles and tutorials on web development",
  description: 'Discover the latest articles and tutorials on web development from CodeBlog. Our community-driven platform offers a wealth of user-generated content on topics like HTML, CSS, JavaScript, and more, all designed to help you take your web development skills to the next level.',
}

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body>
        <div className='main'>
            <div className='gradient' />
          </div>
          <SessionProvider session={children.session}>
            <Navbar/>
            {children}
            <Footer/>
          </SessionProvider>
        </body>
    </html>
  )
}
