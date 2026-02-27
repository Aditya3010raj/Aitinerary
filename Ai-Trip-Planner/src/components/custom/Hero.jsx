import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='relative flex flex-col items-center justify-center min-h-[80vh] text-center px-5 sm:px-10 md:px-32 lg:px-56 transition-all duration-500 overflow-hidden'>
      
      {/* Dynamic Background Mesh - Gives the page "Product Depth" without an image */}
      <div className='absolute top-1/4 -z-10 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full animate-pulse'></div>
      <div className='absolute bottom-1/4 -z-10 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full translate-x-32'></div>

      <div className='flex flex-col items-center gap-8 max-w-5xl'>
        
  

        {/* Headline with Staggered Gradient */}
        <h1 className='font-extrabold text-[42px] md:text-[68px] leading-[1.1] dark:text-white animate-in fade-in slide-in-from-bottom-4 duration-700'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-500 to-red-600'>
            Discover Your Next Destination with AI:
          </span>
          <br /> 
          Personalized Itineraries at Your Fingertips
        </h1>

        {/* Subtext with better line-height */}
        <p className='text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000'>
          Your personal travel assistant and curator of custom trips. We build itineraries that match your unique passions, pace, and budget—all in one place.
        </p>

        {/* Primary Action Section */}
        <div className='flex flex-col sm:flex-row gap-4 mt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000'>
          <Link to={'/create-trip'}>
            <Button className="px-12 py-8 text-xl font-bold rounded-2xl shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 dark:bg-white dark:text-black">
              Get Started, it's Free
            </Button>
          </Link>
          
          {/* Subtle secondary button for balanced layout */}
          <Link to={'/my-trips'}>
            <Button variant="outline" className="px-12 py-8 text-xl font-bold rounded-2xl border-2 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              View Past Trips
            </Button>
          </Link>
        </div>

        {/* Bottom Feature Tags */}
        <div className='flex gap-8 mt-16 text-gray-400 dark:text-gray-500 font-medium text-sm md:text-base animate-in fade-in duration-1000 delay-500'>
          <span className='flex items-center gap-2'>📍 Smart Routing</span>
          <span className='flex items-center gap-2'>💰 Budget Optimized</span>
          <span className='flex items-center gap-2'>⚡ Instant Generation</span>
        </div>
      </div>

    </div>
  )
}

export default Hero