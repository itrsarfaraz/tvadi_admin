import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const axios = require('axios');

function Dashboard() {
  const navigate = useNavigate();


  const [palylistCount,setPalylistCount] = useState();
  const [VideosCount,setVideosCount] = useState();
  useEffect(() => 
  {
    const user_id = sessionStorage.getItem("user_id");
    const token = localStorage.getItem('token');

    axios.get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata").then((response) => { setPalylistCount(response.data.length); });
    // Get All Videos Data
    axios.get(process.env.REACT_APP_API_URL + "/playlist_video/getAlldata").then((response) => { setVideosCount(response.data.length); });


  }, []);
  return (
    <div className="card radius-10">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div className="col">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Playlist</h5>
              <div className="ms-auto">
                {/* <i className="bx bx-cart fs-3 text-white"></i> */}
              </div>
            </div>
            <div className="progress my-3" style={{ height: "3px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: " 55%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Total</p>
              <p className="mb-0 ms-auto">
                {palylistCount}<span></span>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Videos</h5>
              <div className="ms-auto">
                {/* <i className="bx bx-dollar fs-3 text-white"></i> */}
              </div>
            </div>
            <div className="progress my-3" style={{ height: "3px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: " 55%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Total</p>
              <p className="mb-0 ms-auto">{VideosCount}</p>
            </div>
          </div>
        </div>
        {/* <div className="col">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">6200</h5>
              <div className="ms-auto">
                <i className="bx bx-group fs-3 text-white"></i>
              </div>
            </div>
            <div className="progress my-3" style={{ height: "3px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: " 55%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Visitors</p>
              <p className="mb-0 ms-auto">
                +5.2%
                <span>
                  <i className="bx bx-up-arrow-alt"></i>
                </span>
              </p>
            </div>
          </div>
        </div> */}
        {/* <div className="col">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="mb-0">5630</h5>
              <div className="ms-auto">
                <i className="bx bx-envelope fs-3 text-white"></i>
              </div>
            </div>
            <div className="progress my-3" style={{ height: "3px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "55%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex align-items-center text-white">
              <p className="mb-0">Messages</p>
              <p className="mb-0 ms-auto">
                +2.2%
                <span>
                  <i className="bx bx-up-arrow-alt"></i>
                </span>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
