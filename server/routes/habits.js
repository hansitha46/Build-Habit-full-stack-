import express from 'express';
import Habit from '../models/Habit.js';
import {
    getHabits,
    createHabit,
    getHabit,
    updateHabit,
    deleteHabit,
    updateCompletion
  } from '../controller/HabitController.js';

const router = express.Router();
//get all habits



router.get('/', getHabits);          // List all habits
router.post('/', createHabit);       // Create new habit
router.get('/:id', getHabit);       // Get single habit
router.put('/:id', updateHabit);    // Full update
router.patch('/:id', updateHabit);  // Partial update
router.delete('/:id', deleteHabit); // Delete habit

// Special action route
router.patch('/:id/complete', updateCompletion); // Toggle completion




export default router;