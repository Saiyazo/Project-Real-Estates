import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./cssforBTN/CalenderAM.css";

const CalenderAM = ({ adRequests }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const approvedAds = adRequests.filter((ad) => ad.status === "อนุมัติ");

  const filteredAds = approvedAds.filter((ad) => {
    const adStart = ad.startDate
      ? new Date(ad.startDate)
      : new Date(ad.submittedAt);
    const adEnd = ad.endDate ? new Date(ad.endDate) : adStart;
    return selectedDate >= adStart && selectedDate <= adEnd;
  });


  const dateColorsMap = {};
  approvedAds.forEach((ad) => {
    const adStart = new Date(ad.startDate || ad.submittedAt);
    const adEnd = new Date(ad.endDate || adStart);
    let color = "#17763a"; // 7 วัน
    if (ad.package.includes("14 วัน")) color = "#ff9800"; // 14 วัน
    if (ad.package.includes("30 วัน")) color = "#f44336"; // 30 วัน


    for (let d = new Date(adStart); d <= adEnd; d.setDate(d.getDate() + 1)) {
      const key = d.toDateString();
      if (!dateColorsMap[key]) dateColorsMap[key] = [];
      if (!dateColorsMap[key].includes(color)) dateColorsMap[key].push(color);
    }
  });

  const getStatusClass = (status) => {
    if (status === "อนุมัติ") return "OK-textAd";
    if (status === "รออนุมัติ") return "pending-textAd";
    if (status === "ยกเลิก") return "cancle-textAd";
    return "";
  };

  const getPackageColor = (pkg) => {
    if (pkg.includes("7 วัน")) return "#17763a";
    if (pkg.includes("14 วัน")) return "#ff9800";
    if (pkg.includes("30 วัน")) return "#f44336";
    return "#000";
  };

  return (
    <div className="calendar-wrapper" style={{ display: "flex", gap: "20px" }}>
      <div
        className="calendar-legend"
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

      <div className="pageAll">
        <h5>คำขอวันที่ {selectedDate.toLocaleDateString()}</h5>
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <div
              key={ad.id}
              className="border rounded-2 p-3 mb-2 bg-white"
              style={{ borderLeft: `5px solid ${getPackageColor(ad.package)}` }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{ad.campaignDetails}</strong>
                  <p>จาก: {ad.contact.name}</p>
                </div>
                <span className={getStatusClass(ad.status)}>{ad.status}</span>
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
          <p>ไม่มีคำขอในวันนี้</p>
        )}
      </div>
    </div>
  );
};

export default CalenderAM;
