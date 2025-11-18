import BlockUser from "../component/blockUser";
const ComplainUser = () => {
    return ( 
        <div className="p-4 pageAll">
            <h1>ประวัติการร้องเรียน</h1>
             <h5>บัญชีผู้ใช้ที่ถูกรายงาน</h5>
      <div className="d-flex">
        {/**ก้อนการ์ดผู้ใช้ */}
        
        <BlockUser/>
      </div>
        </div>
     );
}
 
export default ComplainUser