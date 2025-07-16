import express from 'express';
import Habit from '../models/Habit.js';

export const getHabits = async (req, res) => {
    try {
      const habits = await Habit.find();
      res.json(habits);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Create new habit
  export const createHabit = async (req, res) => {
    try {
      const habit = new Habit({
        ...req.body,
        completedDays: []
      });
      const savedHabit = await habit.save();
      res.status(201).json(savedHabit);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }; 

  // Get single habit
export const getHabit = async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      if (!habit) return res.status(404).json({ message: 'Habit not found' });
      res.json(habit);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //update habit
  export const updateHabit = async (req, res) => {
    try {
      const updatedHabit = await Habit.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedHabit) return res.status(404).json({ message: 'Habit not found' });
      res.json(updatedHabit);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //delete habit
  export const deleteHabit = async (req, res) => {
    try {
      const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
      if (!deletedHabit) return res.status(404).json({ message: 'Habit not found' });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// when user completes a habit, completed days is updated, and streak and progress is also updated
//toggle completion status
export const updateCompletion = async (req, res) => {
    try {
        console.log('PATCH /:id/complete called for', req.params.id);
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        // Get today's date as a string in UTC (YYYY-MM-DD)
        const todayStr = new Date().toISOString().slice(0, 10);

        console.log('Before:', habit.completedDays);

        // Find or create today's entry using string comparison
        const todayEntryIndex = habit.completedDays.findIndex(entry => entry.date === todayStr);

        if (todayEntryIndex === -1) {
            habit.completedDays.push({ date: todayStr, completed: true });
            console.log('Added new completion for today:', todayStr);
        } else {
            habit.completedDays[todayEntryIndex].completed = 
                !habit.completedDays[todayEntryIndex].completed;
            console.log('Toggled completion for today:', habit.completedDays[todayEntryIndex]);
        }

        console.log('After:', habit.completedDays);

        // Update all related metrics
        const isTodayCompleted = habit.completedDays.some(day => day.date === todayStr && day.completed);
        await updateStreakAndProgress(habit, isTodayCompleted);
        await updateLevel(habit);

        await habit.save();
        res.status(200).json({ message: "Habit updated successfully" });

    } catch (error) {
        console.error('Error in updateCompletion:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateStreakAndProgress = async (habit, isTodayCompleted) => {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    const todayStr = new Date().toISOString().slice(0, 10);

    const wasCompletedYesterday = habit.completedDays.some(day => day.date === yesterdayStr && day.completed);

    // Penalty for missing yesterday
    if (!wasCompletedYesterday && habit.completedDays[0].date !== todayStr) {
        habit.currentStreak = 0;
        if (habit.level === 1) {
            habit.livesRemaining -= 1;
            if (habit.livesRemaining <= 0) {
                await resetHabit(habit);
            }
        }
        if (habit.level === 2) {
            habit._progress = Math.max((habit._progress || 0) - 3, 0);
        }
    }

    // Calculate yesterday's progress for level 1
    const completedDaysExcludingToday = habit.completedDays.filter(day => day.completed && day.date !== todayStr).length;
    const penality = Date.now() - habit.startDate;
    const penalityDays = Math.floor(penality / (1000 * 60 * 60 * 24));
    const yesterdayProgressLvl2 = Math.min(( Math.max(0,completedDaysExcludingToday*5 - penalityDays*3) / 21) * 100, 100);
    
    const yesterdaysProgressLvl1 = Math.min((completedDaysExcludingToday / 21) * 100, 100);
    //calculate longest streak
    let streak = 1;
    let longestStreak = 0;
    for(let i = 1; i < habit.completedDays.length; i++){
      if((new Date(habit.completedDays[i].date).getDate() === new Date(habit.completedDays[i-1].date).getDate()+1) && habit.completedDays[i].completed){
        streak++;
      }else{
        longestStreak = Math.max(longestStreak,streak);
        streak = 1;
      }
    }
    longestStreak = Math.max(longestStreak,streak);
    habit.longestStreak = longestStreak;


    if (isTodayCompleted) {
        // Only increment streak if today is completed
        if (wasCompletedYesterday) {
            habit.currentStreak += 1;
        } else {
            habit.currentStreak = 1;
        }
        if (habit.level === 1) {
            const completedCount = habit.completedDays.filter(d => d.completed).length;
            habit._progress = Math.min((completedCount / 21) * 100, 100);
        } else if (habit.level === 2) {
            habit._progress = Math.min((habit._progress || 0) + 5, 100);
        }
    } else {
        // If today is not completed, revert progress to yesterday's value
        if (habit.level === 1) {
            habit._progress = yesterdaysProgressLvl1;
        }
        if(habit.level === 2){
            habit._progress = yesterdayProgressLvl2;
        }
        // For level 2, you may want to store yesterday's progress or recalculate as needed
    }
};

const updateLevel = async (habit) => {
    const completionPercentage = (habit.completedDays.filter(day => day.completed).length / 21) * 100;
    
    if (habit.level === 1 && completionPercentage >= 100) {
        habit.level = 2;
        habit._progress = 0; // Reset progress for level 2
        habit.completedDays = [];
        habit.startDate =  Date.now();
    } else if (habit.level === 2 && completionPercentage >= 100) {
        habit.level = 3;
        habit.completedDays = [];
        habit.startDate = Date.now();
        // Optionally add any mastered habit rewards
    }
};

const resetHabit = async (habit) => {
    habit.level = 1;
    habit.completedDays = [];
    habit.livesRemaining = 3;
    habit.resetCount += 1;
    habit._progress = 0;
    habit.currentStreak = 0;
};


