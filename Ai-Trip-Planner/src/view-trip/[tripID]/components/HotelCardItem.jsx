import React, { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/service/GlobalAPI';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

function HotelCardItem({ hotel }) {
    const [photoURL, setPhotoURL] = useState('/placeholder.jpg');

    useEffect(() => {
        hotel && getHotelPhoto();
    }, [hotel]);

    const getHotelPhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName + " " + hotel?.address
        };
        try {
            const resp = await GetPlaceDetails(data);
            if (resp.data.places[0]?.photos) {
                const photoName = resp.data.places[0].photos[0].name;
                const finalPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoURL(finalPhotoUrl);
            }
        } catch (error) {
            console.error("Error fetching hotel photo:", error);
        }
    };

    // FIXED: Corrected mapsUrl construction and used <a> to avoid 404
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(hotel?.hotelName + "," + hotel?.address);

    return (
        <a href={mapsUrl} target='_blank' rel="noopener noreferrer" className='block group'>
            <div className='hover:scale-105 transition-all duration-300 cursor-pointer border rounded-2xl p-3 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-xl h-full'>
                
                {/* Image Container with Badge Overlay */}
                <div className='relative overflow-hidden rounded-xl h-[180px]'>
                    <img 
                        src={photoURL} 
                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' 
                        alt={hotel?.hotelName} 
                    />
                    {/* Rating Badge Overlay */}
                    <div className='absolute top-2 right-2 px-2 py-1 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1 shadow-sm'>
                        <span className='text-xs font-bold dark:text-white'>⭐ {hotel?.rating || 'N/A'}</span>
                    </div>
                </div>

                <div className='my-3 flex flex-col gap-2'>
                    {/* Hotel Name */}
                    <h2 className='font-bold text-lg dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors'>
                        {hotel?.hotelName}
                    </h2>
                    
                    {/* Address */}
                    <h2 className='text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1'>
                        <span className='text-sm'>📍</span> {hotel?.address}
                    </h2>

                    {/* Price Tag with modern styling */}
                    <div className='flex items-center justify-between mt-1'>
                        <h2 className='text-sm font-bold text-green-600 dark:text-green-400 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-900/30'>
                            💰 {hotel?.price_per_night || hotel?.price || "Price N/A"}
                        </h2>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default HotelCardItem;