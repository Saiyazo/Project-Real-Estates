import { Button } from "react-bootstrap";
const ManageAssets = () => {
  return (
    <div className=" p-4">
      <h1>รายการอสังหาริมทรัพย์</h1>
      <div>( icon ) searchbar <button>filter พวกประเภท(บ้าน/คอนโด/ที่ดิน) เวลาที่โพสต์(วันนี้/สัปดาห์นี้/เดือนนี้)</button></div>
      
      <div className="d-flex gap-2 mt-3">
        <Button>ขายออกแล้ว</Button>
        <Button>ยังขายไม่อกก</Button>
        <Button>พึ่งประกาศ</Button>
      </div>
      <div>
        <div>ไอดีคนขาย ชื่อสินทรัพย์ ผู้ขาย สถานะ วันที่สร้าง</div>
        <div>ข้อมล</div>
        <div>แถบล่างสุดแสดงรายการ สินทรัย์.เล้งแซ่บ ลูกศรกับเลขเอาไว้เปลี่ยนหน้า 1...1</div>
      </div>
    </div>
  )
}

export default ManageAssets;
