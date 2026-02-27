import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
  // Sort the itinerary days (Day 1, Day 2, etc.)
  const itinerary = trip?.tripData?.itinerary;
  const sortedDays = itinerary ? Object.keys(itinerary).sort() : [];

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-3xl mb-6 dark:text-white'>Your Journey Plan 🗺️</h2>

      <div className='relative border-l-2 border-blue-100 dark:border-gray-800 ml-4 md:ml-6'>
        {sortedDays.map((dayKey, index) => {
          const dayData = itinerary[dayKey];
          return (
            <div key={index} className='mb-12 ml-6 relative'>
              {/* Day Circle Indicator */}
              <div className='absolute -left-[35px] top-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-black shadow-sm'></div>
              
              <div className='bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800'>
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4'>
                  <h2 className='font-extrabold text-2xl text-blue-600 dark:text-blue-400 uppercase tracking-wide'>
                    {dayKey.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                  {/* DISPLAYING THE THEME */}
                  <span className='px-4 py-1 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm'>
                    ✨ {dayData?.theme || dayData?.plan?.[0]?.theme || 'Exploring the City'}
                  </span>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>
                  {dayData?.plan?.map((place, idx) => (
                    <div key={idx} className='animate-in fade-in slide-in-from-left-5 duration-500'>
                      <PlaceCardItem place={place} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default PlacesToVisit