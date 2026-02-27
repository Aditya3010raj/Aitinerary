import { db } from '@/service/firebasconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    setLoading(true);
    try {
      const q = query(
        collection(db, 'AITrips'),
        where('userEmail', '==', user?.email)
      );

      const querySnapshot = await getDocs(q);
      const trips = [];

      querySnapshot.forEach((doc) => {
        trips.push({ ...doc.data(), id: doc.id });
      });

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white dark:bg-black transition-colors duration-500'>
      <div className='max-w-7xl mx-auto px-5 sm:px-10 md:px-20 lg:px-32 py-12'>
        
        {/* Header with "Create New" Shortcut */}
        <div className='flex flex-row items-center justify-between mb-10'>
          <div>
            <h2 className='font-extrabold text-3xl md:text-4xl dark:text-white'>My Adventures</h2>
            <p className='text-gray-500 dark:text-gray-400 mt-2'>Your collection of AI-crafted journeys.</p>
          </div>
          <Button 
            onClick={() => navigate('/create-trip')}
            className="rounded-xl flex gap-2 items-center dark:bg-white dark:text-black font-semibold"
          >
            <Plus className='h-4 w-4' /> New Trip
          </Button>
        </div>

        {/* Dashboard Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {loading ? (
            // Improved Skeleton Loaders for Dark Mode
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div 
                key={index} 
                className='h-[320px] w-full bg-gray-100 dark:bg-gray-900 animate-pulse rounded-2xl border dark:border-gray-800'
              ></div>
            ))
          ) : userTrips?.length > 0 ? (
            userTrips.map((trip, index) => (
              <div 
                key={index} 
                className='animate-in fade-in slide-in-from-bottom-5 duration-500'
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <UserTripCardItem 
                  trip={trip} 
                  refreshData={GetUserTrips} 
                />
              </div>
            ))
          ) : (
            // Refined Empty State
            <div className='col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl dark:border-gray-800'>
              <h2 className='text-xl font-semibold text-gray-400'>No journeys found yet.</h2>
              <Button 
                variant="link" 
                onClick={() => navigate('/create-trip')}
                className="mt-2 text-blue-600 dark:text-blue-400 font-bold text-lg"
              >
                Create your first trip now →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTrips;