import { Outlet } from "react-router-dom";
//component เด้อครับ
import SidebarAdmin from "../component/SidebarAdmin";
import NavbarAdmin from "../component/NavbarAdmin";


const AppRouter = () => {
  return (
    <>
      <div className="border d-flex">
        <div
          className="border p-3 align-items-center"
          style={{
            width: "50%",
            maxWidth: "400px",
            height: "100vh",
            backgroundColor: "#f7f7f7ff",
          }}
        >
          <SidebarAdmin />
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <NavbarAdmin/>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AppRouter;
