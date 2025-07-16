import React, { useState, useMemo } from 'react';
import { FaHeart, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import HabitDetails from './HabitDetails';

const HabitItem = ({
  habit,
  onCheckboxChange,
  onHabitDetails,
  onHabitUpdated,
  onHabitDeleted,
  selectedHabit
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const isLevel1 = habit.level === 1;
  const isLevel2 = habit.level === 2;
  const lives = isLevel1 ? habit.livesRemaining : 0;
  const progress = habit._progress || 0;

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails && onHabitDetails) {
      onHabitDetails(habit);
    }
  };
  const isCompleted = useMemo(() => {
    try {
      // Use UTC dates to match backend logic
      const now = new Date();
      const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      
      
      return Array.isArray(habit.completedDays) 
        ? habit.completedDays.some(day => {
            const dayDate = new Date(day.date);
            const dayDateUTC = new Date(Date.UTC(
              dayDate.getUTCFullYear(),
              dayDate.getUTCMonth(),
              dayDate.getUTCDate()
            ));
            return dayDateUTC.getTime() === todayUTC.getTime() && day.completed === true;
          })
        : false;
    } catch (error) {
      console.error('Completion check failed:', error);
      return false;
    }
  }, [habit.completedDays]);
  return (
    <div className="relative">
      {/* Main Habit Card */}
      <div className="border rounded-lg p-4 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
        <input
          type="checkbox"
          onChange={() => onCheckboxChange(habit)}
          checked={isCompleted}
          className="h-5 w-5 rounded border-gray-300 focus:ring-green-500"
        />

        <span className="text-lg font-medium text-gray-700 flex-grow">
          {habit.title}
        </span>

        {/* Level Indicators */}
        <div className="flex items-center gap-2">
          {isLevel1 && (
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <FaHeart
                  key={i}
                  className={i < lives ? 'text-red-400' : 'text-gray-400'}
                />
              ))}
            </div>
          )}
          {isLevel2 && (
            <div className="w-16 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Details Button */}
        <button
          onClick={toggleDetails}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
        >
          <span>Details</span>
        </button>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <HabitDetails habit={habit} onHabitDeleted={onHabitDeleted} onHabitUpdated={onHabitUpdated} setShowDetails={setShowDetails} />
      )}
    </div>
  );
};

export default HabitItem;