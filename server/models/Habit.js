import mongoose from 'mongoose';

const habitEntrySchema = new mongoose.Schema({
    date: { type: String, required: true },
    completed: { type: Boolean, default: false }
  });
  
  const habitSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    level: { type: Number, required: true, enum: [1, 2, 3], default: 1 },
    startDate: { type: Date, required: true, default: Date.now },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    livesRemaining: { type: Number, default: 3 }, // Only for Level 1
    completedDays: [habitEntrySchema],
    isActive: { type: Boolean, default: true },
    resetCount: { type: Number, default: 0 },
    lastUpdated: { type: Date }, // Track last progress update
    _progress: {type: Number,default : 0}
  }, { timestamps: true });

  habitSchema.virtual('progress').get(function() {
    if(this.level === 3) {
        return null;
    }
    if(this.level === 1) {
      const completed = this.completedDays.filter(d => d.completed).length;
      return Math.min((completed/21) * 100,100);
    }
    if(this.level === 2) {
      let progress = this._progress || 0; // Stored to persist penalties
      return Math.min(progress, 100);
    }
  })

  habitSchema.virtual('isCompleted').get(function(){
    const today = new Date().toDateString();
    return this.completedDays.some(day => day.date.toDateString() === today && day.completed);
  })

/*habitSchema.methods.updateHabit = async function () {
  const today = new Date().toDateString();
  //todatestring=> gets the date only: sun 13 jul 2025
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if we already updated today
  if (this.lastUpdated && this.lastUpdated.toDateString() === today) {
    return; // Already updated today
  }

  const wasCompletedYesterday = this.completedDays.some(
    day => day.date.toDateString() === yesterday.toDateString() && day.completed
  );
  // some() method: checks if atleast one elements passes the test implemented by the function;
  if(wasCompletedYesterday){
    this.currentStreak += 1;
    this.longestStreak = Math.max(this.currentStreak, this.longestStreak);
  }
  else{
    this.currentStreak = 0;
    if(this.level == 1){
      this.livesRemaining -= 1;
    }
    else if(this.level == 2){
      this._progress = Math.max((this._progress || 0) -3 , 0 );
    }
    
  }

  // Fixed variable reference
  if(this.level == 1 && this.livesRemaining <= 0){
    this.level = 1;
    this.startDate = new Date();
    this.completedDays = [];
    this.livesRemaining = 3;
    this.resetCount += 1;
  }
  // what is _progress

  // Level progression checks
  if(this.level == 2 && this._progress >= 100){
    this.level = 3;
  }
  if(this.level == 1 &&  this.completedDays.filter(d => d.completed).length / 21 * 100 >= 100){
    this.level = 2;
  }
  
  this.lastUpdated = new Date();
  await this.save();

};

habitSchema.methods.addCompletedDay = function(){
  const today = new Date().toDateString();
  if(!this.completedDays.some(day => day.date.toDateString() === today)){
    this.completedDays.push({date: new Date(), completed: true});
    if(this.level === 2){
      this._progress = Math.min((this._progress || 0) + 5, 100);
    }
  }
  console.log(this.completedDays);
};
*/
const Habit =  mongoose.model('Habit', habitSchema);
export default Habit;
