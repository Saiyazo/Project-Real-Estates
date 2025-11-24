import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
//import CalenderAM from "../component/CalenderAM.jsx";

import "./pageStyle/dash.css";

const PlaceAd = () => {
  const { adRequests, setAdRequests } = useOutletContext();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const changedAd = JSON.parse(sessionStorage.getItem("changedAd"));
    if (changedAd) {
      setAdRequests((prev) =>
        prev.map((ad) =>
          ad.id === changedAd.id ? { ...ad, status: changedAd.status } : ad
        )
      );
      sessionStorage.removeItem("changedAd");
    }
  }, []);

  const filteredAds = adRequests.filter(
    (ad) =>
      ad.contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
      ad.campaignDetails.toLowerCase().includes(searchText.toLowerCase())
  );

  const countByStatus = (status) =>
    adRequests.filter((ad) => ad.status === status).length;

  const statuses = [
    "รอการตรวจสอบ",
    "รอผู้ใช้แก้ไขข้อมูล",
    "รอชำระเงิน",
    "กำลังเผยแพร่",
    "ประกาศหมดอายุ",
    "ยกเลิก",
  ];

  const statusColors = {
    รอการตรวจสอบ: { color: "#b88a00", bg: "#fff4b3" },
    รอผู้ใช้แก้ไขข้อมูล: { color: "#005c99", bg: "#cfefff" },
    รอชำระเงิน: { color: "#c15a00", bg: "#ffe2c4" },
    กำลังเผยแพร่: { color: "#17763a", bg: "#b8ffba" },
    ประกาศหมดอายุ: { color: "#555555", bg: "#e8e8e8" },
    ยกเลิก: { color: "#7a1a05", bg: "#ffcab8" },
  };

  return (
    <div className="m-2 p-2">
      <h1 className="mb-5">ติดต่อลงโฆษณา</h1>
      {/*<div className="border p-3 rounded-2 shadow-sm" style={{ height: "87vh" }}>
          <h4>ปฏิทินคำขอลงโฆษณา</h4>
          <div style={{ flexGrow: 1, overflowY: "auto" }}>
            <CalenderAM adRequests={adRequests} />
          </div>
        </div> */}
      {/* คำขอ */}
      <div
        className="border p-2 rounded-2 shadow-sm"
        style={{ height: "87vh", width: "100%" }}
      >
        <form className="d-flex mb-2" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="button">
            Search
          </button>
        </form>

        <Tabs id="ad-status-tabs" className="mb-3" fill>
          {/* Tab ดูทั้งหมด */}
          <Tab eventKey="ทั้งหมด" title={`ดูทั้งหมด (${filteredAds.length})`}>
            <div className="miniOverflow bg-white">
              {filteredAds.map((ad, index) => (
                <div
                  key={ad.id || index}
                  className="border rounded-1 bg-white m-2 p-2"
                >
                  <div className="d-flex justify-content-between">
                    <div className="text-dark">
                      <div className="fs-5">{ad.campaignDetails}</div>
                      <div className="fs-6">{ad.contact.name}</div>
                    </div>
                    <div className="text-end">
                      <span
                        style={{
                          color: statusColors[ad.status]?.color || "black",
                          backgroundColor:
                            statusColors[ad.status]?.bg || "white",
                          padding: "5px 15px",
                          borderRadius: "15px",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          display: "inline-block",
                        }}
                      >
                        {ad.status}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <p className="text-gray">{ad.submittedAt}</p>
                    <Link to="/DetailAD" state={{ ad }}>
                      <button className="btn btn-sm btn-outline-primary">
                        ดูรายละเอียด
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Tab>

          {/* Tab ตามสถานะ */}
          {statuses.map((status) => {
            const adsByStatus = filteredAds.filter(
              (ad) => ad.status === status
            );
            return (
              <Tab
                key={status}
                eventKey={status}
                title={`${status} (${countByStatus(status)})`}
              >
                <div className="miniOverflow bg-white">
                  {adsByStatus.map((ad, index) => (
                    <div
                      key={ad.id || index}
                      className="border rounded-1 bg-white m-2 p-2"
                    >
                      <div className="d-flex justify-content-between">
                        <div className="text-dark">
                          <div className="fs-5">{ad.campaignDetails}</div>
                          <div className="fs-6">{ad.contact.name}</div>
                        </div>
                        <div className="text-end">
                          <span
                            style={{
                              color: statusColors[ad.status]?.color || "black",
                              backgroundColor:
                                statusColors[ad.status]?.bg || "white",
                              padding: "5px 15px",
                              borderRadius: "15px",
                              fontWeight: "600",
                              fontSize: "0.9rem",
                              display: "inline-block",
                            }}
                          >
                            {ad.status}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <p className="text-gray">{ad.submittedAt}</p>
                        <Link to="/DetailAD" state={{ ad }}>
                          <button className="btn btn-sm btn-outline-primary">
                            ดูรายละเอียด
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default PlaceAd;
