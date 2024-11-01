// src/app/client/[clientId]/page.js
"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TrainingModal from '../../../../components/TrainingModal';
import './clientDetails.css';

export default function ClientDetailPage() {
  const pathname = usePathname();
  const clientId = pathname.split('/').pop();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]); // Tracks exercises to delete

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handler to update selected exercises
  const handleSelectExercises = (exercises) => {
    setSelectedExercises((prevExercises) => [...prevExercises, ...exercises]);
  };

  // Toggle selection for deletion
  const handleExerciseToggle = (exercise) => {
    setSelectedForDeletion((prevSelected) => {
      if (prevSelected.includes(exercise)) {
        return prevSelected.filter((item) => item !== exercise); // Deselect if already selected
      } else {
        return [...prevSelected, exercise]; // Select if not already selected
      }
    });
  };

  // Delete selected exercises
  const handleDeleteSelected = () => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((exercise) => !selectedForDeletion.includes(exercise))
    );
    setSelectedForDeletion([]); // Clear selection after deletion
  };

  return (
    <div className="clientDetailContainer">
      <header className="clientHeader">
        <h1>{clientId.replace('-', ' ')}</h1>
        <p>Overview</p>
      </header>

      <nav className="topNavBar">
        <ul>
          <li><a href="#" onClick={handleOpenModal}>Training</a></li>
          <li><a href="#">Overview</a></li>
          <li><a href="#">Tasks</a></li>
          <li><a href="#">Meal Plan</a></li>
        </ul>
      </nav>

      <div className="trainingSection">
        <h2>Training</h2>
        <div className="trainingStats">
          <div>
            <span>Last 7 Days</span>
            <strong>33% Tracked</strong>
          </div>
          <div>
            <span>Last 30 Days</span>
            <strong>67% Tracked</strong>
          </div>
          <div>
            <span>Next Week</span>
            <strong>2 Assigned</strong>
          </div>
        </div>
        <p className="lastWorkout">Last Workout: Squat, Press, Power Clean - Demo</p>

        {/* Display selected exercises here */}
        {selectedExercises.length > 0 && (
          <div className="selectedExercises">
            <h3>Selected Exercises</h3>
            <ul>
              {selectedExercises.map((exercise) => (
                <li key={exercise}>
                  <input
                    type="checkbox"
                    checked={selectedForDeletion.includes(exercise)}
                    onChange={() => handleExerciseToggle(exercise)}
                    className="exerciseCheckbox"
                  />
                  <span>{exercise}</span>
                </li>
              ))}
            </ul>
            <div className="exerciseActions">
              <button className="checkResultBtn" onClick={handleOpenModal}>Add More Exercises</button>
              <button
                className="deleteButton"
                onClick={handleDeleteSelected}
                disabled={selectedForDeletion.length === 0} // Disable if no exercises are selected
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
