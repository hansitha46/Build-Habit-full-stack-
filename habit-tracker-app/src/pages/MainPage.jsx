import HabitList from "../components/HabitLIst"
import HabitForm from "../components/HabitForm";
import Header from "../components/Header"
import { useState,useEffect } from "react";
import axios from "axios";
import Tip from "../components/Tip";

function MainPage() {
  const [showForm,setShowForm] = useState(false)
  const [habits, setHabits] = useState([]);
  const [selectedHabit,setSelectedHabit] = useState(null);
  useEffect(()=>{
    fetchHabits();
  },[])
  
  const  fetchHabits = async()=>{
      try{const response = await axios.get('http://localhost:5000/users/api/habits')
      setHabits(response.data);
    }catch(err){
        console.error("Error loading habits: ",err)
    }
  }
  // add new habit
const onHabitAdded = async(habit) =>{
  try{
    setHabits([...habits,habit]);
    fetchHabits();
  } catch (error) {
      console.error("Error adding habit", error)
  }
}

const onHabitDetalis = async(habit)=>{
  try{
    const response = await axios.get(`http://localhost:5000/users/api/habits/${habit._id}`);
    console.log("Habit details fetched successfully");
    setSelectedHabit(response.data);
  }catch(error){
    console.error("Error fetching habit details:",error);
  }
}
const onHabitUpdated = async(habit)=>{
  try{
    const response = await axios.put(`http://localhost:5000/users/api/habits/${habit._id}`,habit);
    console.log("Habit updated:",response.data);
    fetchHabits();
  }catch(error){
    console.error("Error updating habit:",error);
  }
}
const onHabitDeleted = async(habit)=>{
  try{
    const response = await axios.delete(`http://localhost:5000/users/api/habits/${habit._id}`);
    console.log("Habit deleted:",response.data);
    fetchHabits();
  }catch(error){
    console.error("Error deleting habit:",error);
  }
}
const onCheckboxChange= async(habit)=>{
  try{
    const response = await axios.patch(`http://localhost:5000/users/api/habits/${habit._id}/complete`);
    console.log("Habit updated:",response.data);
    fetchHabits();
  }catch(error){
    console.error("Error updating habit:",error);
  }
}



  return (
    <div className="w-screen h-screen bg-grey-200 dark:bg-gray-900 transition-colors duration-300">
      <header className="flex justify-between items-center  fixed top-0 left-0 right-0 bg-grey-300 dark:bg-grey-700 h-40 ">
          <Header/>

          
        </header>
      <div className="container mx-auto p-4 pt-48 bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
        

        <button
            onClick={()=>setShowForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <span className="text-xl mr-1">+</span> Add New Habit
        </button>
        <HabitList 
        habits={habits} 
        onCheckboxChange={onCheckboxChange}
        onHabitDetalis={onHabitDetalis}
        onHabitUpdated={onHabitUpdated}
        onHabitDeleted={onHabitDeleted}
        selectedHabit={selectedHabit}
        />

        {showForm && (
          <HabitForm
            onClose = {()=> setShowForm(false)}
            onHabitAdded = {onHabitAdded}
          />
        )}
        
      
        
      </div>
    </div>
  )
}

export default MainPage
