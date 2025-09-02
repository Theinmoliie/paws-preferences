// src/App.js - ENHANCED AESTHETIC UPDATE (No Borders)
import React, { useEffect, useState, useCallback } from "react";
import CatCard from "./components/CatCard";
import ResultScreen from "./components/ResultScreen";
import { PawPrint } from "lucide-react"; // Cute loading icon

const fetchTheCatAPI = async (limit = 10) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cats from TheCatAPI");
  }
  const data = await response.json();
  return data;
};

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCats([]);
    setCurrentIndex(0);
    setLikedCats([]);
    try {
      const data = await fetchTheCatAPI(10);
      setCats(data.map((cat) => ({ id: cat.id, url: cat.url })));
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCats();
  }, [loadCats]);

  const handleSwipe = useCallback((direction, cat) => {
    if (direction === "right" && cat) {
      setLikedCats((prev) => [...prev, cat]);
    }
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 200);
  }, []);

  const handleRestart = useCallback(() => {
    loadCats();
  }, [loadCats]);

  const allCatsProcessed = currentIndex >= cats.length && !isLoading;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 font-sans text-gray-800 relative overflow-hidden">
      {/* Floating Paw Print Background Decoration */}
      <div className="absolute top-10 left-10 text-pink-200 opacity-40 text-6xl rotate-12">
        🐾
      </div>
      <div className="absolute bottom-10 right-10 text-blue-200 opacity-40 text-6xl -rotate-12">
        🐾
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 drop-shadow-lg text-center leading-tight">
        Paws & Preferences <span className="text-pink-500">🐾</span>
      </h1>

      {/* Instruction Banner */}
      {!allCatsProcessed && !isLoading && !error && (
        <div className="mb-6 px-6 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-md text-gray-700 text-center max-w-sm">
          👉 Swipe <span className="text-green-500 font-semibold">right</span> to
          like, <span className="text-red-500 font-semibold">left</span> to pass
        </div>
      )}

      <div className="relative w-full max-w-sm flex flex-col items-center justify-center flex-grow">
        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center text-gray-600 text-lg animate-pulse">
            <PawPrint className="w-12 h-12 mb-4 animate-spin text-pink-500" />
            <img
              src={`https://cataas.com/cat/gif?type=funny&_=${Date.now()}`}
              alt="Loading Cat"
              className="w-28 h-28 rounded-full mb-4 shadow-md object-cover"
            />
            Fetching adorable cats...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg shadow-md max-w-xs">
            <p className="font-semibold mb-2">{error}</p>
            <button
              onClick={loadCats}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Cats */}
        {!isLoading && !error && cats.length === 0 && (
          <div className="text-lg text-gray-600 text-center p-4 bg-white/80 rounded-lg shadow-sm">
            No cats found. Please try again.
            <button
              onClick={loadCats}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Reload
            </button>
          </div>
        )}

        {/* Cat Cards */}
        {!isLoading && !error && !allCatsProcessed && (
          <div className="relative w-[320px] h-[340px] p-2 rounded-3xl bg-gradient-to-tr from-white/60 to-white/40 shadow-2xl backdrop-blur-md">
            {cats.map((cat, index) => {
              if (index === currentIndex) {
                return (
                  <CatCard
                    key={cat.id}
                    cat={cat}
                    onSwipe={handleSwipe}
                    index={0}
                    isTopCard={true}
                  />
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && allCatsProcessed && (
          <ResultScreen
            likedCats={likedCats}
            totalCats={cats.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;
