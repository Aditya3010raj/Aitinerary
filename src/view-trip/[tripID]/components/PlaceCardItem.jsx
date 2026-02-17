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
    } catch (error) {}
  };

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place?.placeName);

  return (
    <a href={mapsUrl} target='_blank' rel="noopener noreferrer" className='block group'>
      <div className='p-3 border rounded-2xl flex gap-4 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-900 transition-all bg-white dark:bg-gray-900 dark:border-gray-800 h-full'>
        <div className='relative overflow-hidden rounded-xl h-[120px] w-[140px] flex-shrink-0'>
          <img 
            src={photoURL} 
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
            alt={place?.placeName} 
          />
          <div className='absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] rounded-lg'>
             📍 {place?.travelTime || place?.timeToTravel}
          </div>
        </div>

        <div className='flex flex-col justify-between py-1'>
          <div>
            <h2 className='font-bold text-lg dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors'>{place?.placeName}</h2>
            <p className='text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed'>{place?.placeDetails}</p>
          </div>
          
          <div className='flex items-center gap-3 mt-2'>
            <span className='text-[11px] font-bold px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-md border border-green-100 dark:border-green-900/50'>
              💰 {place?.ticketPricing || 'Free'}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;