import React, { useRef, useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";

function PoseCoach() {
  const [exercise, setExercise] = useState("bicep");
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
const [challengeTime, setChallengeTime] = useState(30); // default 30s
const [challengeActive, setChallengeActive] = useState(false);

  // --- Helper: Speak text
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1; // speed
  window.speechSynthesis.speak(utterance);
}
  useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => {
      setTime((t) => {
        if (challengeActive && t + 1 >= challengeTime) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setChallengeActive(false);
          speak(`Challenge over! You did ${count} reps`);
        }
        return t + 1;
      });
    }, 1000);
  }
  return () => clearInterval(intervalRef.current);
}, [isRunning, challengeActive, challengeTime, count]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Rep counters (using useRef for mutable state within functional component)
  const leftReps = useRef(0);
  const rightReps = useRef(0);
  const squatReps = useRef(0); // Added rep counter for squats
  const leftArmUp = useRef(false);
  const rightArmUp = useRef(false);
  const squatDown = useRef(false); // Added flag for squat detection


  // --- Helper: Calculate angle between three points
  function calculateAngle(a, b, c) {
    const AB = { x: a.x - b.x, y: a.y - b.y };
    const CB = { x: c.x - b.x, y: c.y - b.y };

    let dot = AB.x * CB.x + AB.y * CB.y;
    let magAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
    let magCB = Math.sqrt(CB.x * CB.x + CB.y * CB.y);

    let angle = Math.acos(dot / (magAB * magCB));
    return (angle * 180) / Math.PI;
  }

  // --- Helper: Draw angle text
  function drawAngle(ctx, landmark, angle, color) {
    ctx.fillStyle = color;
    ctx.font = "10px Arial";
    ctx.fillText(
      `${Math.round(angle)}°`,
      landmark.x * ctx.canvas.width,
      landmark.y * ctx.canvas.height
    );
  }

  // --- Helper: Count reps (modified for exercise type)
  function countExercise(angle, side, exercise) {
     let newCount = count; // local copy
    if (exercise === "bicep") {
      if (side === "left") {
        if (angle > 150) {
          leftArmUp.current = false;
        }
        if (angle < 50 && !leftArmUp.current) {
          leftReps.current += 1;
          leftArmUp.current = true;
           // setCount(leftReps.current + rightReps.current);
          newCount = leftReps.current + rightReps.current;
        setCount(newCount)
        }
      } else { // side === "right"
        if (angle > 150) {
          rightArmUp.current = false;
        }
        if (angle < 50 && !rightArmUp.current) {
          rightReps.current += 1;
          rightArmUp.current = true;
           // setCount(leftReps.current + rightReps.current);
          newCount = leftReps.current + rightReps.current;
        setCount(newCount)
        }
      }
    } else if (exercise === "squat") {
      //Simplified Squat Detection (improvements needed for robustness)
      if (angle < 90 && !squatDown.current) {
        squatReps.current += 1;
        squatDown.current = true;
        setCount(squatReps.current);
      }
if (angle > 160) {
        squatDown.current = false;
      }  }
       // 🔊 Speak at milestones (10, 20, 30…)
    if (newCount > 0 && newCount % 10 === 0) {
    speak(`${newCount} completed!`);
  }
  }}

  // --- Main Mediapipe callback
  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.poseLandmarks) {
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 2,
      });

      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
        radius: 2.5,
      });

      const landmarks = results.poseLandmarks;

      if (exercise === "squat") {
        //Squat detection logic
        const leftHip = landmarks[23];
        const leftKnee = landmarks[25];
        const leftAnkle = landmarks[27];
        if (leftHip && leftKnee && leftAnkle) {
          const leftLegAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
          drawAngle(canvasCtx, leftKnee, leftLegAngle, "purple");
          countExercise(leftLegAngle, "left", exercise);
        }

        const rightHip = landmarks[24];
        const rightKnee = landmarks[26];
        const rightAnkle = landmarks[28];
        if (rightHip && rightKnee && rightAnkle) {
          const rightLegAngle = calculateAngle(rightHip, rightKnee, rightAnkle);
          drawAngle(canvasCtx, rightKnee, rightLegAngle, "orange");
          countExercise(rightLegAngle, "right", exercise);
        }
      } else if (exercise === "bicep") {
        //Bicep curl detection logic
        const leftShoulder = landmarks[11];
        const leftElbow = landmarks[13];
        const leftWrist = landmarks[15];
        if (leftShoulder && leftElbow && leftWrist) {
          const leftAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
          drawAngle(canvasCtx, leftElbow, leftAngle, "blue");
          countExercise(leftAngle, "left", exercise);
        }

        const rightShoulder = landmarks[12];
        const rightElbow = landmarks[14];
        const rightWrist = landmarks[16];
        if (rightShoulder && rightElbow && rightWrist) {
          const rightAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);
          drawAngle(canvasCtx, rightElbow, rightAngle, "red");
          countExercise(rightAngle, "right", exercise);
        }
      }
    }

    // canvasCtx.fillStyle = "Black";
    // canvasCtx.font = "15px Arial";
    // if (exercise === "squat") {
    //   canvasCtx.fillText(`Squat Reps: ${squatReps.current}`, 10, 30);
    // } else {
    //   canvasCtx.fillText(`Bicep Reps: ${leftReps.current + rightReps.current}`, 10, 30);
    // }

    // canvasCtx.restore();
  }

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    if (typeof videoRef.current !== "undefined" && videoRef.current !== null) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start().then(() => {
  // Set canvas size to match video
  const video = videoRef.current;
  const canvas = canvasRef.current;
  if (video && canvas) {
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
  }
});

    }
  }, []);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setCount(0);
    leftReps.current = 0;
    rightReps.current = 0;
    squatReps.current = 0; // Reset squat reps
    squatDown.current = false; // Reset squat flag
    leftArmUp.current = false;
    rightArmUp.current = false;
    setIsRunning(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🏋️ Pose Coach</h1>
      </header>

      <div className="controls">
        <label>Select Exercise: </label>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
          <option value="bicep">💪 Bicep Curls</option>
          <option value="squat">🦵 Squats</option>
        </select>
            <label style={{ marginLeft: "1rem" }}>⏱️ Challenge Time: </label>
        <input
  type="number"
  value={challengeTime}
  onChange={(e) => setChallengeTime(Number(e.target.value))}
  style={{ width: "60px", marginLeft: "0.5rem" }}
/> seconds
<button id="b"
  onClick={() => {
    setChallengeActive(true);
    setIsRunning(true);
    setTime(0);
    setCount(0);
    speak(`Challenge started for ${challengeTime} seconds!`);
  }}
>
  Start Challenge
</button>
      </div>

      <div className="dashboard">
        <div className="counter">
          <h2>Reps: <span>{count}</span></h2>
        </div>
        <div className="timer">
          <h2>Time: <span>{time}s</span></h2>
        </div>
      </div>

      <div className="video-container">
        <video ref={videoRef} className="input-video" autoPlay></video>
        <canvas ref={canvasRef} className="output-canvas"></canvas>
      </div>
      <div className="buttons">
        <button onClick={handleStartPause}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default PoseCoach;
