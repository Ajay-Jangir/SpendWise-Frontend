// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import './App.css';

// Pages
import Dashboard from "./Dashboard/index";
import Transactions from "./Transactions/index";
import Setting from "./Setting/index";
import Analysis from "./Analysis/index";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout darkMode={darkMode} />}> {/* Optional: pass to layout */}
            <Route index element={<Dashboard darkMode={darkMode} />} />
            <Route path="transactions" element={<Transactions darkMode={darkMode} />} />
            <Route path="analysis" element={<Analysis darkMode={darkMode} />} />
            <Route path="setting" element={<Setting darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
