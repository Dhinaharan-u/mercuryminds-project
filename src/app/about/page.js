
"use client";

import React from 'react'
import Navbar from '../components/navbar'
import Image from 'next/image'

 const About = () => {
  return (
    <>
    <Navbar/>
    <Image src="/download (1).png"
    height={700}
    width={500}
    alt="Description of the image here"
    style={
      {marginLeft:'37%',marginTop:'10px'}
    }
    /></>
    
  )
}
export default About
