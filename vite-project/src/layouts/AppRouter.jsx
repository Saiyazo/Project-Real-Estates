import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";


const AppRouter = ({ buyers, sellers, properties,complaints, adRequests,setAdRequests,setToken}) => {
  return (
    <div className="border d-flex">
      <div
        className="border p-3 align-items-center"
        style={{
          width: "40%",
          maxWidth: "350px",
          height: "100vh",
          backgroundColor: "#f6faffff",
        }}
      >
        <SidebarAdmin buyers={buyers} sellers={sellers} properties={properties} adRequests={adRequests} setToken={setToken}/>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* ส่งผ่าน context ให้ Outlet */}
        <Outlet context={{ buyers, sellers, properties ,complaints,adRequests,setAdRequests,setToken}} />
      </div>
    </div>
  );
};

export default AppRouter;
