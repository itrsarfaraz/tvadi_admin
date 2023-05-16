import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const axios = require('axios');

function Adinsert() {
  const navigate = useNavigate();
  return (
    <div className="card radius-10" style={{width:"90%", margin:"auto"}}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div
          style={{ borderRadius: "15px 15px 0px 0px" }}
          className="card-body cardHeader"
        >
          <h5 style={{ marginTop: "-10px" }}>Ad Insert</h5>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div className="card-body" style={{ height: "400px" }}>
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">Main Player Banner - url or pool</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">Main Player Square - url or pool</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">View Ad Pool/ assign</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">Home reserved 1</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">User reserved 1</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">Home reserved 2</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              
            </div>
            <div className="col-md-4 ">
              
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">Home reserved 3</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              
            </div>
            <div className="col-md-4 ">
              
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">Home reserved 4</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              
            </div>
            <div className="col-md-4 ">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adinsert;
