// import React from "react";

// function ExerciseCard({ exercise }) {
//   return (
//     <div className="border rounded-lg p-4 shadow bg-white">
//       <h3 className="text-lg font-bold mb-2">{exercise.name}</h3>
      
//       <video src={exercise.video} controls className="w-full h-48 object-cover mb-2" />
//       <p className="text-sm mb-1"><strong>Instructions:</strong> {exercise.instructions}</p>
//       <p className="text-sm mb-1"><strong>Equipment:</strong> {exercise.equipment}</p>
//       <p className="text-sm"><strong>Difficulty:</strong> {exercise.difficulty}</p>
//     </div>
//   );
// }

// export default ExerciseCard;

import React from "react";

function ExerciseCard({ exercise }) {
  // Check file extension
  const isVideo = exercise.media.endsWith(".mp4");

  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <h3 className="text-lg font-bold mb-2">{exercise.name}</h3>

      {isVideo ? (
        <video
          src={exercise.media}
          controls
          className="w-full h-48 object-cover mb-2"
        />
      ) : (
        <img
          src={exercise.media}
          alt={exercise.name}
          className="w-full h-48 object-cover mb-2"
        />
      )}

      <p className="text-sm mb-1">
        <strong>Instructions:</strong> {exercise.instructions}
      </p>
      <p className="text-sm mb-1">
        <strong>Equipment:</strong> {exercise.equipment}
      </p>
      <p className="text-sm">
        <strong>Difficulty:</strong> {exercise.difficulty}
      </p>
    </div>
  );
}

export default ExerciseCard;
