import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
    // Handling different possible JSON keys from AI
    const hotelList = trip?.tripData?.hotels || trip?.tripData?.hotel_options || trip?.tripData?.hotelOptions;

    return (
        <div className='mt-10'>
            <div className='flex items-center gap-3 mb-8'>
                <div className='h-10 w-2 bg-blue-600 rounded-full'></div>
                <h2 className='font-bold text-3xl dark:text-white'>Stay Recommendations</h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {hotelList?.map((hotel, index) => (
                    <div 
                        key={index} 
                        className='animate-in fade-in slide-in-from-bottom-5 duration-700'
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <HotelCardItem hotel={hotel} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hotels