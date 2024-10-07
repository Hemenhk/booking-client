import { X } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function TheFooter() {
  return (
   <footer className='w-full min-h-72 bg-violet-100 p-10'>
    <div className='flex flex-col gap-5'>

    <h2 className='text-2xl font-bold'>Bookely.</h2>
    <ul className='flex flex-row items-center gap-3 size-10'>
        <li><FaFacebook size={28}/></li>
        <li><FaTwitter size={28}/></li>
        <li><FaInstagram size={28}/></li>
        <li><FaLinkedin size={28}/></li>
    </ul>
    </div>
   </footer>
  )
}
