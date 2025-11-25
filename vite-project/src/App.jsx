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
  const [StepAd, setAdStep] = useState(0);
  const [AdsData, setAdsData] = useState({}); //ใช้สำหรับเก็บข้อมูลที่กรอกในฟอร์ม
  const [price, setPrice] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(7);
  const [imgprop, setImgprop] = useState({})
  return (
    <BrowserRouter>
      {/* แสดง StepHeader เฉพาะใน Step 1 - 4 */}
      {activeStep >= 1 && activeStep <= 4 && (
        <StepHeader activeStep={activeStep} />
      )}

      {/* แสดง AdsStep เฉพาะใน Step 1 - 5 */}
      {StepAd >= 1 && StepAd <= 5 && <AdsStep StepAd={StepAd} />}
      <Routes>
        <Route
          path="/ads-one"
          element={
            <AdsOne
              setAdStep={setAdStep}
              setPrice={setPrice}
              setSelectedSlot={setSelectedSlot}
              setSelectedDuration={setSelectedDuration}
              setActiveStep={setActiveStep}
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
              setActiveStep={setActiveStep}
            />
          }
        />
        <Route
          path="/ads-three"
          element={
            <AdsThree
              setAdStep={setAdStep}
              AdsData={AdsData}
              setActiveStep={setActiveStep}
            />
          }
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
              setActiveStep={setActiveStep}
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
              setActiveStep={setActiveStep}
            />
          }
        />

        <Route
          element={
            <StepOne setActiveStep={setActiveStep} setAdStep={setAdStep} />
          }
          path="/step-one"
        />
        <Route
          path="/step-two"
          element={
            <StepTwo setActiveStep={setActiveStep} setAdStep={setAdStep} />
          }
        />
        <Route
          path="/step-three"
          element={
            <StepThree setActiveStep={setActiveStep} setAdStep={setAdStep} />
          }
        />
        <Route
          path="/step-four"
          element={
            <StepFour setActiveStep={setActiveStep} setAdStep={setAdStep} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
