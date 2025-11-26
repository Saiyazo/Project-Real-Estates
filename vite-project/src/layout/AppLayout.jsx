import { Outlet } from "react-router-dom"
import AppHeader from "../component/AppHeader"
import Footer from "../component/AppFooter"
import './AppLayout.css'

const AppLayout = () => {
    return ( 
    <div className="app-wrapper">
        <AppHeader/>
        
        <div className="main-content">
            <Outlet/>
        </div>
        
        <Footer/>
    </div> 
    )
}
 
export default AppLayout;