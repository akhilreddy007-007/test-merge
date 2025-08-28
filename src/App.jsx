// src/App.jsx
// import React from "react";
// import PoseCoach from "./components/PoseCoach";
// import MuscleWiki from "./components/MuscleWiki";

// function App() {
//   return (
   
//     <div className="App">
//        <div className="scroll-wacher"></div>
//       {/* Section 1: Pose Coach */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <PoseCoach />
//       </section>

//       {/* Section 2: Muscle Wiki */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <MuscleWiki />
//       </section>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
// import React, { useEffect } from "react";
// import PoseCoach from "./components/PoseCoach";
// import MuscleWiki from "./components/MuscleWiki";

// function App() {
//   useEffect(() => {
//     // ✅ JS fallback for scroll progress bar (works in all browsers)
//     const scrollWatcher = document.querySelector(".scroll-wacher");

//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight = document.body.scrollHeight - window.innerHeight;
//       const scrollPercent = scrollTop / docHeight;
//       scrollWatcher.style.transform = `scaleX(${scrollPercent})`;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="App">
//       {/* 🔹 Scroll progress bar */}
//       <div className="scroll-wacher"></div>

//       {/* Section 1: Pose Coach */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <PoseCoach />
//       </section>

//       {/* Section 2: Muscle Wiki */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <MuscleWiki />
//       </section>
//     </div>
//   );
// }

// export default App;






// import React, { useEffect, useState } from "react";
// import Hero from "./components/Hero";
// import PoseCoach from "./components/PoseCoach";
// import MuscleWiki from "./components/MuscleWiki";
// import StaggerWrapper from "./components/StaggerWrapper";   // ✅ import
// import Footer from "./components/Footer";

// function App() {
//   const [showTopBtn, setShowTopBtn] = useState(false);

//   useEffect(() => {
//     const scrollWatcher = document.querySelector(".scroll-wacher");

//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight = document.body.scrollHeight - window.innerHeight;
//       const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
//       if (scrollWatcher) scrollWatcher.style.transform = `scaleX(${scrollPercent})`;

//       setShowTopBtn(scrollTop > 200);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <div className="App">
//       {/* Progress bar */}
//       <div className="scroll-wacher"></div>

//       {/* Sticky Navbar */}
//       <nav className="navbar">
//         <a href="#hero">Home</a>
//         <a href="#posecoach">Pose Coach</a>
//         <a href="#musclewiki">Muscle Wiki</a>
//       </nav>

//       {/* Sections */}
//      <StaggerWrapper>
//   <div style={{ height: "100vh" }}>
//     <Hero />
//   </div>
// </StaggerWrapper>

//       <section id="posecoach" className="block" style={{ minHeight: "100vh", padding: "20px" }}>
//         <StaggerWrapper>
//           <PoseCoach />
//         </StaggerWrapper>
//       </section>

//       <section id="musclewiki" className="block" style={{ minHeight: "100vh", padding: "20px" }}>
//         <StaggerWrapper>
//           <MuscleWiki />
//         </StaggerWrapper>
//       </section>

//       {/* Back to Top button */}
//       {showTopBtn && (
//         <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
//           ⬆
//         </button>
        
//       )}
//         {/* ✅ Footer at the very bottom */}
//       <Footer />
//     </div>
//   );
// }

// export default App;





import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import PoseCoach from "./components/PoseCoach";
import MuscleWiki from "./components/MuscleWiki";
import StaggerWrapper from "./components/StaggerWrapper";
import Footer from "./components/Footer";

function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [theme, setTheme] = useState("dark"); // 🌙 default dark mode

  useEffect(() => {
    document.body.setAttribute("data-theme", theme); // apply theme to <body>
  }, [theme]);

  useEffect(() => {
    const scrollWatcher = document.querySelector(".scroll-wacher");

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      if (scrollWatcher) scrollWatcher.style.transform = `scaleX(${scrollPercent})`;

      setShowTopBtn(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="App">
      {/* Progress bar */}
      <div className="scroll-wacher"></div>

      {/* Sticky Navbar */}
      <nav className="navbar">
  <div className="nav-links">
    <a href="#hero">Home</a>
    <a href="#posecoach">Pose Coach</a>
    <a href="#musclewiki">Muscle Wiki</a>
  </div>

  {/* 🌙☀️ Theme toggle stays at right */}
  <button
    className="theme-toggle"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  >
    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
  </button>
</nav>


      {/* Sections */}
      <StaggerWrapper>
        <div id="hero" style={{ height: "100vh" }}>
          <Hero />
        </div>
      </StaggerWrapper>

      <section id="posecoach" className="block" style={{ minHeight: "100vh", padding: "20px" }}>
        <StaggerWrapper>
          <PoseCoach />
        </StaggerWrapper>
      </section>

      <section id="musclewiki" className="block" style={{ minHeight: "100vh", padding: "20px" }}>
        <StaggerWrapper>
          <MuscleWiki />
        </StaggerWrapper>
      </section>

      {/* Back to Top button */}
      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ⬆
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
