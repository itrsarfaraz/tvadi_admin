import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const axios = require("axios");

function Dashboard() {
  const navigate = useNavigate();

  const [palylistCount, setPalylistCount] = useState();
  const [VideosCount, setVideosCount] = useState();
  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    axios
      .get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata")
      .then((response) => {
        setPalylistCount(response.data.length);
      });
    // Get All Videos Data
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist_video/getAlldata")
      .then((response) => {
        setVideosCount(response.data.length);
      });
  }, []);
  return (
    <div className="container">
      <div className="main-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="assets/images/avatars/avatar-2.png"
                    alt="Admin"
                    className="rounded-circle p-1 bg-primary"
                    width="110"
                  />
                  <div className="mt-3">
                    <h4>John Doe</h4>
                    <p className="mb-1">Full Stack Developer</p>
                    <p className="font-size-sm">Bay Area, San Francisco, CA</p>
                    <button className="btn btn-light">Follow</button> &nbsp;
                    <button className="btn btn-light">Message</button>
                  </div>
                </div>
                <hr className="my-4" />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-9">
                    <input
                      type="button"
                      value={"Save Changes"}
                      className="btn btn-light px-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
