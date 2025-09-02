// src/App.js - AESTHETIC UPDATE
import React, { useEffect, useState, useCallback } from "react"; // ✅ Added useCallback import
import CatCard from "./components/CatCard";
import ResultScreen from "./components/ResultScreen";

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

  const loadCats = useCallback(async () => { // ✅ Wrapped in useCallback
    setIsLoading(true);
    setError(null);
    setCats([]);
    setCurrentIndex(0);
    setLikedCats([]);
    try {
      const data = await fetchTheCatAPI(10);
      setCats(data.map(cat => ({id: cat.id, url: cat.url})));
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array for useCallback

  useEffect(() => {
    loadCats();
  }, [loadCats]);

  const handleSwipe = useCallback((direction, cat) => { // ✅ Wrapped in useCallback
    if (direction === "right" && cat) {
      setLikedCats((prev) => [...prev, cat]);
    }
    setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
    }, 200);
  }, []); // Empty dependency array for useCallback

  const handleRestart = useCallback(() => { // ✅ Wrapped in useCallback
    loadCats();
  }, [loadCats]); // Dependency on loadCats

  const allCatsProcessed = currentIndex >= cats.length && !isLoading;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cat-gradient-start to-cat-gradient-end p-4 font-sans text-cat-text"> {/* ✅ Aesthetic gradient, custom font, text color */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-lg text-center leading-tight"> {/* ✅ Larger, bolder title with shadow, white text */}
        Paws and Preferences <span className="text-cat-primary">🐾</span>
      </h1>

      <div className="relative w-full max-w-sm flex flex-col items-center justify-center flex-grow">
        {isLoading && (
          <div className="flex flex-col items-center text-cat-light-text text-lg animate-pulse">
            <img src="https://cataas.com/cat/gif?_=${Date.now()}" alt="Loading Cat" className="w-24 h-24 rounded-full mb-4 shadow-md" /> {/* ✅ Loading animation */}
            Loading adorable cats...
          </div>
        )}
        {error && (
          <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg shadow-md max-w-xs border border-red-300"> {/* ✅ More distinct error message */}
            <p className="font-semibold mb-2">{error}</p>
            <button
              onClick={loadCats}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && cats.length === 0 && (
          <div className="text-lg text-cat-light-text text-center p-4 bg-cat-bg-light rounded-lg shadow-sm">
            No cats found. Please try again.
            <button
              onClick={loadCats}
              className="mt-4 px-4 py-2 bg-cat-primary text-white rounded-full hover:bg-cat-secondary transition-colors"
            >
              Reload
            </button>
          </div>
        )}

        {!isLoading && !error && !allCatsProcessed && (
          <div className="relative w-[300px] h-[300px] transition-all duration-300 ease-out">
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