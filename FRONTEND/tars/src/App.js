// src/App.js
// src/App.js
import React, { useState } from "react";
import Navigation from "./Navigation";
import HolographicDots from "./Design/HolographicDots";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import ChatDock from "./ChatDock";
import "./App.css";

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HolographicDots />

              {/* Emblem only when chat is closed */}
              {!showChat && (
                <button
                  className="tars-emblem"
                  onClick={() => setShowChat(true)}
                  aria-label="Open chat"
                >
                  T
                </button>
              )}

              {/* Dock (has its own close button in the titlebar) */}
              <ChatDock open={showChat} onClose={() => setShowChat(false)} />
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
