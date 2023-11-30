import React, { useState } from 'react';

type FlashCardProps = {
  word: string;
  translation: string;
  audioUrl: string;
  imageUrl: string;
};

const FlashCard: React.FC<FlashCardProps> = ({ word, translation, audioUrl, imageUrl }) => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={toggleFlip}>
      <img className="w-full" src={imageUrl} alt={word} />
      <div className="px-6 py-4">
        {flipped ? (
          <>
            <div className="font-bold text-xl mb-2">{translation}</div>
            <audio controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </>
        ) : (
          <div className="font-bold text-xl mb-2">{word}</div>
        )}
      </div>
    </div>
  );
};

export default FlashCard;
