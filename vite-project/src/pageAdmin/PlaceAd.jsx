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
          className=" border p-2 rounded-2 shadow-sm "
          style={{ height: "80vh", width: "40%" }}
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
          <Tabs id="fill-tab-example" className="mb-3 mt-2" fill>
            <Tab
              className="bg-white"
              eventKey="ทั้งหมด"
              title={<span className="position-relative">ทั้งหมด</span>}
            >
              <h6 className="bg-light text-black p-2">
                <b>คำขอโฆษณาทั้งหมด({totalAD})</b>
              </h6>
              {/*map ข้อมูลคำขอโฆษณาที่รออนุมัติ*/}
              
             {/*ทำให้มันเรียงวันจากวันล่าสุด-วันเก่าแก่สุด*/}
              <div className="miniOverflow">
                {adRequests
                  .filter((ad) => ad.status)
                  .map((ad, index) => (
                    <div
                      key={ad.id || index}
                      className="border rounded-1 bg-white m-2"
                    >
                      <div className="d-flex justify-content-between">
                        <div className="text-dark p-2" style={{ width: "50%" }}>
                          <div className="m-2">
                            <span className=" fs-5">{ad.campaignDetails}</span>
                          </div>
                          <span className="m-2 fs-6">{ad.contact.name}</span>
                        </div>

                        <div className="p-2 text-end">
                          <span
                            className="pending-textAd"
                            style={{
                              color:
                                ad.status === "ยกเลิก"
                                  ? "#81401d"
                                  : ad.status === "อนุมัติ"
                                  ? "#17763a"
                                  : ad.status === "รออนุมัติ"
                                  ? "#dd871d"
                                  : "black",
                              backgroundColor:
                                ad.status === "ยกเลิก"
                                  ? "#ffcab8"
                                  : ad.status === "อนุมัติ"
                                  ? "#b8ffba"
                                  : ad.status === "รออนุมัติ"
                                  ? "#ffffb8"
                                  : "white",
                              margin: "2px",
                              borderRadius: "15px",
                              padding: "5px 15px",
                              fontWeight: "600",
                              fontSize: "0.9rem",
                              display: "inline-block",
                            }}
                          >
                            {ad.status}
                          </span>
                        </div>
                      </div>

                      <p className="m-2 p-2 text-gray">{ad.submittedAt}</p>
                    </div>
                  ))}
              </div>
            </Tab>
            <Tab
              className="bg-white"
              eventKey="รออนุมัติ"
              title={<span className="position-relative">รออนุมัติ </span>}
            >
              <h6 className="bg-light text-black p-2">
                <b>คำขอที่รออนุมัติ({pending})</b>
              </h6>

              {/*map ข้อมูลคำขอโฆษณาที่รออนุมัติ*/}
              <div className="miniOverflow">
                {adRequests
                  .filter((ad) => ad.status === "รออนุมัติ")
                  .map((ad, index) => (
                    <div
                      key={ad.id || index}
                      className="border rounded-1 bg-white m-2"
                    >
                      <div className="d-flex justify-content-between gap-2">
                        <div className="text-dark p-2" style={{ width: "50%" }}>
                          <div className="m-2">
                            <span className=" fs-5">{ad.campaignDetails}</span>
                          </div>
                          <span className="m-2 fs-6">{ad.contact.name}</span>
                        </div>

                        <div className="p-2 text-end">
                          <span className="pending-textAd">รออนุมัติ</span>
                        </div>
                      </div>

                      <p className="m-2 p-2 text-gray">{ad.submittedAt}</p>
                    </div>
                  ))}
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
              {/*map ข้อมูลคำขอโฆษณาที่รออนุมัติ*/}
              <div className="miniOverflow">
                {adRequests
                  .filter((ad) => ad.status === "อนุมัติ")
                  .map((ad, index) => (
                    <div
                      key={ad.id || index}
                      className="border rounded-1 bg-white m-2"
                    >
                      <div className="d-flex justify-content-between gap-2">
                        <div className="text-dark p-2" style={{ width: "50%" }}>
                          <div className="m-2">
                            <span className=" fs-5">{ad.campaignDetails}</span>
                          </div>
                          <span className="m-2 fs-6">{ad.contact.name}</span>
                        </div>

                        <div className="p-2 text-end">
                          <span className="OK-textAd">อนุมัติ</span>
                        </div>
                      </div>

                      <p className="m-2 p-2 text-gray">{ad.submittedAt}</p>
                    </div>
                  ))}
              </div>
            </Tab>
            <Tab
              className="bg-white"
              eventKey="ยกเลิก"
              title={<span className="position-relative">ยกเลิก</span>}
            >
              {/*map ข้อมูลคำขอโฆษณาที่รออนุมัติ*/}
              <div className="miniOverflow">
                {adRequests
                  .filter((ad) => ad.status === "ยกเลิก")
                  .map((ad, index) => (
                    <div
                      key={ad.id || index}
                      className="border rounded-1 bg-white m-2"
                    >
                      <div className="d-flex justify-content-between">
                        <div
                          className=" text-dark p-2"
                          style={{ width: "50%" }}
                        >
                          <div className="m-2">
                            <span className=" fs-5">{ad.campaignDetails}</span>
                          </div>
                          <span className="m-2 fs-6">{ad.contact.name}</span>
                        </div>

                        <div className="p-2 text-end">
                          <span className="cancle-textAd">ยกเลิก</span>
                        </div>
                      </div>

                      <p className="m-2 p-2 text-gray">{ad.submittedAt}</p>
                    </div>
                  ))}
              </div>
            </Tab>
          </Tabs>
        </div>
        {/*ปฏิทินกับคำขอติดต่อ */}
        <div className=" border p-3 rounded-2 shadow-sm">
          <h1>ปฏิทิน</h1>
          <p>ทำไม่เป็นขอเวลาไปหาความรู้</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceAd;
