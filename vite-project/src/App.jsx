import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./homepage/page.jsx";
import AgentPage from "./page/home.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page/home" element={<AgentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



