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
import { fetchComplaints } from "../data/DataComplaints.jsx";
import { fetchAdRequests } from "../data/adRequests.jsx";

const GrapAll = () => {
  const [complaints, setComplaints] = useState([]);
  const [adRequests, setAdRequests] = useState([]);

  useEffect(() => {
    const loadData = () => {
      try {
        const complaintsData = fetchComplaints();
        const adRequestsData = fetchAdRequests();
        setComplaints(complaintsData);
        setAdRequests(adRequestsData);
      } catch (error) {
        console.error("Failed to fetch :", error);
      }
    };
    loadData();
  }, []);

  // LineChart: คำร้องเรียน
  const complaintsByDate = complaints.reduce((acc, curr) => {
    if (!acc[curr.date])
      acc[curr.date] = { date: curr.date, ทั้งหมด: 0, เสร็จสิ้น: 0 };
    acc[curr.date].ทั้งหมด += 1;
    if (curr.status === "เสร็จสิ้น") acc[curr.date].เสร็จสิ้น += 1;
    return acc;
  }, {});

  const chartData = Object.values(complaintsByDate).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // BarChart: สถานะโฆษณา
  const adStatusColors = {
    "รอการตรวจสอบ": "#ffe600ff",
    "รอผู้ใช้แก้ไขข้อมูล": "#00BFFF",
    "รอชำระเงิน": "#FF8C00",
    "กำลังเผยแพร่": "#32CD32",
    "ประกาศหมดอายุ": "#A9A9A9",
  };

  const requestDataNa = Object.keys(adStatusColors).map((status) => ({
    type: status,
    count: adRequests.filter((ad) => ad.status?.trim() === status).length,
  }));

  const renderLegend = () => (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
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
    <div className="d-flex flex-wrap gap-3">
      {/* LineChart: คำร้องเรียน */}
      <div style={{ flex: "1 1 48%", minWidth: "300px" }} className="border rounded-2 p-3 mt-2">
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
              dataKey="ทั้งหมด"
              stroke="#ff4343"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              name="คำร้องเรียนทั้งหมด"
            />
            <Line
              type="linear"
              dataKey="เสร็จสิ้น"
              stroke="#32cd32"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              name="คำร้องเรียนที่เสร็จสิ้น"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BarChart: สถานะโฆษณา */}
      <div style={{ flex: "1 1 48%", minWidth: "300px" }} className="border rounded-2 p-3 mt-2">
        <p className="fw-semibold">
          <i className="bi bi-bar-chart-fill"></i>&nbsp;สถานะโฆษณา
        </p>
        <hr />
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={requestDataNa} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
