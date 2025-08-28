import React, { useState } from "react";
import MuscleMap from "./MuscleMap";
import ExerciseList from "./ExerciseList";
import exercisesData from "../data/exercises.json";


function MuscleWiki() {
  const [selectedMuscle, setSelectedMuscle] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold p-6">Muscles</h1>

      <MuscleMap onSelectMuscle={(m) => setSelectedMuscle(m)} />

      <section className="p-6">
        {!selectedMuscle ? (
          <p className="text-lg">Click a muscle region to see exercises.</p>
        ) : (
          <ExerciseList
            muscle={selectedMuscle}
            exercises={exercisesData[selectedMuscle] || []}
          />
        )}
      </section>
    </div>
  );
}

export default MuscleWiki;
