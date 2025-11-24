import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./cssforBTN/CalenderAM.css";

const statusColors = {
  กำลังเผยแพร่: { color: "#17763a", bg: "#b8ffba" },
  รอการตรวจสอบ: { color: "#b88a00", bg: "#fff4b3" },
  รอผู้ใช้แก้ไขข้อมูล: { color: "#005c99", bg: "#cfefff" },
  รอชำระเงิน: { color: "#c15a00", bg: "#ffe2c4" },
  ประกาศหมดอายุ: { color: "#555555", bg: "#e8e8e8" },
  ยกเลิก: { color: "#7a1a05", bg: "#ffcab8" },
  อนุมัติ: { color: "#17763a", bg: "#b8ffba" },
};

const CalenderAM = ({ adRequests }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredAds = adRequests.filter((ad) => {
    if (ad.status !== "กำลังเผยแพร่") return false; // แสดงเฉพาะกำลังเผยแพร่
    const adStart = ad.startDate
      ? new Date(ad.startDate)
      : new Date(ad.submittedAt);
    const adEnd = ad.endDate ? new Date(ad.endDate) : adStart;
    return selectedDate >= adStart && selectedDate <= adEnd;
  });

  const dateColorsMap = {};
  adRequests.forEach((ad) => {
    if (ad.status !== "กำลังเผยแพร่") return; // แสดงจุดเฉพาะกำลังเผยแพร่
    const adStart = new Date(ad.startDate || ad.submittedAt);
    const adEnd = new Date(ad.endDate || adStart);

    let color = "#17763a"; // default 7 วัน
    if (ad.package.includes("14 วัน")) color = "#ff9800";
    if (ad.package.includes("30 วัน")) color = "#f44336";

    for (let d = new Date(adStart); d <= adEnd; d.setDate(d.getDate() + 1)) {
      const key = d.toDateString();
      if (!dateColorsMap[key]) dateColorsMap[key] = [];
      if (!dateColorsMap[key].includes(color)) dateColorsMap[key].push(color);
    }
  });

  const getStatusClass = (status) => {
    if (status === "อนุมัติ") return "OK-textAd";
    if (status === "รอการตรวจสอบ") return "pending-textAd";
    if (status === "ยกเลิก") return "cancle-textAd";
    if (status === "กำลังเผยแพร่") return "OK-textAd";
    return "";
  };

  const getPackageColor = (pkg) => {
    if (pkg.includes("7 วัน")) return "#17763a";
    if (pkg.includes("14 วัน")) return "#ff9800";
    if (pkg.includes("30 วัน")) return "#f44336";
    return "#000";
  };

  return (
    <div className="calendar-wrapper">
      {/* Legend */}
      <div
        className="calendar-legend mb-2"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#17763a",
              display: "inline-block",
              borderRadius: "50%",
            }}
          ></span>
          <span>7 วัน</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#ff9800",
              display: "inline-block",
              borderRadius: "50%",
            }}
          ></span>
          <span>14 วัน</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#f44336",
              display: "inline-block",
              borderRadius: "50%",
            }}
          ></span>
          <span>30 วัน</span>
        </div>
      </div>

      {/* ปฏิทิน */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        inline
        calendarClassName="custom-calendar"
        renderDayContents={(day, date) => {
          const key = date.toDateString();
          const colors = dateColorsMap[key] || [];
          return (
            <div style={{ position: "relative", minHeight: "24px" }}>
              {day}
              <div
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "2px",
                }}
              >
                {colors.map((color, idx) => (
                  <span
                    key={idx}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: color,
                      display: "block",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        }}
      />

      {/* คำขอข้างล่าง */}
      <div className="mt-3" style={{ height: "35vh", width: "370px" }}>
        <h5>คำขอที่กำลังเผยแพร่วันที่ {selectedDate.toLocaleDateString()}</h5>
        <div className="pageKub">
          {filteredAds.length > 0 ? (
            filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="border rounded-2 p-3 mb-2 bg-white"
                style={{
                  borderLeft: `5px solid ${getPackageColor(ad.package)}`,
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ gap: "15px" }}
                >
                  <div style={{ flex: 1 }}>
                    {" "}
                    {/* ให้ข้อความเต็มพื้นที่ */}
                    <strong>{ad.campaignDetails}</strong>
                    <p>จาก: {ad.contact.name}</p>
                  </div>
                  <span
                    className={getStatusClass(ad.status)}
                    style={{
                      color: statusColors[ad.status]?.color,
                      backgroundColor: statusColors[ad.status]?.bg,
                      margin: "2px",
                      borderRadius: "15px",
                      padding: "5px 15px",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      display: "inline-block",
                      whiteSpace: "nowrap", 
                    }}
                  >
                    {ad.status}
                  </span>
                </div>

                <p>
                  เริ่ม:{" "}
                  {ad.startDate
                    ? new Date(ad.startDate).toLocaleDateString()
                    : "ไม่ระบุ"}{" "}
                  | สิ้นสุด:{" "}
                  {ad.endDate
                    ? new Date(ad.endDate).toLocaleDateString()
                    : "ไม่ระบุ"}
                </p>
              </div>
            ))
          ) : (
            <p>ไม่มีคำขอกำลังเผยแพร่ในวันนี้</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalenderAM;
