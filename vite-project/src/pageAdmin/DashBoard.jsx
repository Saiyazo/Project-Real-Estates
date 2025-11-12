import { useOutletContext } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { NavLink } from "react-router-dom";
import "../pageAdmin/pageStyle/dash.css";
import "../component/cssforBTN/Tab.css";

const DashboardAdmin = () => {
  const { buyers, sellers, properties, complaints } = useOutletContext();

  const totalUsers = (buyers?.length || 0) + (sellers?.length || 0);
  const totalProperties = properties?.length || 0;
  const totalComplaints = complaints?.length || 0;

  const usersData = [
    { role: "ผู้ซื้อ", value: buyers?.length || 0 },
    { role: "ผู้ขาย", value: sellers?.length || 0 },
  ];
  const color4Graph = ["#46b37a", "#f7cb06"];

  // ประเภทคำร้องเรียน

const categorized = complaints.map((c) => {
  if (c.title?.includes("ข้อมูลไม่ตรง")) return { ...c, type: "ข้อมูลเท็จ" };
  if (c.title?.includes("ไม่มาตามนัด"))
    return { ...c, type: "พฤติกรรมผู้ขาย" };
  if (
    c.title?.includes("ติดต่อไม่ได้") ||
    c.title?.includes("ไม่ตอบกลับ")
  )
    return { ...c, type: "ติดต่อไม่ได้" };
  return { ...c, type: "อื่น ๆ" };
});

console.log(categorized);


  // ข้อมูล Bar Chart
  const complaintColors = {
    ข้อมูลเท็จ: "#ff9f43",
    พฤติกรรมผู้ขาย: "#54a0ff",
    ติดต่อไม่ได้: "#f7cb06",
    "อื่น ๆ": "#10ac84",
  };
  const complaintsData = Object.keys(complaintColors).map((type) => ({
    type: type,
    count: categorized.filter((c) => c.type === type).length,
  }));

  return (
    <div className="p-4">
      <h1>แดชบอร์ด</h1>
      {/**แถบอะไรซักอย่าง การ์ดมั้ง */}
      <div className="d-flex justify-content-between gap-3 mt-3 flex-wrap">
        {/* ManageUser */}
        <div className="card-1">
          <div className="card-header">
            <div>
              <h5>จำนวนผู้ใช้ทั้งหมด</h5>
              <h1>{totalUsers}</h1>
            </div>
            <i className="bi bi-people-fill"></i>
          </div>

          <NavLink
            to="/ManageUser"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ดูรายการบัญชีผู้ใช้ <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>

        {/*complaint เขียนไงนะ ใครเขียนถูกฝากแก้ด้วย */}
        <div className="card-2">
          <div className="card-header">
            <div>
              <h5>คำร้องเรียนทั้งหมด</h5>
              <h1>{totalComplaints}</h1>
            </div>
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <NavLink to="/ComplainUser">
            ดูคำร้องเรียน <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>

        {/*อสงขัย at all */}
        <div className="card-3">
          <div className="card-header">
            <div>
              <h5>อสังหาริมทรัพย์ทั้งหมด</h5>
              <h1>{totalProperties}</h1>
            </div>
            <i className="bi bi-building"></i>
          </div>
          <NavLink to="/ManageAssets">
            ดูรายการอสังหาริมทรัพย์ <i className="bi bi-arrow-right-short"></i>
          </NavLink>
        </div>
      </div>{" "}
      {/*กราฟ */}
      {/**กราฟโดนัทเทศกาลคริสต์มาส */}
      <div className="d-flex mt-2">
        <div className="border rounded-2 p-3 m-2" style={{ width: "50%" }}>
          <p className="fw-semibold"> สัดส่วนผู้ใช้</p>
          <hr />
          <div>
            <ResponsiveContainer width="100%" height="350">
              <PieChart>
                <Pie
                  data={usersData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60} // โดนัทja
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="role"
                >
                  {usersData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={color4Graph[index % color4Graph.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/*กราฟแท่งป๊อกกี้ ------แก้ด้วย--------*/}
        <div
          className="border rounded-2 p-3 m-2 flex-fill"
          style={{ minWidth: "350px" }}
        >
          <p className="fw-semibold">ภาพรวมคำร้องเรียนตามประเภท</p>
          <hr />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={complaintsData}>
              <XAxis dataKey="type" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                label={({ x, y, width, value, index }) => {
                  const type = complaintsData[index].type;
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 5}
                      textAnchor="middle"
                      fontSize={14}
                      fontWeight="normal"
                    >
                      {value}
                    </text>
                  );
                }}
              >
                {complaintsData.map((entry, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={complaintColors[entry.type] || "#8884d8"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>คำร้องเรียนใหม่</div>
      <div>ประกาศขายอสังหาใหม่</div>
    </div>
  );
};

export default DashboardAdmin;
