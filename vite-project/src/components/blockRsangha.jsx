
import { useEffect, useState } from "react";
import { fetchPropertys } from "../data/propertyS.jsx";
import "./cssforBTN/Tab.css";

const BlockAsang = () => {
  const [property, setProperties] = useState([]);

  useEffect(() => {
    const getProperty = async () => {
      const data = await fetchPropertys();
      setProperties(data);
    };
    getProperty();
  }, []);

  // แบ่งตามวันลงประกาศ
  const propertyByDate = property.reduce((acc, curr) => {
    if (!acc[curr.datePosted]) acc[curr.datePosted] = [];
    acc[curr.datePosted].push(curr);
    return acc;
  }, {});

  const sortedDates = Object.keys(propertyByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const latestDate = sortedDates[0];
  const latestProperties = propertyByDate[latestDate];

  return (
    <div className="d-flex gap-3 overflow-auto">
      {latestProperties &&
        latestProperties.map((boxProperty) => {
          return (
            <div
              className="border p-3"
              key={boxProperty.id}
              style={{
                width: "40%",
                minWidth: "300px",
                borderRadius: "8px",
              }}
            >
              {/* รูปประกาศ */}
              <img
                src={boxProperty.image}
                alt={boxProperty.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              {/* ข้อมูลประกาศ */}
              <h5 className="mt-2">
                <b>{boxProperty.title}</b>
              </h5>
              <p className="text-muted" style={{ height: "2rem" }}>
                {boxProperty.listingType} • {boxProperty.type} • {boxProperty.province}
              </p>

              {/* รหัสประกาศ */}
              <p className="mb-1">
                <b>เลขประกาศ:</b> {boxProperty.listingNumber}
              </p>

              {/* รหัสสินทรัพย์ */}
              <p className="mb-1">
                <b>รหัสทรัพย์:</b> {boxProperty.propertyCode}
              </p>

              {/* ผู้โพสต์ */}
              <p className="mb-2">
                <b>ผู้โพสต์:</b> {boxProperty.posterName}
              </p>             
              <hr />
              {/* วันที่ประกาศ + ปุ่ม */}
              <div className="d-flex justify-content-between">
                <span className="text-start">{boxProperty.datePosted}</span>
                <div className="text-end">
               <a className="text-primary">ดูรายละเอียดเพิ่มเติม</a>
              </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BlockAsang;
