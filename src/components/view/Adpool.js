import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { toast } from "react-toastify";
import swal from "sweetalert";

const axios = require("axios");

function Adpool() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();


  const addEntryClick = (val) => {
    setDeleteId([...DeleteId, `${val}`]);
  };

  const [showAllPlaylist, SetshowAllPlaylist] = useState(false);
  const [allAdPoolData, setallAdPoolData] = useState([]);
  const [DeleteId, setDeleteId] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getResspaceData", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          setallAdPoolData(response.data);
        }
      });
  }, []);





  console.log(allAdPoolData);




  const handleChange = (state) => {
    setDeleteId(state.selectedRows);
  };



  const deleteMultipleDeletePlaylist = () => {
    if (DeleteId.length == 0) {
      toast.warning("Please Select User to Delete");
    } else {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
          axios
            .post(
              process.env.REACT_APP_API_URL +
                "/user/deleteMultipleUsers",
              {
                ids: DeleteId,
              }
            )
            .then((res) => {
              toast.success("Delete Successfully", {});
            })
            .catch((err) => {
              console.log("err");
            });
        }
      });
      }
  };





  const columns = [
    {
      id: 1,
      name: "BANNER ADS",
      selector: (row) => <></>,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "PREVIEW",
      selector: (row) => <><img src={"assets/images/reserved/" +row.resimage} alt="" width={200} className="mt-3" /></>,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "STATUS",
      selector: (row) => <></>,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "SOURCE",
      selector: (row) => <></>,
      sortable: true,
      reorder: true,
    },
  ];

  return (
    <div className="card radius-10" style={{width:"90%", margin:"auto"}}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div
          style={{ borderRadius: "15px 15px 0px 0px" }}
          className="card-body cardHeader"
        >
          <h6 style={{ marginTop: "-10px" }}>Ad Pool</h6>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">BANNER AD POOL(IMG/URL)</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">SQUARE AD POOL(IMG/URL)</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">SEARCH AD POOL</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className=""> ADD NEW BANNER AD</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">ADD NEW SQUARE AD</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6  style={{marginTop:"-8px"}} className="">ADD/VIEW MISC AD</h6>
                </div>
              </div>
            </div>
          </div>
          <div className={showAllPlaylist ? "row mt-3 d-none" : "row mt-5 "}>
            <DataTable
              style={{ background: "transparent" }}
              title=""
              columns={columns}
              data={allAdPoolData}
              defaultSortFieldId={1}
              sortIcon={<ArrowUpwardIcon />}
              pagination
              selectableRows
              onSelectedRowsChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adpool;
