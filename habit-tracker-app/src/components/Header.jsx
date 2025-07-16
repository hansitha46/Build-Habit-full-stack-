import React, { useEffect, useState } from 'react';
import Tip from './Tip';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FaMoon,FaSun } from "react-icons/fa";

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

const logout = () => {
  const navigate = useNavigate();
  googleLogout();
  navigate('/');
}

const Header = () => {
  const [dark, setDark] = useState(getInitialTheme);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <div >
      <div className='flex justify-between items-center w-screen top-0 p-4'>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          MY HABIT TRACKER
        </h1>
        <div className='flex justify-between items-center gap-4'>
          <button
            onClick={() => {
              setDark((prev) => !prev);
              localStorage.theme = dark ? 'light' : 'dark';
            }}
            className="p-2 rounded bg-yellow-200/50 dark:bg-blue-700 text-xl "
            aria-label="Toggle dark mode"
          >
            <span >{dark ? <FaMoon/> : <FaSun/>}</span>
            
          </button>
          <button 
          onClick={logout}
          className='bg-pink-300 dark:bg-violet-700 text-xl hover:bg-pink-400 dark:hover:bg-violet-600 rounded-md p-2 '
          >
          Logout
          </button>
         </div>
      </div>
      <div className="flex justify-center items-center font-family-arial p-4">
        <Tip/>
      </div>  
    </div>
  );
};

export default Header;
