// components/TrainingModal.js
"use client";

import { useState } from 'react';
import './trainingModal.css';

export default function TrainingModal({ isOpen, onClose, onSelectExercises }) {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedExercises, setSelectedExercises] = useState([]);

  if (!isOpen) return null;

  // Toggle selection of an exercise
  const handleExerciseSelect = (exercise) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exercise)) {
        return prevSelected.filter((item) => item !== exercise); // Deselect if already selected
      } else {
        return [...prevSelected, exercise]; // Select if not already selected
      }
    });
  };

  // Pass selected exercises to parent component on selection
  const handleSelectButtonClick = () => {
    onSelectExercises(selectedExercises);
    onClose();
  };

  // Categories and exercises data
  const categories = {
    "Upper Body": [
      {
        group: "Chest",
        exercises: [
          "Bench Press (Barbell or Dumbbell)",
          "Push-Ups",
          "Chest Fly (Dumbbell or Machine)",
          "Incline Bench Press",
          "Cable Crossover",
          "Dips (Chest-focused)"
        ]
      },
      {
        group: "Back",
        exercises: [
          "Pull-Ups",
          "Lat Pulldown",
          "Bent Over Row (Barbell or Dumbbell)",
          "Seated Cable Row",
          "T-Bar Row",
          "Deadlift"
        ]
      },
      {
        group: "Shoulders",
        exercises: [
          "Overhead Press (Dumbbell or Barbell)",
          "Lateral Raise",
          "Front Raise",
          "Reverse Fly",
          "Shrugs",
          "Upright Row"
        ]
      },
      {
        group: "Biceps",
        exercises: [
          "Barbell Curl",
          "Dumbbell Curl",
          "Hammer Curl",
          "Preacher Curl",
          "Concentration Curl"
        ]
      },
      {
        group: "Triceps",
        exercises: [
          "Tricep Pushdown (Cable)",
          "Skull Crushers",
          "Close-Grip Bench Press",
          "Overhead Tricep Extension",
          "Dips (Triceps-focused)"
        ]
      }
    ],
    "Lower Body": [
      {
        group: "Legs",
        exercises: [
          "Squats",
          "Lunges",
          "Leg Press",
          "Deadlifts",
          "Leg Curl",
          "Leg Extension",
          "Calf Raises"
        ]
      },
      {
        group: "Glutes",
        exercises: [
          "Hip Thrusts",
          "Glute Bridge",
          "Bulgarian Split Squat",
          "Step-Ups",
          "Cable Kickbacks"
        ]
      }
    ],
    "Full Body": [
      {
        group: "Full Body",
        exercises: [
          "Burpees",
          "Kettlebell Swings",
          "Mountain Climbers",
          "Rowing Machine",
          "Battle Ropes"
        ]
      }
    ]
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>✕</button>
        <h2>Find a Workout</h2>


        {/* Two-column layout */}
        <div className="modalBody">
          {/* Left Column: Categories */}
          <div className="workoutList">

            {Object.keys(categories).map((category) => (
              <div
                key={category}
                className="workoutItem"
                onClick={() => setSelectedCategory(category)} // Set selected category on click
              >
                <div className="workoutTitle">{category}</div>
              </div>
            ))}
          </div>

          {/* Right Column: Exercises for the Selected Category */}
          <div className="exerciseDetailsSection">
            {selectedCategory ? (
              <>
                <h3>{selectedCategory} Exercises</h3>
                {categories[selectedCategory].map((muscleGroup) => (
                  <div className="exerciseCategory" key={muscleGroup.group}>
                    <h4>{muscleGroup.group}</h4>
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
