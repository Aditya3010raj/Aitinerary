import React, { useState } from 'react'
import GeoapifyAutocomplete from '@/components/GeoapifyAutocomplete'
import { SelectBudgetList, AI_PROMPT } from "@/contants/options"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'

// Updated Traveler List with Solo, Duo, Trio, Squad
const SelectTravelersList = [
  {
    id: 1,
    title: 'Solo',
    desc: 'A sole traveler in exploration',
    icon: '👤',
    people: '1 Person'
  },
  {
    id: 2,
    title: 'Duo',
    desc: 'Two travelers chasing dreams',
    icon: '👥',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Trio',
    desc: 'A small group of adventurers',
    icon: '🏘️',
    people: '3 People'
  },
  {
    id: 4,
    title: 'Squad',
    desc: 'A band of thrill-seekers',
    icon: '🔥',
    people: '4 to 10 People'
  }
]

function CreateTrip() {
  const [opendialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: null,
    days: "",
    budget: null,
    travelers: null
  })

  const handleSelect = (item) => {
    const props = item.properties;
    setFormData(prev => ({
      ...prev,
      destination: {
        label: props.formatted || "",
        value: props.formatted || "",
        city: props.city || props.name || "",
        lat: props.lat,
        lon: props.lon
      }
    }))
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => userProfile(codeResp),
    onError: (error) => console.log("Login Failed:", error)
  })

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem('user')
    if (!user) {
      setOpenDialog(true)
      return;
    }
    if (!formData.destination || !formData.days || !formData.budget || !formData.travelers) {
      return toast.error("Please fill all details!");
    }
    if (formData.days > 5) {
      return toast.error("Please enter days less than 5");
    }

    // Generate unique ID for the route
    const docID = Date.now().toString(); 

    // Construct the prompt to pass to the next page
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.destination?.label)
      .replace('{days}', formData?.days)
      .replace('{traveler}', formData?.travelers?.title)
      .replace('{budget}', formData?.budget?.title)
      .replace('{totalDays}', formData?.days);

    // Navigate immediately to ViewTrip with the prompt and selection data
    navigate('/view-trip/' + docID, { 
      state: { 
        prompt: FINAL_PROMPT, 
        userSelection: formData 
      } 
    });
  };

  const userProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`)
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      handleGenerateTrip();
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-10 mt-16 mb-24 transition-all duration-500">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="font-extrabold text-4xl sm:text-5xl dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-cyan-300">
          Plan Your Next Adventure
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Personalized AI-powered itineraries tailored to your preferences.
        </p>
      </div>

      <div className="space-y-16">
        {/* Step 1: Destination */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/30 dark:text-blue-400">1</span>
            <h2 className="font-bold text-2xl dark:text-gray-100">Where do you want to go?</h2>
          </div>
          <GeoapifyAutocomplete onSelect={handleSelect} />
        </div>

        {/* Step 2: Duration */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/30 dark:text-blue-400">2</span>
            <h2 className="font-bold text-2xl dark:text-gray-100">Trip Duration</h2>
          </div>
          <input 
            placeholder='How many days? (Max 5)' 
            type='number' 
            className='w-full px-5 py-4 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:border-blue-500 transition-all shadow-sm dark:text-white'
            onChange={(e) => setFormData(prev => ({...prev, days: Number(e.target.value)}))} 
          />
        </div>

        {/* Step 3: Budget */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/30 dark:text-blue-400">3</span>
            <h2 className="font-bold text-2xl dark:text-gray-100">Select Your Budget</h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {SelectBudgetList.map((item, index) => (
              <div
                key={index}
                onClick={() => setFormData({...formData, budget: item})}
                className={`group relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl
                ${formData.budget?.title === item.title 
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 ring-4 ring-blue-500/10" 
                  : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/40 hover:border-blue-200 dark:hover:border-gray-600"}
                `}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h2 className='font-bold text-xl dark:text-white'>{item.title}</h2>
                <h2 className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Travelers */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900/30 dark:text-blue-400">4</span>
            <h2 className="font-bold text-2xl dark:text-gray-100">Who are you traveling with?</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => setFormData({...formData, travelers: item})}
                className={`group p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl
                ${formData.travelers?.title === item.title 
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 ring-4 ring-blue-500/10" 
                  : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/40 hover:border-blue-200 dark:hover:border-gray-600"}
                `}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h2 className='font-bold text-xl dark:text-white'>{item.title}</h2>
                <h2 className='text-sm text-gray-500 dark:text-gray-400 mt-1 mb-2'>{item.desc}</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 font-semibold">{item.people}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className='mt-24 flex justify-center sm:justify-end'>
        <Button
          onClick={handleGenerateTrip}
          className="px-12 py-7 text-lg font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all dark:bg-white dark:text-black">
          Generate My Trip
        </Button>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={opendialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-3xl dark:bg-gray-900 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="sr-only">Sign In</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col items-center py-6">
                <img src='/logo.svg' className='w-16 h-16 mb-6' alt="Logo" />
                <h2 className='font-bold text-2xl text-black dark:text-white'>Join AI Trip Planner</h2>
                <p className="text-center mt-2 text-gray-500 dark:text-gray-400 px-6">Sign in with Google to save your trips.</p>
                <Button onClick={login} className='w-full mt-8 flex gap-4 items-center py-7 rounded-2xl dark:bg-white dark:text-black'>
                  <FcGoogle className='h-6 w-6' /> Continue with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip;