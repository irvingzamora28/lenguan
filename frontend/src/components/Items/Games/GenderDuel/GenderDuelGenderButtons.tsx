import React from 'react';

// I am assuming that this is your gender object structure.
// Please adjust it according to your application.
interface Gender {
  color: string;
  name: string;
  icon: JSX.Element; // or you could use React.ReactNode
}

interface GenderDuelGenderButtonsProps {
  appearing: boolean;
  gameStatus: string;
  word: {
    word: string;
    translation: string;
  };
  genders: Gender[];
  correctGender: string | null;
  incorrectGender: string | null;
  handleGenderClick: (genderName: string) => void;
  resetAnimation: () => void;
}

const GenderDuelGenderButtons: React.FC<GenderDuelGenderButtonsProps> = ({
  appearing,
  gameStatus,
  word,
  genders,
  correctGender,
  incorrectGender,
  handleGenderClick,
  resetAnimation,
}) => (
  <>
    <div className="d-none bg-red-500 active:bg-red-700 from-red-400 to-red-500" />
    <div className="d-none bg-blue-500 active:bg-blue-700 from-blue-400 to-blue-500" />
    <div className="d-none bg-green-500 active:bg-green-700 from-green-400 to-green-500" />
    <h1
      className={`gender_duel__title text-center ${appearing ? "animate-appear" : ""}`}
      onAnimationEnd={resetAnimation}
    >
      {gameStatus !== "playing" ? gameStatus : `${word.word} (${word.translation})`}
    </h1>
    <div className="flex flex-wrap justify-center w-4/5">
      {genders.map((gender) => (
        <button
          key={gender.color}
          className={`${correctGender === gender.name.toLowerCase() ? "animate-grow" : correctGender !== null && correctGender !== gender.name.toLowerCase() ? "hidden" : ""} bg-${gender.color.toLowerCase()}-500 w-16 h-16 md:w-32 md:h-32 m-4 rounded-lg focus:outline-none hover:bg-${gender.color.toLowerCase()}-600 hover:shadow-lg active:bg-${gender.color.toLowerCase()}-700 active:scale-95 ${correctGender === gender.name.toLowerCase() ? "animate-correct" : incorrectGender === gender.name.toLowerCase() ? "animate-incorrect" : ""} transition duration-300 ease-in-out shadow-box bg-gradient-to-t from-${gender.color.toLowerCase()}-400 to-${gender.color.toLowerCase()}-500`}
          onClick={() => handleGenderClick(gender.name.toLowerCase())}
          onAnimationEnd={resetAnimation}
          disabled={gameStatus !== "playing"}
        >
          <div className="flex flex-row justify-center items-center text-lg md:text-4xl">
            {gender.icon}
            <span className="font-semibold">{gender.name}</span>
          </div>
        </button>
      ))}
    </div>
  </>
);

export default GenderDuelGenderButtons;
