const complaints = [
  {
    id: 1,
    complaintNumber: "#C854165",
    title: "ประกาศขายบ้านข้อมูลไม่ตรงกับความเป็นจริง",
    details:
      "ติดต่อผู้ขายผ่านประกาศ “ขายบ้านเดี่ยว 2 ชั้น ย่านลาดพร้าว” แต่ขนาดและจำนวนห้องไม่ตรงกับที่ระบุในเว็บ",
    request: "ตรวจสอบประกาศและดำเนินการเตือนหรือระงับบัญชีผู้ขาย",
    reporter: "Natcha Prasert",
    date: "2025-11-10",
    status: "รอดำเนินการ",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    complaintNumber: "#C854166",
    title: "ผู้ขายไม่มาตามนัดหมายดูคอนโด",
    details:
      "นัดหมายผู้ขายเพื่อดูคอนโดสุขุมวิท แต่ผู้ขายไม่มาตามนัดและไม่ตอบข้อความ",
    request: "ตรวจสอบพฤติกรรมผู้ขายและพิจารณาเตือนหรือระงับบัญชี",
    reporter: "Krit Phanuphong",
    date: "2025-11-12",
    status: "กำลังตรวจสอบ",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 3,
    complaintNumber: "#C854167",
    title: "ติดต่อไม่ได้",
    details: "พยายามทักผู้ขายหลายครั้ง แต่ผู้ขายไม่ตอบกลับข้อความหรือโทรศัพท์",
    request: "ตรวจสอบพฤติกรรมผู้ขายรายนี้",
    reporter: "Sirintra Chaiyawan",
    date: "2025-11-14",
    status: "รอดำเนินการ",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    id: 4,
    complaintNumber: "#C854168",
    title: "ผู้ขายไม่ตอบกลับข้อความ",
    details: "พยายามติดต่อผู้ขายหลายครั้งแต่ไม่ได้รับการตอบกลับ",
    request: "ตรวจสอบและดำเนินการตามนโยบาย",
    reporter: "Anucha Srisawat",
    date: "2025-11-12",
    status: "ปิดการใช้งานบัญชี",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    complaintNumber: "#C854169",
    title: "ประกาศซ้ำซ้อน/หลอกขาย",
    details: "ผู้ขายลงประกาศสินค้าเหมือนกันหลายครั้ง ทำให้เกิดความสับสน",
    request: "ตรวจสอบประกาศทั้งหมดและลบประกาศที่ซ้ำซ้อน",
    reporter: "Kittipong Maneerat",
    date: "2025-11-14",
    status: "รอดำเนินการ",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
  },
  {
    id: 6,
    complaintNumber: "#C854170",
    title: "ประกาศข้อมูลเท็จ",
    details: "ข้อมูลสินค้าที่ประกาศไม่ตรงกับของจริง",
    request: "ให้ผู้ขายแก้ไขข้อมูลหรือระงับประกาศ",
    reporter: "Saranya P.",
    date: "2025-11-14",
    status: "กำลังตรวจสอบ",
    image: "https://randomuser.me/api/portraits/women/81.jpg",
  },
];

export function fetchComplaints() {
  return complaints;
}
