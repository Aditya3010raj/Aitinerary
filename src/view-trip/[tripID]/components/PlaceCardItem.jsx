import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/service/GlobalAPI';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoURL] = useState('/placeholder.jpg');

  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);

  const getPlacePhoto = async () => {
    const data = { textQuery: place?.placeName };
    try {
      const resp = await GetPlaceDetails(data);
      if (resp.data.places[0]?.photos) {
        const photoName = resp.data.places[0].photos[0].name;
        const finalPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoURL(finalPhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place?.placeName);

  return (
    <a href={mapsUrl} target='_blank' rel="noopener noreferrer" className='block group'>
      {/* Mobile: flex-col (Vertical)
          Small Screens and up: sm:flex-row (Horizontal) 
      */}
      <div className='p-3 border rounded-3xl flex flex-col sm:flex-row gap-4 hover:shadow-2xl hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-300 bg-white dark:bg-gray-900 dark:border-gray-800 h-full'>
        
        {/* Image Container: Full width on mobile, fixed width on desktop */}
        <div className='relative overflow-hidden rounded-2xl h-[180px] sm:h-[120px] w-full sm:w-[160px] flex-shrink-0'>
          <img 
            src={photoURL} 
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
            alt={place?.placeName} 
          />
          {/* Floating Time Badge */}
          <div className='absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 shadow-lg'>
             🕒 {place?.travelTime || place?.timeToTravel || "Visit"}
          </div>
        </div>

        {/* Content Section */}
        <div className='flex flex-col justify-between py-1 w-full'>
          <div>
            <h2 className='font-bold text-xl sm:text-lg dark:text-white group-hover:text-red-600 transition-colors duration-300'>
              {place?.placeName}
            </h2>
            <p className='text-sm sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed'>
              {place?.placeDetails}
            </p>
          </div>
          
          <div className='flex items-center justify-between mt-4 sm:mt-2'>
            <span className='text-[12px] sm:text-[11px] font-extrabold px-3 py-1.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30'>
               🎟️ {place?.ticketPricing || 'Free'}
            </span>
            
            {/* Hidden on desktop, visible on mobile to encourage tapping */}
            <span className='sm:hidden text-xs font-semibold text-blue-600 dark:text-blue-400'>
              View on Map →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;