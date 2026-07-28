import { useState, useRef } from "react";
import API from "../services/api";

function TopicInput({
  setStudyData,
  setLoading,
  setError,
  loading,
}) {
  const [topic, setTopic] = useState("");

  // Store the current request controller
  const controllerRef = useRef(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    // Cancel previous request if it's still running
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create a new controller
    controllerRef.current = new AbortController();

    setLoading(true);
    setError("");
    setStudyData(null);

    try {
      const response = await API.post(
        "/generate",
        {
          topic,
        },
        {
          signal: controllerRef.current.signal,
        }
      );

      setStudyData(response.data);

      // Clear input after successful generation
      setTopic("");

    } catch (error) {

      // Ignore cancelled requests
      if (
        error.name === "CanceledError" ||
        error.code === "ERR_CANCELED"
      ) {
        return;
      }

      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError("Unable to connect to the server.");
      }

    } finally {
      controllerRef.current = null;
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleGenerate();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <input
        type="text"
        placeholder="Enter any topic (e.g. Machine Learning)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full max-w-2xl px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow-sm"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`px-8 py-3 rounded-xl text-white font-semibold transition duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "⏳ Generating..." : "Generate Study Material"}
      </button>
    </div>
  );
}

export default TopicInput;