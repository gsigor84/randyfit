// components/TrainingModal.js
"use client";

import { useState, useEffect } from 'react';
import './trainingModal.css';

export default function TrainingModal({ isOpen, onClose, onSelectExercises }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      // Reset selected exercises when the modal is closed
      setSelectedExercises([]);
      setSelectedCategory(null);
      setSelectedGroup(null);
    }
  }, [isOpen]);

  const handleExerciseSelect = (exercise) => {
    setSelectedExercises((prevSelected) => {
      const lowerCaseExercise = exercise.toLowerCase();
      if (prevSelected.some((item) => item.toLowerCase() === lowerCaseExercise)) {
        // Remove the exercise if it's already selected
        return prevSelected.filter((item) => item.toLowerCase() !== lowerCaseExercise);
      } else {
        // Add the exercise if it's not already selected
        return [...prevSelected, exercise];
      }
    });
  };

  const handleSelectButtonClick = () => {
    onSelectExercises(selectedExercises);
    onClose();
  };
  const categories = {
    "Upper Body": [
      { group: "Chest", exercises: ["Bench Press", "Push-Ups", "Chest Fly"] },
      { group: "Back", exercises: ["Pull-Ups", "Lat Pulldown", "Deadlift"] },
      { group: "Shoulders", exercises: ["Overhead Press", "Lateral Raise"] },
      { group: "Biceps", exercises: ["Barbell Curl", "Hammer Curl"] },
      { group: "Triceps", exercises: ["Tricep Pushdown", "Skull Crushers"] }
    ],
    "Lower Body": [
      { group: "Legs", exercises: ["Squats", "Lunges", "Leg Press"] },
      { group: "Glutes", exercises: ["Hip Thrusts", "Glute Bridge"] }
    ],
    "Full Body": [
      { group: "Full Body", exercises: ["Burpees", "Kettlebell Swings"] }
    ]
  };
  if (!isOpen) return null;
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>✕</button>
        <h2>Find a Workout</h2>

        <div className="modalBody">
          <div className="workoutList">
            {Object.keys(categories).map((category) => (
              <div
                key={category}
                className={`workoutItem ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="workoutTitle">{category}</div>
              </div>
            ))}
          </div>

          <div className="exerciseDetailsSection">
            {selectedCategory ? (
              <>
                {categories[selectedCategory].map((muscleGroup) => (
                  <div
                    key={muscleGroup.group}
                    className={`exerciseCategory ${selectedGroup === muscleGroup.group ? 'expanded' : ''}`}
                  >
                    <h4 onClick={() => setSelectedGroup(muscleGroup.group === selectedGroup ? null : muscleGroup.group)}>
                      {muscleGroup.group}
                    </h4>
                    {selectedGroup === muscleGroup.group && (
                      <ul>
                        {muscleGroup.exercises.map((exercise) => (
                          <li key={exercise}>
                            <input
                              type="checkbox"
                              className="exerciseCheckbox"
                              checked={selectedExercises.includes(exercise)}
                              onChange={() => handleExerciseSelect(exercise)}
                            />
                            <span>{exercise}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                <button className="selectButton" onClick={handleSelectButtonClick}>Select</button>
              </>
            ) : (
              <p className="placeholderText">Select a category to view exercises</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
