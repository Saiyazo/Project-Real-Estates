import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import Noti from './pages/Noti/Noti'
import Chat from './component/Chat/Chat'
import Home from './pages/BuyerHome' 
import Fav from './pages/Fav/Fav'
import ForwardToHome from './pages/ForwardToHome'
import BuyerProfile from './pages/buyer-profile/buyer-profile'
import EditProfile from './pages/buyer-profile/edit-profile'
import ChangePass from './pages/buyer-profile/change-password'

import AgentHome from './pages/AgentHome' 
import PropertyDetail from './pages/PropertyDetail' 

import './App.css'


function App() {
  return (
    <>
      <div className="app-container">
        <BrowserRouter >
          <Routes>

            <Route element={<AppLayout />}>
              
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/" element={<Home />} />
            
              <Route path="/Noti" element={<Noti />} />
              <Route path="/Chat" element={<Chat />} />
              <Route path="/Fav" element={<Fav />} />
              <Route path="/buyer-profile" element={<BuyerProfile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/change-password" element={<ChangePass />} />
              <Route path="/AgentHome" element={<AgentHome />} />
              
              <Route path="*" element={<ForwardToHome />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App