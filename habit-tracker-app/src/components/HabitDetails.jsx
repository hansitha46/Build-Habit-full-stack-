import { FaEdit, FaRegFileArchive, FaTrash, FaHeart, FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Calendar from 'react-calendar';
import { useState } from "react";
import { isSameDay } from "date-fns";

export default function HabitDetails({ habit, onHabitDeleted, onHabitUpdated, setShowDetails }) {
  const isLevel1 = habit.level === 1;
  const isLevel2 = habit.level === 2;
  const progress = habit._progress || 0;
  const [value, setValue] = useState(new Date())

  const isDayCompleted = (date) => {
    const dateObj = (date instanceof Date) ? date : new Date(date);
    return habit.completedDays.some(day => isSameDay(new Date(day.date), dateObj) && day.completed);
  };

  

  const tileClassName = ({date,view}) =>{
    if(view === 'month'){
      return isDayCompleted(date) ? 'bg-green-100 border-green-300' : '';
    }
    return '';
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-400"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {habit.title}
            </h2>

            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">{habit.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-400">Progress</h3>
                  <p>{progress}%</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-400">Current Streak</h3>
                  <p>{habit.currentStreak} days</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-400">Longest Streak</h3>
                  <p>{habit.longestStreak} days</p>
                </div>
                {isLevel1 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 dark:text-gray-400">Lives Remaining</h3>
                    <div className="flex gap-1">
                      {[...Array(habit.livesRemaining)].map((_, i) => (
                        <FaHeart key={i} className="text-red-400" />
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-400">Level</h3>
                  <p>
                    {habit.level}
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <Calendar
                value={value}
                onChange={setValue}
                className="border rounded-lg p-2 shadow-sm"
                tileClassName={tileClassName}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  onHabitDeleted(habit);
                  setShowDetails(false);
                }}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
              <button
                onClick={() => {
                  onHabitUpdated(habit);
                  setShowDetails(false);
                }}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 flex items-center gap-2"
              >
                <FaEdit /> Edit
              </button>
            </div>
          </div>
        </div> 
    
  );
}