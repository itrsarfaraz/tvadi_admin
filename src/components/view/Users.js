import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../../css/style.css";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { Dropdown } from "react-bootstrap";

const axios = require("axios");
toast.configure();

function Users() {
  const token = localStorage.getItem("token");
  // console.log(token);
  // Featch All Data
  const [allData, setallData] = useState([]);

  useEffect(() => {
    callData();
  }, []);

  function callData() {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getAlldata", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          response.data[index].id = index + 1;
        }
        setallData(response.data);
      });
  }

  window.addEventListener("ready", (event) => {
    callData();
  });

  //  Delete PlayList
  const onDelete = (val) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(process.env.REACT_APP_API_URL + "/user/delete", { id: val })
          .then((res) => {
            toast.success("Delete Successfully", {});
            callData();
          })
          .catch((err) => {
            if (
              err.response &&
              err.response.data &&
              err.response.data.errorMessage
            ) {
              toast.error(err.response.data.errorMessage, {});
            }
          });
      }
    });
  };
  //End Delete users

  const columns = [
    {
      id: 1,
      name: "S.no",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Email / Phone",
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      reorder: true,
    },

    {
      id: 4,
      name: "User Type",
      selector: (row) => (row.role == 1 ? "Admin" : "User"),
      sortable: true,
      right: true,
      reorder: true,
    },
    {
      id: 5,
      name: "",
      // selector: (row) => row.role,
      sortable: true,
      right: true,
      reorder: true,
    },
    {
      id: 6,
      name: "Action",
      button: true,
      cell: (row) => (
        <React.Fragment>
          <button
            className="btn btn-sm btn-light"
            onClick={() => onDelete(row._id)}
          >
            <i className="bx bx-trash me-0"></i>
          </button>
          &nbsp;
          <button
            onClick={() => {
              setEmail(row.email);
              setUserName(row.username);
              setRole(row.role);
              setUpdateId(row._id);
              handleUserModelShow("update");
            }}
            className="btn btn-sm btn-light"
          >
            <i className="lni lni-pencil-alt me-0"></i>
          </button>
          &nbsp;
          <Dropdown id="drop">
            <Dropdown.Toggle
              variant="btn-light btn btn-sm"
              id="dropdown-basic"
              style={{ color: "#fff" }}
            >
              {/* <i className="lni lni-more me-0"></i> */}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setEmail(row.email);
                  setUserName(row.username);
                  setRole(row.role);
                  setUpdateId(row._id);
                  handlePasswordModelShow("changePassword");
                }}
              >
                Change Password
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setUpdateId(row._id);
                  verifyUser(row._id);
                }}
              >
                {row.status == 1 ? "Verified" : "Verify User"}
              </Dropdown.Item>
              {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>  */}
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      ),
    },
    {
      id: 7,
      name: "",
      // selector: (row) => row.role,
      sortable: true,
      right: true,
      reorder: true,
    },
  ];

  const [addUsershow, SetaddUserModelshow] = useState(false);
  const handleUserModelShow = (opr) => {
    SetaddUserModelshow(true);
    setOpration(opr);
    if (opr === "add") {
      setUserName("");
      setEmail("");
      setPassword("");
      setRole("");
    }
  };
  const handleUserClose = () => SetaddUserModelshow(false);

  const [Passwordshow, SetPasswordModelshow] = useState(false);
  const handlePasswordModelShow = (opr) => {
    SetPasswordModelshow(true);
    setOpration(opr);
    if (opr === "add") {
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
    }
  };
  const handlePasswordClose = () => SetPasswordModelshow(false);

  //Verify User
  const verifyUser = (id) => {
    var data = id;
    axios
      .post(process.env.REACT_APP_API_URL + "/user/verify", {
        id: data,
      })
      .then((res) => {
        toast.success("Email Account Verify Successfully");
      })
      .catch((err) => {
        toast.error("Email Account Not verify");
      });
  };

  // End Verify User

  // ////////////////////////
  // Submit Users Data
  const [opration, setOpration] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  // const [user, setuser] = useState("");
  const [updateUserId, setUpdateId] = useState("");
  const submitUserData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/user/add", {
        username: UserName.toLowerCase(),
        email: Email.toLowerCase(),
        password: Password,
        role: Role,
        opration: opration,
        id: updateUserId,
      })
      .then((res) => {
        handleUserClose();
        callData();
        if (opration !== "update") toast.success("Added Successfully", {});
        else toast.success("Update Successfully", {});
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          toast.error(err.response.data.errorMessage, {});
        }
      });
    callData();
  };

  const submitPasswordData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/user/update_password", {
        password: Password,
        confirmPassword: ConfirmPassword,
        opration: opration,
        id: updateUserId,
      })
      .then((res) => {
        callData();
        if (opration !== "changePassword")
          toast.success("Added Successfully", {});
        else toast.success("Update Successfully", {});
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          toast.error(err.response.data.errorMessage, {});
        }
      });
  };

  return (
    <>
      <div className="col">
        <div style={{ position: "relative" }} className="col-12 text-right">
          <button
            onClick={() => handleUserModelShow("add")}
            className="btn btn-light float-right add-user"
            variant="primary"
          >
            Add User
          </button>
        </div>
        <br />
        <br />
        <br />
        <div className="card p-3" style={{ overflow: "auto" }}>
          <DataTable
            style={{ background: "transparent" }}
            title="User"
            columns={columns}
            data={allData}
            defaultSortFieldId={1}
            sortIcon={<ArrowUpwardIcon />}
            pagination
          />
        </div>
      </div>
      {/* Add Data Model */}
      <Modal show={addUsershow} onHide={handleUserClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {opration == "update" ? "Edit User" : "Add User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label text-white">Role</label>
              <div className="input-group" id="show_hide_password">
                <select
                  className="form-control"
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option selected disabled>
                    -----Select Role----
                  </option>
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label text-white">User Name</label>
              <div className="input-group" id="show_hide_password">
                <input
                  value={UserName !== "" ? UserName : ""}
                  onChange={(e) => setUserName(e.target.value)}
                  type="text"
                  className="form-control border-end-0"
                  id="inputChoosePassword"
                  placeholder="Enter Username"
                />
              </div>
            </div>
            <div className="col-12">
              <label className="form-label text-white">
                Email or Mobile Number
              </label>
              <div className="input-group" id="show_hide_password">
                <input
                  value={Email !== "" ? Email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control border-end-0"
                  id="inputChoosePassword"
                  placeholder="Enter Email or Mobile Number"
                />
              </div>
            </div>
            {opration == "add" ? (
              <div className="col-12">
                <label className="form-label text-white">Password</label>
                <div className="input-group" id="show_hide_password">
                  <input
                    value={Password !== "" ? Password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control border-end-0"
                    id="inputChoosePassword"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUserClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => {
              submitUserData();
              // handleUserClose();
            }}
          >
            {opration == "update" ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={Passwordshow} onHide={handlePasswordClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label text-white">New Password</label>
              <div className="input-group" id="show_hide_password">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  className="form-control border-end-0"
                  id="inputChoosePassword"
                  placeholder="Enter New Password"
                />
              </div>
            </div>

            <div className="col-12">
              <label className="form-label text-white">Comfirm Password</label>
              <div className="input-group" id="show_hide_password">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="text"
                  className="form-control border-end-0"
                  id="inputChoosePassword"
                  placeholder="Comfirm Password"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePasswordClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => {
              submitPasswordData();
              handlePasswordClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;
