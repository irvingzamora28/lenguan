// Import necessary libraries
import React, { useState } from 'react';

// Define a type for the exercise data
interface Exercise {
  audio: string; // URL of the audio file
  options: string[]; // Options for user to choose from
  correctAnswer: string; // Correct answer
}

// Dummy data for the exercise
const exercises = [
    {
      audio: 'audio/hallo.mp3',
      correctAnswer: 'Hallo',
      options: ['Hallo', 'Büro', 'Hütte', 'Ich']
    },
    {
      audio: 'audio/bitte.mp3',
      correctAnswer: 'Bitte',
      options: ['Bitte', 'Tür', 'Hütte', 'Ich']
    },
    {
      audio: 'audio/guten_tag.mp3',
      correctAnswer: 'Guten Tag',
      options: ['Entschuldigung', 'Guten Tag', 'Hallo', 'Wunderbar']
    },
    {
      audio: 'audio/wunderbar.mp3',
      correctAnswer: 'Wunderbar',
      options: ['Wunderbar', 'Entschuldigung', 'Guten Tag', 'grün']
    },
    {
      audio: 'audio/hutte.mp3',
      correctAnswer: 'Hütte',
      options: ['Hütte', 'Büro', 'Tür', 'Ich']
    },
    {
      audio: 'audio/buro.mp3',
      correctAnswer: 'Büro',
      options: ['Büro', 'Tür', 'Hallo', 'Ich']
    },
    {
      audio: 'audio/tur.mp3',
      correctAnswer: 'Tür',
      options: ['Tür', 'Büro', 'Hütte', 'Ich']
    },
    {
      audio: 'audio/entschuldigung.mp3',
      correctAnswer: 'Entschuldigung',
      options: ['Entschuldigung', 'Wunderbar', 'Guten Tag', 'grün']
    },
    {
      audio: 'audio/ich.mp3',
      correctAnswer: 'Ich',
      options: ['Ich', 'Hallo', 'Hütte', 'Büro']
    },
    {
      audio: 'audio/grun.mp3',
      correctAnswer: 'grün',
      options: ['grün', 'Wunderbar', 'Guten Tag', 'Tür']
    },
  ];


const ListeningExercise: React.FC = () => {
  // Assume we're working with the first exercise for simplicity
  const exercise = exercises[0];

  // State to hold user's selected answer
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  // Function to handle option selection
  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
    if (option === exercise.correctAnswer) {
      // If the selected option is correct, handle it here
    } else {
      // If the selected option is incorrect, handle it here
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Match the Audio</h1>
      <audio controls src={exercise.audio}>Your browser does not support the audio element.</audio>
      <div className="mt-4">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            className={`block w-full p-2 mb-2 text-left ${option === selectedAnswer ? 'bg-blue-200' : 'bg-white'} border border-gray-200 rounded`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListeningExercise;
