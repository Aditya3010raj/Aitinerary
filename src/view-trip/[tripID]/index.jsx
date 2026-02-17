import { db } from '@/service/firebasconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from './components/infosection';
import Hotels from './components/hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/footer';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Viewtrip() {
    const { tripID } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripID) {
            GetTripData();
        }
    }, [tripID]);

    const GetTripData = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'AITrips', tripID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTrip(docSnap.data());
            } else {
                toast.error('No trip found!');
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to fetch trip data.");
        } finally {
            setLoading(false);
        }
    };

    // Premium Loading State with themed colors
    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center h-[80vh] gap-5'>
                <div className='relative flex items-center justify-center'>
                    <div className='absolute w-20 h-20 bg-blue-500/20 blur-xl rounded-full animate-pulse'></div>
                    <AiOutlineLoading3Quarters className='h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 z-10' />
                </div>
                <h2 className='font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-400 dark:from-white dark:to-gray-500 animate-pulse'>
                    Preparing your adventure...
                </h2>
            </div>
        );
    }

    return (
        <div className='min-h-screen transition-all duration-500 bg-white dark:bg-black overflow-hidden relative'>
            
            {/* Subtle background blurs to match Hero theme */}
            <div className='absolute top-0 left-1/4 -z-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full'></div>
            <div className='absolute bottom-0 right-1/4 -z-10 w-[400px] h-[400px] bg-red-500/5 blur-[120px] rounded-full'></div>

            <div className='max-w-6xl mx-auto p-5 md:px-10 lg:px-12 py-10'>
                
                {/* 1. Information Section (Hero Image & Basic Stats) */}
                <section className='animate-in fade-in slide-in-from-bottom-5 duration-700'>
                    <InfoSection trip={trip} />
                </section>

                {/* Content Divider / Dashboard feel */}
                <div className='mt-16 space-y-20'>
                    
                    {/* 2. Recommended Hotels Section */}
                    <section className='animate-in fade-in slide-in-from-bottom-7 duration-1000'>
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='h-8 w-1 bg-blue-600 rounded-full'></div>
                            <h2 className='font-bold text-2xl md:text-3xl dark:text-white'>Hotel Recommendations</h2>
                        </div>
                        <div className='bg-gray-50/50 dark:bg-gray-900/20 p-2 md:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800/50'>
                             <Hotels trip={trip} />
                        </div>
                    </section>

                    {/* 3. Daily Itinerary Section */}
                    <section className='animate-in fade-in slide-in-from-bottom-10 duration-1000'>
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='h-8 w-1 bg-red-600 rounded-full'></div>
                            <h2 className='font-bold text-2xl md:text-3xl dark:text-white'>Places to Visit</h2>
                        </div>
                        <PlacesToVisit trip={trip} />
                    </section>

                </div>

                {/* 4. Footer Section */}
                <footer className='mt-32 border-t border-gray-100 dark:border-gray-800 pt-10 pb-10'>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default Viewtrip;