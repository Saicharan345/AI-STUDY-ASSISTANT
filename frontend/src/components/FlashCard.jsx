import { useState } from "react";

function FlashCard({ flashcards }) {
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        📚 Flashcards
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className="h-60 cursor-pointer perspective"
            onClick={() => handleFlip(index)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                flippedCards[index] ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full bg-blue-600 text-white rounded-2xl shadow-lg flex flex-col justify-center items-center p-6 backface-hidden">
                <h3 className="text-xl font-bold mb-4">
                  Question
                </h3>

                <p className="text-center text-lg">
                  {card.question}
                </p>

                <p className="mt-6 text-sm text-blue-200">
                  Click to reveal answer 👆
                </p>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full bg-green-600 text-white rounded-2xl shadow-lg flex flex-col justify-center items-center p-6 rotate-y-180 backface-hidden">
                <h3 className="text-xl font-bold mb-4">
                  Answer
                </h3>

                <p className="text-center text-lg">
                  {card.answer}
                </p>

                <p className="mt-6 text-sm text-green-200">
                  Click to flip back 🔄
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlashCard;