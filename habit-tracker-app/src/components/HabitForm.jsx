import axios from 'axios';
import { useState } from 'react';
const HabitForm = ({onClose, onHabitAdded}) =>{
    const [formData, setFormData] = useState({
        title: '',
        description: '',

    });

    const handleChange =(e) =>{
        const {name, value } = e.target;
        setFormData(prev => ({...prev, [name] : value}));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/habits', formData);
            onHabitAdded(response.data);
            onClose();
        }catch(err){
            console.error("Error creating habit: ",err);
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative'>
                <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={onClose}>
                     &times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add new Habit</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='title'  className="block text-sm font-medium text-gray-700 mb-1">
                            Title*</label>
                        <input
                            type = "text"
                            id = "title"
                            name = "title"
                            value = {formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder='e.g., Drink more water'
                        />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='description'  className="block text-sm font-medium text-gray-700 mb-1"
                        >Description</label>
                        <textarea
                            id='description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder='why is the habit important?'
                        />

                    </div>
                    <div className="flex justify-end space-x-3">
                        <button  type="button"onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                            Cancel
                        </button>
                        <button type='submit' className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                            Save Habit
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )

}
export default HabitForm;