import React from 'react'
import HabitItem from './HabitItem'
const HabitList = ({habits,onCheckboxChange,onHabitDetalis,onHabitUpdated,onHabitDeleted,selectedHabit}) => {
  return (
    <div className="space-y-4">
        {
          habits.map(habit =>(
            <HabitItem
            key = {habit._id}
            habit = {habit}
            onCheckboxChange = {onCheckboxChange}
            onHabitDetalis = {onHabitDetalis}
            onHabitUpdated = {onHabitUpdated}
            onHabitDeleted = {onHabitDeleted}
            selectedHabit = {selectedHabit}
            />
          ))
        }
      
    </div>
  )
}

export default HabitList
