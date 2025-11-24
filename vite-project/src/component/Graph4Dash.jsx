import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchComplaints } from "../Data/DataComplaints.jsx";
import { fetchAdRequests } from "../Data/adRequests.jsx";

const GrapAll = () => {
  const [complaints, setComplaints] = useState([]);
  const [adRequests, setAdRequests] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const complaintsData = await fetchComplaints();
        const adRequestsData = await fetchAdRequests();

        setComplaints(complaintsData);
        setAdRequests(adRequestsData);
      } catch (error) {
        console.error("Failed to fetch :", error);
      }
    };

    loadData();
  }, []);


  // กราฟคำร้องเรียน

  const complaintsByDate = complaints.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = 0;
    acc[curr.date] += 1;
    return acc;
  }, {});

  const chartData = Object.keys(complaintsByDate)
    .sort()
    .map((date) => ({
      date,
      "จำนวนคำร้องเรียน": complaintsByDate[date],
    }));

 
  // กราฟคำขอโฆษณา
  const adStatusColors = {
  "รอการตรวจสอบ": "#ffe600ff",
  "รอผู้ใช้แก้ไขข้อมูล": "#00BFFF",
  "รอชำระเงิน": "#FF8C00",
  "กำลังเผยแพร่": "#32CD32",
  "ประกาศหมดอายุ": "#A9A9A9",
  "ยกเลิก": "#FF4C4C",
};
  //data 4 BarChart
  const requestDataNa = Object.keys(adStatusColors).map((status) => ({
    type: status,
    count: adRequests.filter((ad) => ad.status?.trim() === status).length,
  }));


  const renderLegend = () => (
    <div style={{ marginTop: 20, display: "flex", gap: "10px", justifyContent: "center" }}>
      {Object.keys(adStatusColors).map((status) => (
        <div key={status} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ 
              width: 15,
              height: 15,
              backgroundColor: adStatusColors[status],
              marginRight: 5,
            }}
          />
          <span>{status}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="d-flex flex-wrap">
      {/* กราฟคำร้องเรียน */}
      <div
        className="border rounded-2 p-3 mt-2 me-3"
        style={{ width: "50%", minWidth: "300px" }}
      >
        <p className="fw-semibold">
          <i className="bi bi-graph-up"></i>&nbsp;คำร้องเรียน
        </p>
        <hr />
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="linear"
              dataKey="จำนวนคำร้องเรียน"
              stroke="#ff4343"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* กราฟแท่งคำขอโฆษณา */}
      <div
        className="border rounded-2 p-3 mt-2"
        style={{ width: "48%", minWidth: "300px" }}
      >
        <p className="fw-semibold">
          <i className="bi bi-bar-chart-fill"></i>&nbsp;คำขอโฆษณา
        </p>
        <hr />

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={requestDataNa}>
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend content={renderLegend} />
            <Bar dataKey="count" barSize={30} name="จำนวน">
              {requestDataNa.map((entry, index) => (
                <Cell key={index} fill={adStatusColors[entry.type]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrapAll;
