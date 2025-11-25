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
  const [AdsData, setAdsData] = useState({}); //ใช้สำหรับเก็บข้อมูลที่กรอกในฟอร์ม
  const [price, setPrice] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(7);
  return (
    <BrowserRouter>
      <StepHeader activeStep={activeStep} />
      {/* <AdsStep StepAd={StepAd} /> */}

      <Routes>
        <Route
          path="/ads-one"
          element={
            <AdsOne
              setAdStep={setAdStep}
              setPrice={setPrice}
              setSelectedSlot={setSelectedSlot}
              setSelectedDuration={setSelectedDuration}
            />
          }
        />
        <Route
          path="/ads-two"
          element={
            <AdsTwo
              setAdStep={setAdStep}
              AdsData={AdsData}
              setAdsData={setAdsData}
              startDate={startDate}
              setStartDate={setStartDate}
            />
          }
        />
        <Route
          path="/ads-three"
          element={<AdsThree setAdStep={setAdStep} AdsData={AdsData} />}
        />
        <Route
          path="/ads-four"
          element={
            <AdsFour
              setAdStep={setAdStep}
              price={price}
              selectedSlot={selectedSlot}
              startDate={startDate}
              selectedDuration={selectedDuration}
            />
          }
        />

        <Route
          path="/ads-five"
          element={
            <AdsFive
              setAdStep={setAdStep}
              price={price}
              selectedSlot={selectedSlot}
              startDate={startDate}
              selectedDuration={selectedDuration}
            />
          }
        />

        <Route 
           element={<StepOne setActiveStep={setActiveStep} />}
           path="/step-one"
         />
         <Route
           path="/step-two"
           element={<StepTwo setActiveStep={setActiveStep} />}
         />
         <Route
           path="/step-three"
           element={<StepThree setActiveStep={setActiveStep} />}
         />
         <Route
           path="/step-four"
           element={<StepFour setActiveStep={setActiveStep} />}
         />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
