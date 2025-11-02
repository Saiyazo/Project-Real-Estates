import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import "./App.css";
import AppRouter from "./Layout/AppRouter.jsx";
import DashboardAdmin from "./pageAdmin/DashBoard";
import ChatHistory from './pageAdmin/ChatHistory'
import ComplainUser from './pageAdmin/ComplaintsUser';


function App() {
  return (
    <>
      <BrowserRouter basename="/multipages">
        <Routes>
          <Route element={<AppRouter />}>
            <Route path='/DashboardAdmin' element={<DashboardAdmin/>}/>
            <Route path='/ChatHistory' element={<ChatHistory/>}/>
            <Route path='/ComplainUser' element={<ComplainUser/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
