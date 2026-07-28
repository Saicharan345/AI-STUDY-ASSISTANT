import { useState } from "react";

import Navbar from "../components/Navbar";
import TopicInput from "../components/TopicInput";
import FlashCard from "../components/FlashCard";
import Quiz from "../components/Quiz";
import Loading from "../components/Loading";
import Error from "../components/Error";
import DownloadPDF from "../components/DownloadPDF";

function Home() {
  const [studyData, setStudyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateAnother = () => {
    setStudyData(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-6xl mx-auto p-4 md:p-8">

        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Learn Smarter with AI
          </h1>

          <p className="text-gray-600 mt-4 text-base md:text-lg">
            Generate interactive flashcards and quizzes from any topic using AI.
          </p>
        </div>

        {/* Topic Input */}
        <div id="home" className="text-center mt-10">
          <TopicInput
            setStudyData={setStudyData}
            setLoading={setLoading}
            setError={setError}
            loading={loading}
          />
        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Error */}
        {error && <Error message={error} />}

        {/* Flashcards + Quiz */}
        {!loading && studyData && (
          <>
            <div id="features">
    <FlashCard flashcards={studyData.flashcards}/>
</div>

            <Quiz quiz={studyData.quiz} />

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <DownloadPDF studyData={studyData} />

              <button
                onClick={handleGenerateAnother}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold"
              >
                🔄 Generate Another
              </button>
            </div>
          </>
        )}

       {/* Footer */}
<footer
  id="about"
  className="mt-16 border-t pt-6 text-center text-gray-500 text-sm"
>
  <h3 className="text-lg font-semibold text-gray-700 mb-2">
    About
  </h3>

  <p>
    AI Study Assistant is an AI-powered learning platform that generates
    flashcards and quizzes from any topic using React, FastAPI, and Groq AI.
  </p>

  <p className="mt-4 text-gray-400">
    Built with ❤️ using React, FastAPI & Groq AI
  </p>
</footer>
      </div>
    </div>
  );
}

export default Home;