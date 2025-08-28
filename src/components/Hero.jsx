// src/components/Hero.jsx
import React from "react";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>🏋️ Your Fitness Coach</h1>
        <p>Track reps, learn exercises, and train smarter with PoseCoach & MuscleWiki</p>
        <a href="#posecoach" className="cta-btn">Start Training</a>
      </div>
    </section>
  );
}

export default Hero;
