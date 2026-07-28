import { useState } from "react";

function Quiz({ quiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const handleAnswer = (questionIndex, option) => {
    if (selectedAnswers[questionIndex]) return;

    const correct = quiz[questionIndex].answer;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));

    setAnsweredCount((prev) => prev + 1);

    if (option === correct) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div className="mt-14">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        📝 Quiz
      </h2>

      <div className="space-y-8">
        {quiz.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {questionIndex + 1}. {question.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, optionIndex) => {
                const selected = selectedAnswers[questionIndex];
                const correct = question.answer;

                let buttonClass =
                  "bg-gray-100 hover:bg-gray-200 text-gray-800";

                if (selected) {
                  if (option === correct) {
                    buttonClass =
                      "bg-green-500 text-white";
                  } else if (
                    option === selected &&
                    option !== correct
                  ) {
                    buttonClass =
                      "bg-red-500 text-white";
                  } else {
                    buttonClass =
                      "bg-gray-200 text-gray-600";
                  }
                }

                return (
                  <button
                    key={optionIndex}
                    disabled={!!selected}
                    onClick={() =>
                      handleAnswer(questionIndex, option)
                    }
                    className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${buttonClass} ${
                      selected
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Score Badge */}

      <div className="flex justify-center mt-10">
        <div className="inline-block bg-blue-100 text-blue-700 px-8 py-4 rounded-full shadow-md font-bold text-2xl">
          🏆 Score: {score}/{quiz.length}
        </div>
      </div>

      {/* Quiz Completed */}

      {answeredCount === quiz.length && (
        <div className="mt-8 bg-gradient-to-r from-green-100 to-green-50 border border-green-300 rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">
            🎉 Quiz Completed!
          </h2>

          <p className="text-xl mt-4 font-semibold">
            Final Score: {score} / {quiz.length}
          </p>

          {score === quiz.length && (
            <p className="mt-3 text-green-700 font-bold text-lg">
              🌟 Excellent! Perfect Score!
            </p>
          )}

          {score >= quiz.length * 0.7 &&
            score < quiz.length && (
              <p className="mt-3 text-blue-700 font-bold text-lg">
                👍 Great Job!
              </p>
            )}

          {score < quiz.length * 0.7 && (
            <p className="mt-3 text-orange-600 font-bold text-lg">
              📚 Keep Practicing!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;