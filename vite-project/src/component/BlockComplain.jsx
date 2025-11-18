import { useEffect, useState,} from "react";
import { NavLink } from "react-router-dom";
import { fetchComplaints } from "../Data/DataComplaints.jsx";
import { Button } from "react-bootstrap";
import "./cssforBTN/Tab.css";

const Blockcomplain = () => {
  const [complaintBlock, setComplaintBlock] = useState([]);
  //วันล่าสุด
  useEffect(() => {
    const getComplaints = async () => {
      const data = await fetchComplaints();
      setComplaintBlock(data);
    };
    getComplaints();
  }, []);

  //แบ่งวัน
  const complaintsByDate = complaintBlock.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {});

  const sortedDates = Object.keys(complaintsByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );
  const LastDate = sortedDates[0];
  const LastDateComplain = complaintsByDate[LastDate];

  //สีสเตตัส

  return (
    <div className="d-flex gap-3 overflow-auto">
      {LastDateComplain &&
        LastDateComplain.map((boxComplain) => {
          return (
            <div
              className="border p-3"
              key={boxComplain.id}
              style={{
                width: "80%",
                minWidth: "300px",
                borderRadius: "8px",
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <div className="text-start">
                  <h5>
                    <span>{boxComplain.complaintNumber}</span>
                  </h5>
                </div>
                <div className="text-end boxbox">{boxComplain.status}</div>
              </div>
              <h6 className="mb-2">
                <b>{boxComplain.title}</b>
              </h6>
              <p style={{ height: "2rem" }}>
                {" "}
                {boxComplain.detail && boxComplain.details.length > 50
                  ? boxComplain.details.slice(0, 50) + "..."
                  : boxComplain.details}
              </p>
              <div className="text-end">
                <NavLink to={"/DetailCom"}>ดูรายละเอียดเพิ่มเติม</NavLink>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span className="text-start">{boxComplain.date}</span>
                <div className="text-end">
                  <Button variant="danger">ตรวจสอบ{/*เดี๋ยวอันนี้มาใส่ Navlink ไปหน้าดูการสนทนาเพิ่ม */}</Button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Blockcomplain;
