import React from "react"; 
import ExerciseCard from "./ExerciseCard";
 function ExerciseList({ muscle, exercises })
  { return ( <div className="p-6"> <h2 className="text-2xl font-semibold mb-4"> 
      Exercises for {muscle.toUpperCase()}
  {/* Exercises for {muscle } */}
     </h2> 
     <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
       {exercises.map((exercise, index) => ( <ExerciseCard key={index}
        exercise={exercise} /> ))} 
        </div> </div> ); 
        } 
        export default ExerciseList;