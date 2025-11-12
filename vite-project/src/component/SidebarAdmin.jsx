import { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Raccoon from "../IMG/Raccoon.jpg";

import "./cssforBTN/Tab.css";

const SidebarAdmin = () => {
  // เมนู
  const menuItems = [
    {
      path: "/DashboardAdmin",
      label: "หน้าแดชบอร์ดแอดมิน",
      icon: "bi-columns-gap",
    },
    {
      path: "/ManageAssets",
      label: "รายการอสังหาริทรัพย์",
      icon: "bi-buildings",
    },
    { path: "/ManageUser", label: "รายการบัญชีผู้ใช้", icon: "bi-people" },
    {
      path: "/ComplainUser",
      label: "ประวัติการร้องเรียน",
      icon: "bi-envelope-paper",
    },

    { path: "/PlaceAd", label: "ติดต่อลงโฆษณา", icon: "bi-megaphone" },
    { path: "/Settings", label: "ตั้งค่า", icon: "bi-gear" },

    {
      path: "/Logout",
      label: "ออกจากระบบ",
      icon: "bi-box-arrow-left",
      variant: "danger",
    },
  ];

  return (
    <div className=" d-flex flex-column justify-content-center gap-2">
      {/* Profile */}
      <NavLink
        to="/ProfileAdmin"
        className="bg-white d-flex justify-content-center"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <Button
          variant="white"
          className="d-flex align-items-center justify-content-start p-3 w-100 w-sm-75 w-md-50 w-lg-25"
          style={{
            maxWidth: "400px",
            borderColor: "#d6d8db",
            borderRadius: "12px",
          }}
        >
          <div
            className="border me-3 flex-shrink-0"
            style={{
              backgroundImage: `url(${Raccoon})`,
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="text-muted text-start">
            <span className="fw-semibold fs-5">Admin H.</span>
            <br />
            <span>view profile</span>
          </div>
        </Button>
      </NavLink>

      {/* Menu Buttons */}
      <div className="d-flex flex-column gap-2 mt-5">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              ` border d-flex justify-content-start align-items-center w-100 w-sm-75 w-md-50 w-lg-25 ${
                item.variant === "danger"
                  ? "btn btn-outline-danger"
                  : "btn btn:hover"
              } border align-items-center ${
                isActive && item.variant !== "danger" ? "bg-btn" : ""
              }`
            }
          >
            <i className={`bi ${item.icon} me-2 ms-3 fs-5`}></i>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarAdmin;
