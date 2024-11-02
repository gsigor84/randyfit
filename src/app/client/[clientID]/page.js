// src/app/client/[clientID]/page.js
"use client"; // Add this line at the top to make this a client component

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TrainingModal from '../../../../components/TrainingModal';

export default function ClientDetailPage() {
  const pathname = usePathname();
  const clientId = pathname.split('/').pop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const [savedWorkout, setSavedWorkout] = useState(null); // State to store the saved workout

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSelectExercises = (exercises) => {
    setSelectedExercises((prevExercises) => {
      const newExercises = exercises.filter((exercise) => !prevExercises.includes(exercise));
      return [...prevExercises, ...newExercises];
    });

    // Initialize details for new exercises with empty values
    const updatedDetails = { ...exerciseDetails };
    exercises.forEach((exercise) => {
      if (!updatedDetails[exercise]) {
        updatedDetails[exercise] = { set: '', weight: '', reps: '' };
      }
    });
    setExerciseDetails(updatedDetails);
  };

  const handleExerciseToggle = (exercise) => {
    setSelectedForDeletion((prevSelected) => {
      if (prevSelected.includes(exercise)) {
        return prevSelected.filter((item) => item !== exercise);
      } else {
        return [...prevSelected, exercise];
      }
    });
  };

  const handleDeleteSelected = () => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((exercise) => !selectedForDeletion.includes(exercise))
    );
    setSelectedForDeletion([]);
  };

  const handleDetailChange = (exercise, field, value) => {
    setExerciseDetails((prevDetails) => ({
      ...prevDetails,
      [exercise]: {
        ...prevDetails[exercise],
        [field]: value,
      },
    }));
  };

  const handleSaveWorkout = () => {
    // Collect workout data
    const workoutData = selectedExercises.map((exercise) => ({
      name: exercise,
      ...exerciseDetails[exercise],
    }));

    // Save the workout data to the state
    setSavedWorkout(workoutData);

    alert('Workout saved successfully!');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{clientId.replace('-', ' ')}</h1>
        <p className="text-gray-600">Overview</p>
      </header>

      <nav className="bg-white rounded-lg shadow mb-8">
        <ul className="flex flex-col sm:flex-row sm:justify-around p-4 text-gray-700 space-y-2 sm:space-y-0">
          <li><a href="#" onClick={handleOpenModal} className="hover:text-blue-600 text-center sm:text-left">Training</a></li>
          <li><a href="#" className="hover:text-blue-600 text-center sm:text-left">Overview</a></li>
          <li><a href="#" className="hover:text-blue-600 text-center sm:text-left">Tasks</a></li>
          <li><a href="#" className="hover:text-blue-600 text-center sm:text-left">Meal Plan</a></li>
        </ul>
      </nav>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Training</h2>
        <div className="flex flex-col sm:flex-row sm:justify-between text-center sm:text-left mb-6 space-y-4 sm:space-y-0">
          <div>
            <span className="block text-gray-500">Last 7 Days</span>
            <strong className="text-gray-800">33% Tracked</strong>
          </div>
          <div>
            <span className="block text-gray-500">Last 30 Days</span>
            <strong className="text-gray-800">67% Tracked</strong>
          </div>
          <div>
            <span className="block text-gray-500">Next Week</span>
            <strong className="text-gray-800">2 Assigned</strong>
          </div>
        </div>

        {savedWorkout && savedWorkout.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">Last Workout</h3>
            <div className="grid grid-cols-4 gap-4 text-gray-700 font-semibold">
              <span>Exercise</span>
              <span>Set</span>
              <span>Weight</span>
              <span>Reps</span>
            </div>
            <ul className="mt-2 space-y-2">
              {savedWorkout.map((exercise, index) => (
                <li key={index} className="grid grid-cols-4 gap-4 text-gray-700 bg-gray-100 p-2 rounded">
                  <span>{exercise.name}</span>
                  <span>{exercise.set || '-'}</span>
                  <span>{exercise.weight || '-'}</span>
                  <span>{exercise.reps || '-'}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">No workout saved yet.</p>
        )}

        {selectedExercises.length > 0 && (
          <div>
            <h3 className="text-md sm:text-lg font-semibold text-gray-800 mb-2">Selected Exercises</h3>
            <ul className="space-y-4 mb-4">
              {selectedExercises.map((exercise) => (
                <li key={exercise} className="flex items-center space-x-4 bg-gray-100 rounded-lg p-4">
                  <input
                    type="checkbox"
                    checked={selectedForDeletion.includes(exercise)}
                    onChange={() => handleExerciseToggle(exercise)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-semibold flex-1">{exercise}</span>
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <input
                      type="text"
                      value={exerciseDetails[exercise]?.set || ''}
                      onChange={(e) => handleDetailChange(exercise, 'set', e.target.value)}
                      className="border rounded p-1 text-center"
                      placeholder="Set"
                    />
                    <input
                      type="number"
                      value={exerciseDetails[exercise]?.weight || ''}
                      onChange={(e) => handleDetailChange(exercise, 'weight', e.target.value)}
                      className="border rounded p-1 text-center"
                      placeholder="Weight"
                    />
                    <input
                      type="number"
                      value={exerciseDetails[exercise]?.reps || ''}
                      onChange={(e) => handleDetailChange(exercise, 'reps', e.target.value)}
                      className="border rounded p-1 text-center"
                      placeholder="Reps"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                onClick={handleSaveWorkout}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
              >
                Save Workout
              </button>
              <button
                onClick={handleDeleteSelected}
                disabled={selectedForDeletion.length === 0}
                className={`px-4 py-2 rounded w-full sm:w-auto ${selectedForDeletion.length > 0
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      <TrainingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectExercises={handleSelectExercises}
      />
    </div>
  );
}
