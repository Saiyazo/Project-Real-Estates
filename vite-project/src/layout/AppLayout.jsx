import { Outlet } from "react-router-dom"
import AppHeader from "../component/AppHeader"
import AppNav from "../component/AppNavbar"
import Footer from "../component/AppFooter"
import './AppLayout.css'

const AppLayout = () => {
    return ( 
    <div className="app-wrapper">
        <AppHeader/>
        <AppNav/>
        
        <div className="main-content">
            <Outlet/>
        </div>
        
        <Footer/>
    </div> 
    )
}
 
export default AppLayout;