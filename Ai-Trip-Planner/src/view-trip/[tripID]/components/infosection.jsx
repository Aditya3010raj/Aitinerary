import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalAPI';
import { toast } from 'sonner';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

function InfoSection({ trip }) {
    const [photoURL, setPhotoURL] = useState('/placeholder.jpg');

    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip]);

    const getPlacePhoto = async () => {
        const data = { textQuery: trip?.userSelection?.destination?.label };
        try {
            const resp = await GetPlaceDetails(data);
            const photoName = resp.data.places[0].photos[3].name;
            const finalPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
            setPhotoURL(finalPhotoUrl);
        } catch (error) {
            console.error("Error fetching photo:", error);
        }
    };

    // --- NEW: SHARE FUNCTIONALITY ---
    const handleShare = async () => {
        const shareData = {
            title: 'My AI Trip to ' + trip?.userSelection?.destination?.label,
            text: `Check out this amazing ${trip?.userSelection?.days} day trip itinerary I generated!`,
            url: window.location.href, // This gets the current View Trip URL
        };

        // Check if the browser supports the native Share API (Mobile/Safari)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                toast.success('Shared successfully!');
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to Clipboard for Desktop users
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard!');
            } catch (err) {
                toast.error('Failed to copy link');
            }
        }
    };

    return (
        <div className='transition-all duration-500'>
            {/* Main Banner Image */}
            <div className='relative group overflow-hidden rounded-[2rem] shadow-2xl'>
                <img 
                    src={photoURL} 
                    className='h-[340px] md:h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-105' 
                    alt="Destination" 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
                <div className='absolute bottom-8 left-8'>
                    <h2 className='text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg'>
                        {trip?.userSelection?.destination?.label}
                    </h2>
                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between items-start md:items-center mt-8 gap-5'>
                <div className='flex flex-wrap gap-3'>
                    <div className='px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full flex items-center gap-2 transition-all hover:scale-105'>
                        <span className='text-lg'>📅</span>
                        <h2 className='text-blue-700 dark:text-blue-300 font-semibold text-sm md:text-base'>
                            {trip?.userSelection?.days} Days
                        </h2>
                    </div>

                    <div className='px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-full flex items-center gap-2 transition-all hover:scale-105'>
                        <span className='text-lg'>💰</span>
                        <h2 className='text-red-700 dark:text-red-300 font-semibold text-sm md:text-base'>
                            {trip?.userSelection?.budget?.title} Budget
                        </h2>
                    </div>

                    <div className='px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-full flex items-center gap-2 transition-all hover:scale-105'>
                        <span className='text-lg'>{trip?.userSelection?.travelers?.icon || '👥'}</span>
                        <h2 className='text-indigo-700 dark:text-indigo-300 font-semibold text-sm md:text-base'>
                            {trip?.userSelection?.travelers?.title}
                        </h2>
                    </div>
                </div>

                {/* THE USABLE BUTTON */}
                <Button 
                    onClick={handleShare}
                    className="rounded-2xl px-6 py-6 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 dark:bg-white dark:text-black font-bold flex gap-2"
                >
                    <IoIosSend className='h-5 w-5' /> Share Trip
                </Button>
            </div>
        </div>
    );
}

export default InfoSection;