import { Button, Form } from "react-bootstrap";

const NavbarAdmin = () => {
  return (
    <>
      <div className="d-flex align-content-between p-3 border align-items-end">
        {/* Search */}
        <Form className="d-flex " role="search" style={{width: "60%"}}>
       
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        <button class="btn btn-outline-primary d-flex align-items-center gap-2" type="submit"><i class="bi bi-search"></i> &nbsp;Search</button>
        </Form>

        {/* Icons */}
        <div className="d-flex align-items-end fs-4 ms-auto">
          <i className="bi bi-bell me-2 ms-3"></i>
          <i className="bi bi-info-circle me-2 ms-3"></i>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
