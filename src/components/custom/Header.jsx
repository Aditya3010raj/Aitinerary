import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import axios from 'axios';
import { Moon, Sun, Plus } from "lucide-react"
import { useTheme } from "../theme-provider"

function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload(); 
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5 border-b dark:border-gray-800 sticky top-0 bg-white dark:bg-black z-50 transition-all duration-500'>
      
      {/* Brand Identity - Top Left Corner */}
      <div 
        className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all'
        onClick={() => window.location.href = '/'}
      >
        <img src='/logo.svg' className='w-10 h-10 md:w-11 md:h-11' alt="Logo" />
        <h2 className='font-bold text-xl md:text-2xl tracking-tighter dark:text-white'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500'>
            Ai
          </span>
          tinerary
        </h2>
      </div>
      
      <div className='flex items-center gap-2 md:gap-4'>
        {/* Dark Mode Toggle */}
        <ModeToggle />
        
        {user ?
          <div className='flex items-center gap-2 md:gap-3'>
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full hidden md:flex items-center gap-2 border-gray-200 dark:border-gray-700 dark:text-white">
                <Plus className='h-4 w-4' /> Create Trip
              </Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full border-gray-200 dark:border-gray-700 dark:text-white">My Trips</Button>
            </a>
            
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full cursor-pointer ring-2 ring-transparent hover:ring-red-500 transition-all shadow-md' alt="profile" />
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 mt-2 dark:bg-gray-900 dark:border-gray-800">
                <h2 className='text-sm font-medium px-2 py-1 text-gray-400 mb-1 border-b dark:border-gray-800'>{user?.email}</h2>
                <h2 
                  className='cursor-pointer p-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 rounded-md text-sm font-semibold transition-colors' 
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
          :
          <Button 
            onClick={() => setOpenDialog(true)} 
            className="rounded-xl px-6 dark:bg-white dark:text-black font-bold shadow-lg shadow-blue-500/10"
          >
            Sign In
          </Button>
        }
      </div>

      {/* Modernized Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md rounded-3xl dark:bg-gray-950 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="sr-only">Sign In</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col items-center py-6">
                <img src='/logo.svg' className='w-20 h-20' alt="Logo" />
                <h2 className='font-bold text-2xl mt-6 text-black dark:text-white text-center'>
                  Join <span className='bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500'>Aitinerary</span>
                </h2>
                <p className="text-center mt-2 text-gray-500 dark:text-gray-400 px-4">
                  Sign in to craft, save, and share your perfect AI-powered journeys securely.
                </p>

                <Button
                  onClick={login}
                  className='w-full mt-10 py-7 flex gap-4 items-center rounded-2xl dark:bg-white dark:text-black font-bold shadow-xl shadow-blue-500/10'
                >
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

export default Header;