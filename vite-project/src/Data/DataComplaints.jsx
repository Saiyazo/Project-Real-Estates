const complaints = [
  {
    id: 1,
    complaintNumber: "#C854165",
    type: "ร้องเรียนประกาศ",
    title: "ประกาศขายบ้านข้อมูลไม่ตรงกับความเป็นจริง",
    details:
      "ติดต่อผู้ขายผ่านประกาศ “ขายบ้านเดี่ยว 2 ชั้น ย่านลาดพร้าว” แต่ขนาดและจำนวนห้องไม่ตรงกับที่ระบุในเว็บ",
    request: "ตรวจสอบประกาศและดำเนินการเตือนหรือระงับบัญชีผู้ขาย",
    reporter: {
      name: "Natcha Prasert",
      role: "ผู้ซื้อ/ผู้เช่า"
    },
    target: {
      name: "ขายบ้านเดี่ยว 2 ชั้น ย่านลาดพร้าว",
      category: "ประกาศ"
    },
    date: "2025-11-10",
    status: "รอดำเนินการ",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 2,
    complaintNumber: "#C854166",
    type: "ร้องเรียนแชต",
    title: "ผู้ขายไม่มาตามนัดหมายดูคอนโด",
    details:
      "นัดหมายผู้ขายเพื่อดูคอนโดสุขุมวิท แต่ผู้ขายไม่มาตามนัดและไม่ตอบข้อความ",
    request: "ตรวจสอบพฤติกรรมผู้ขายและพิจารณาเตือนหรือระงับบัญชี",
    reporter: {
      name: "Krit Phanuphong",
      role: "ผู้ซื้อ/ผู้เช่า"
    },
    target: {
      name: "ผู้ขายคอนโดสุขุมวิท",
      category: "ผู้ใช้"
    },
    date: "2025-11-12",
    status: "กำลังตรวจสอบ",
    image: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    id: 3,
    complaintNumber: "#C854167",
    type: "ร้องเรียนผู้ใช้",
    title: "ติดต่อไม่ได้",
    details: "พยายามทักผู้ขายหลายครั้ง แต่ผู้ขายไม่ตอบกลับข้อความหรือโทรศัพท์",
    request: "ตรวจสอบพฤติกรรมผู้ขายรายนี้",
    reporter: {
      name: "Sirintra Chaiyawan",
      role: "ผู้ซื้อ/ผู้เช่า"
    },
    target: {
      name: "ผู้ขายรายนี้",
      category: "ผู้ใช้"
    },
    date: "2025-11-14",
    status: "รอดำเนินการ",
    image: "https://randomuser.me/api/portraits/women/72.jpg"
  },
  {
    id: 4,
    complaintNumber: "#C854168",
    type: "ร้องเรียนแชต",
    title: "ผู้ขายไม่ตอบกลับข้อความ",
    details: "พยายามติดต่อผู้ขายหลายครั้งแต่ไม่ได้รับการตอบกลับ",
    request: "ตรวจสอบและดำเนินการตามนโยบาย",
    reporter: {
      name: "Anucha Srisawat",
      role: "ผู้ซื้อ/ผู้เช่า"
    },
    target: {
      name: "ผู้ขายรายนี้",
      category: "ผู้ใช้"
    },
    date: "2025-11-12",
    status: "ปิดการใช้งานบัญชี",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 5,
    complaintNumber: "#C854169",
    type: "ร้องเรียนประกาศ",
    title: "ประกาศซ้ำซ้อน/หลอกขาย",
    details: "ผู้ขายลงประกาศสินค้าเหมือนกันหลายครั้ง ทำให้เกิดความสับสน",
    request: "ตรวจสอบประกาศทั้งหมดและลบประกาศที่ซ้ำซ้อน",
    reporter: {
      name: "Kittipong Maneerat",
      role: "ผู้ซื้อ/ผู้เช่า"
    },
    target: {
      name: "ประกาศซ้ำซ้อน",
      category: "ประกาศ"
    },
    date: "2025-11-14",
    status: "รอดำเนินการ",
    image: "https://randomuser.me/api/portraits/men/77.jpg"
  },
  {
    id: 6,
    complaintNumber: "#C854170",
    type: "ร้องเรียนประกาศ",
    title: "ประกาศข้อมูลเท็จ",
    details: "ข้อมูลสินค้าที่ประกาศไม่ตรงกับของจริง",
    request: "ให้ผู้ขายแก้ไขข้อมูลหรือระงับประกาศ",
    reporter: {
      name: "Saranya P.",
      role: "ผู้ซื้อ/ผู้เช่า"
    },
    target: {
      name: "ประกาศสินค้านี้",
      category: "ประกาศ"
    },
    date: "2025-11-14",
    status: "กำลังตรวจสอบ",
    image: "https://randomuser.me/api/portraits/women/81.jpg"
  }
];

export function fetchComplaints() {
  return complaints;
}
