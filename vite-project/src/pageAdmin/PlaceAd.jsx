import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CalenderAM from "../component/CalenderAM.jsx";

import "./pageStyle/dash.css";

const PlaceAd = () => {
  const { adRequests } = useOutletContext();

  const totalAD = adRequests.length;
  const pending = adRequests.filter((ad) => ad.status === "รออนุมัติ").length;
  const approved = adRequests.filter((ad) => ad.status === "อนุมัติ").length;
  const rejected = adRequests.filter((ad) => ad.status === "ยกเลิก").length;

  return (
    <div className="p-4 pageAll">
      <h1 className="mb-5">ติดต่อลงโฆษณา</h1>

      <div className="d-flex gap-2">
        {/*คำขอติดต่อ */}
        <div
          className=" border p-2 rounded-2 shadow-sm"
          style={{ height: "80vh" }}
        >
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3 mt-2"
            fill
          >
            <Tab
              className="bg-white"
              eventKey="ทั้งหมด"
              title={<span className="position-relative">ทั้งหมด</span>}
            >
              <h6 className="bg-light text-black p-2">
                <b>คำขอโฆษณาทั้งหมด({totalAD})</b>
              </h6>
            </Tab>
            <Tab
              className="bg-white"
              eventKey="รออนุมัติ"
              title={<span className="position-relative">รออนุมัติ </span>}
            >
              <h6 className="bg-light text-black p-2">
                <b>คำขอที่รออนุมัติ({pending})</b>
              </h6>
              <div className="border d-flex bg-white">
                {/*map ข้อมูลคำขอโฆษณาที่รออนุมัติ*/}
                <div></div>
              </div>
            </Tab>
            <Tab
              className="bg-white"
              eventKey="อนุมัติแล้ว"
              title={<span className="position-relative">อนุมัติแล้ว</span>}
            >
              <h6 className="bg-light text-black p-2">
                <b>คำขอที่อนุมัติแล้ว({approved})</b>
              </h6>
            </Tab>
            <Tab
              className="bg-white"
              eventKey="ยกเลิก"
              title={<span className="position-relative">ยกเลิก</span>}
            >
              {/* หัวข้อ */}
              <div className="bg-light">
                <h6
                  className="bg-light text-black p-2 mb-3 "
                  style={{ height: "2" }}
                >
                  <b>คำขอที่ถูกยกเลิก ({rejected})</b>
                </h6>
              </div>

              {/* Box */}
              <div className="d-flex justify-content-between bg-white border rounded-2 ">
                <div className="m-2">
                  <h5 className="text-black">ชื่อ</h5>
                  <p className="text-dark">รายละเอียด</p>
                  <span className="text-dark">วันที่ส่งคำขอ:</span>
                </div>

                <div className="text-end m-2">สถานะ</div>
              </div>
            </Tab>
          </Tabs>
        </div>
        {/*ปฏิทินกับคำขอติดต่อ */}
        <div className=" border p-3 rounded-2 shadow-sm">
          <p>ปฏิทินยังไม่ทำอ่ะ ทำไม่เป็น ไปหาความรู้ก่อน</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceAd;
