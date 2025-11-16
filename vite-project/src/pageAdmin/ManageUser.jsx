import BlockUser from "../component/blockUser";
const ManageUser = () => {
  return (
    <div className="p-4 pageAll">
      <h1>จัดการบัญชีผู้ใช้</h1>
      <form class="d-flex mt-3" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn-search" type="submit">
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
      <br />
      <h5>บัญชีผู้ใช้ที่ถูกรายงาน</h5>
      <div className="d-flex">
        {/**ก้อนการ์ดผู้ใช้ */}
        
        <BlockUser/>
      </div>
      <div className="mt-3">
        <h5>บัญชีผู้ใช้ทั้งหมด</h5>
        ทำเป็นตาราง มีโปรไฟล์ ชื่อ-อีเมล บทบาท(นายหน้าหรือลูกค้า) วันที่เข้าร่วม
      </div>
    </div>
  );
};

export default ManageUser;
