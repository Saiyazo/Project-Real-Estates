const ManageUser = () => {
    return ( 
        <div className="p-2 m-2">
            <h1>รายการบัญชีผู้ใช้</h1>
            <div>searchbar fliter : หาไอดี บลาๆ ของยูเซอร์</div>
            <h5>บัญชีผู้ใช้ที่ถูกรายงาน</h5>
            <div>{/**ก้อนการ์ดผู้ใช้ */}
                <p>สถานะแถบเหลือง แถบแดง บลาๆ</p>
                <div>
                    <div>img</div>
                    <div>
                        <p>name</p>
                        <p>email</p>
                    </div>
                </div>
                <p>รายละเอียดคร่าวๆวาโดนเรื่องอะไร</p>
                <div>
                    <button>ดูโปรไฟล์ หรือดูรายละเอียดเพิ่มเติม</button>
                    <button>สถานะ ถูกระงับชั่วคราว /โดนแบนไปน้อง /</button>
                </div>
            </div>
        </div>
     );
}
 
export default ManageUser;