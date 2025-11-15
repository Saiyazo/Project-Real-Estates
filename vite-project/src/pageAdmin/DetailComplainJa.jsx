import { NavLink } from "react-router-dom";
const DetailCom = () => {
    return ( 
        <div>
           <NavLink to={'/DashboardAdmin'}><button className="fs-4 mt-2"><i class="bi bi-arrow-left-circle "></i>&nbsp;กลับ</button></NavLink> 
        </div>
     );
}
 
export default DetailCom;