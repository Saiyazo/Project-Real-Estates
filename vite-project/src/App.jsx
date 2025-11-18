import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

//data
import { fetchBuyers } from "./Data/buyer.jsx";
import { fetchPropertys } from "./Data/propertyS.jsx";
import { fetchSellers } from "./Data/Sellers.jsx";
import { fetchComplaints } from "./Data/DataComplaints.jsx";
import { fetchAdRequests} from "./Data/adRequests.jsx"

import "./App.css";
//page
import AppRouter from "./Layout/AppRouter.jsx";
import DashboardAdmin from "./pageAdmin/DashBoard";
import ManageAssets from "./pageAdmin/ManageAssets.jsx";
import ManageUser from "./pageAdmin/ManageUser.jsx";
import ComplainUser from "./pageAdmin/ComplaintsUser";
import ProfileAdmin from "./pageAdmin/ProfileAdmin.jsx";
import PlaceAd from "./pageAdmin/PlaceAd.jsx";
import SettingAdmin from './pageAdmin/SettingAdmin.jsx'
import DetailCom from "./pageAdmin/DetailComplainJa.jsx";
import DetailProperty from "./pageAdmin/DetailProperty.jsx";

function App() {
  
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [adRequests, setAdRequests] = useState([]);

  useEffect(() => setComplaints(fetchComplaints()), [])
  useEffect(() => setBuyers(fetchBuyers()), []);
  useEffect(() => setSellers(fetchSellers()), []);
  useEffect(() => setProperties(fetchPropertys()), []);
  useEffect(() => setAdRequests(fetchAdRequests()), [])
  return (
    <>
      <BrowserRouter basename="/multipages/">
        <Routes>
          <Route
            element={
              <AppRouter
                buyers={buyers}
                sellers={sellers}
                properties={properties}
                complaints={complaints}
                adRequests={adRequests}
              />
            }
          >
            <Route index element={<DashboardAdmin />} />
            <Route path="/ProfileAdmin" element={<ProfileAdmin />} />
            <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
            <Route path="/ManageAssets" element={<ManageAssets />} />
            <Route path="/ComplainUser" element={<ComplainUser />} />
            <Route path="/ManageUser" element={<ManageUser />} />
            <Route path="/PlaceAd" element={<PlaceAd />} />
            {/*<Route path="/SettingAdmin" element={<SettingAdmin />} />*/}
            <Route path="/DetailCom" element={<DetailCom />} />
            <Route path="/DetailProperty" element={<DetailProperty />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
