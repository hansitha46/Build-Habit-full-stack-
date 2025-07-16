import React, { useEffect, useState } from 'react'
import { IoMdRefreshCircle } from "react-icons/io";

export default function Tip() {
    const tips = [
        "Start with an incredibly small habit-Make it so easy you can’t say no.",
        "Increase your habit in very small ways.",
        "One percent improvements add up surprisingly fast. So do one percent declines.",
        "Rather than trying to do something amazing from the beginning, start small and gradually improve.",
        "It is important to keep each habit reasonable, so that you can maintain momentum and make the behavior as easy as possible to accomplish.",
        "The best way to improve your self-control is to see how and why you lose control.",
        "Never miss twice",
        "Top performers make mistakes, commit errors, and get off track just like everyone else. The difference is that they get back on track as quickly as possible",
        "You shouldn’t expect to fail, but you should plan for failure.",
        "Be patient. Stick to a pace you can sustain.",
        "You can make incredible progress if you are consistent and patient.",
        "If you stay consistent and continue increasing your habit it will get hard enough, fast enough. It always does.",
        "The best way to get started is to start."
    ]
    const [currentTip, setCurrentTip] = useState(0);
    const [showNewTip, setShowNewTip] = useState(false);
    useEffect(() => {
        const index = Math.floor(Math.random() * tips.length);
        setCurrentTip(tips[index]);
        setShowNewTip(false);
    },[showNewTip])
  return (
    <div className='bg-pink-100 p-4 rounded-md dark:bg-violet-600  flex justify-between items-center '>

        <p className='text-gray-900 dark:text-white'>{currentTip}</p>
        <button 
        onClick={() => setShowNewTip(true)}
        
        ><IoMdRefreshCircle className='text-gray-900 dark:text-white text-2xl hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-300'/></button>
      
    </div>
  )
}