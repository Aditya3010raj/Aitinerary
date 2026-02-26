import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineTrash } from "react-icons/hi";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebasconfig";
import { toast } from 'sonner';
import { GetPlaceDetails } from '@/service/GlobalAPI';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

function UserTripCardItem({ trip, refreshData }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    // Check if destination exists to avoid "undefined" errors
    const destinationName = trip?.userSelection?.destination?.label || trip?.userSelection?.location;
    
    if (!destinationName) return;

    const data = {
      textQuery: destinationName
    }

    try {
      const resp = await GetPlaceDetails(data);
      
      // FIX: Check if places and photos actually exist before accessing index [3]
      const firstPlace = resp.data.places?.[0];
      if (firstPlace?.photos && firstPlace.photos.length > 0) {
        // Use the first available photo if the 4th one (index 3) doesn't exist
        const photoName = firstPlace.photos[3]?.name || firstPlace.photos[0].name;
        const finalPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPhotoUrl(finalPhotoUrl);
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
      // Fallback is already set to '/placeholder.jpg' in state
    }
  }

  const deleteTrip = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isConfirmed = window.confirm("Are you sure you want to delete this trip?");
    if (!isConfirmed) return;

    try {
      await deleteDoc(doc(db, "AITrips", trip.id));
      toast.success("Trip deleted successfully!");
      refreshData();
    } catch (error) {
      toast.error("Failed to delete trip.");
    }
  }

  return (
    <div className='relative group h-full'>
      <div 
        onClick={deleteTrip}
        className='absolute top-4 right-4 z-30 p-2 bg-red-500/90 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-red-600 shadow-lg backdrop-blur-sm'
      >
        <HiOutlineTrash className='h-5 w-5' />
      </div>

      <Link to={'/view-trip/' + trip?.id}>
        <div className='flex flex-col h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer p-3 border rounded-2xl dark:border-gray-800 dark:bg-gray-900 bg-white shadow-sm hover:shadow-xl'>
          
          <div className='overflow-hidden rounded-xl h-[200px] bg-gray-100 dark:bg-gray-800'>
             <img 
              src={photoUrl} 
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' 
              alt={trip?.userSelection?.destination?.label || "destination"}
              onError={(e) => { e.target.src = '/placeholder.jpg' }} // Secondary fallback
            />
          </div>

          <div className='mt-4 flex flex-col justify-between flex-grow'>
            <div>
              <h2 className='font-bold text-xl dark:text-white line-clamp-1'>
                {trip?.userSelection?.destination?.label}
              </h2>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                {trip?.userSelection?.days} Days • {trip?.userSelection?.budget?.title} Budget
              </p>
            </div>

            <div className='mt-4'>
              <span className='px-3 py-1 text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 rounded-full font-semibold border border-blue-100 dark:border-blue-800'>
                {trip?.userSelection?.travelers?.icon} {trip?.userSelection?.travelers?.title}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default UserTripCardItem;