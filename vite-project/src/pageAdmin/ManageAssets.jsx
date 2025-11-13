import { Button } from "react-bootstrap";
import './pageStyle/dash.css'
const ManageAssets = () => {
  return (
    <div className="p-4 pageAll">
      <h1>รายการอสังหาริมทรัพย์</h1>
      <form class="d-flex mt-3" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class=" btn-search" type="submit">
          Search
        </button>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </form>{" "}
      <div className="d-flex gap-2 mt-3">
        <Button>ขายออกแล้ว</Button>
        <Button>ยังขายไม่อกก</Button>
        <Button>พึ่งประกาศ</Button>
      </div>
      <div>
        <div>ไอดีคนขาย ชื่อสินทรัพย์ ผู้ขาย สถานะ วันที่สร้าง</div>
        <div>ข้อมล</div>
        <div>
          แถบล่างสุดแสดงรายการ สินทรัย์.เล้งแซ่บ ลูกศรกับเลขเอาไว้เปลี่ยนหน้า
          1...1
        </div>
      </div>
    </div>
  );
};

export default ManageAssets;
