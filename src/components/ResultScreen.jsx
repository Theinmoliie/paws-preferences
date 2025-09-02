import React from "react";

const ResultScreen = ({ likedCats, totalCats, onRestart }) => {
  return (
    <div className="p-8 text-center max-w-md w-full mx-auto bg-white/90 rounded-3xl shadow-2xl backdrop-blur-sm ">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-800 drop-shadow-sm">
        Your Purr-file 🐾
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        You liked <span className="font-bold text-pink-600">{likedCats.length}</span> out of{" "}
        <span className="font-bold text-yellow-600">{totalCats}</span> cats!
      </p>

      {likedCats.length > 0 ? (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">
            Your Favorite Felines
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center mb-8">
            {likedCats.map((cat) => (
              <div
                key={cat.id}
                className="w-20 h-20 bg-gray-100 rounded-xl shadow-md overflow-hidden flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={cat.url}
                  alt="Liked Cat"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-500 mb-8">
          No cats made the cut this time 🫠
        </p>
      )}
<br></br>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold rounded-full shadow-lg
                   hover:scale-105 active:scale-95 transition-transform duration-300 text-lg"
      >
        Try Again!
      </button>
    </div>
  );
};

export default ResultScreen;
