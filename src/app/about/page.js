
"use client";

import React from 'react'
import Navbar from '../components/navbar'
import Image from 'next/image'

 const About = () => {
  return (
    <>
    <Navbar/>
    <div style={{display:"flex",justifyContent:'center',marginTop:'20px'}}>
      <Image src="/download (1).png"
    height={700}
    width={500}
    alt="Description of the image here"
    
    />
    </div>
    </>
    
  )
}
export default About
