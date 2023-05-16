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
    <div className="card radius-10" style={{width:"90%", margin:"auto"}}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div
          style={{ borderRadius: "15px 15px 0px 0px" }}
          className="card-body cardHeader"
        >
          <h5 style={{ marginTop: "-10px" }}>Miscellaneous</h5>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div className="card-body" style={{ height: "400px" }}>
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white text-center">
                  <h6  style={{marginTop:"-17px"}} className="">Set <img style={{ width:"12%"}} src="assets/images/Button_goToUserPage2.png" className="logo-icon" alt="logo icon" /></h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white text-center">
                <h6  style={{marginTop:"-13px"}} className="">Set <img style={{ width:"10%"}} src="assets/images/gear.png" className="logo-icon" alt="logo icon" /></h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white text-center">
                <h6  style={{marginTop:"-13px"}} className="">Set <img style={{ width:"10%"}} src="assets/images/Button_GoToMainPlayer2.png" className="logo-icon" alt="logo icon" /></h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                 
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white text-center">
                  <h6  style={{marginTop:"-8px"}} className="">Laravel pages/plugings</h6>
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
