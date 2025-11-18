import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import StepHeader from "./layouts/StepHeader";
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import StepFour from "./pages/StepFour";
import AdsStep from "./layouts/Adstep";
import AdsOne from "./pages/AdsOne";
import AdsTwo from "./pages/AdsTwo";
import AdsThree from "./pages/AdsThree";
import AdsFour from "./pages/AdsFour";
import AdsFive from "./pages/AdsFive";

function App() {
  const [activeStep, setActiveStep] = useState(1);
  const [StepAd, setAdStep] = useState(1);

  return (
    <BrowserRouter>
      {/*    <StepHeader activeStep={activeStep} /> */}
      <AdsStep StepAd={StepAd} />

      <Routes>
        <Route path="/ads-one" element={<AdsOne setAdStep={setAdStep} />} />
        <Route path="/ads-two" element={<AdsTwo setAdStep={setAdStep} />} />
        <Route path="/ads-three" element={<AdsThree setAdStep={setAdStep} />} />
        {/* //     <Route 
           element={<StepOne setActiveStep={setActiveStep} />}
           path="/step-one"
         />
         <Route
           path="/step-two"
           element={<StepTwo setActiveStep={setActiveStep} />}
         />
         // App.jsx
         <Route
           path="/step-three"
           element={<StepThree setActiveStep={setActiveStep} />}
         />
         <Route
           path="/step-four"
           element={<StepFour setActiveStep={setActiveStep} />}
         />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
