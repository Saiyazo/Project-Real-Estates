
const BlockUser = () => {

    return ( 
        <>
        <div className="border rounded-2">
          <div>สถานะแถบเหลือง แถบแดง บลาๆ</div>
          <div>
          <div className="d-flex"> 
            <div className="m-3">img
                
            </div>
            <div>
              <p>name</p>
              <p>email</p>
            </div>
            </div>
          </div>
          <p>รายละเอียดคร่าวๆวาโดนเรื่องอะไร</p>
          <div>
            <button>ดูโปรไฟล์</button>
            <button>สถานะ</button>{/*ถูกระงับชั่วคราว /โดนแบนไปน้อง  */}
          </div>
        </div>
        </>
     );
}
 
export default BlockUser;