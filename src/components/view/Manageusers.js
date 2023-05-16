import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { toast } from "react-toastify";
import swal from "sweetalert";

const axios = require("axios");

function Manageusers() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const addEntryClick = (val) => {
    setDeleteId([...DeleteId, `${val}`]);
  };

  const [showAllPlaylist, SetshowAllPlaylist] = useState(false);
  const [allUserData, setallUserData] = useState([]);
  const [DeleteId, setDeleteId] = useState([]);

  useEffect(async () => {
    setSearchWord("");
  }, []);

  const setSearchWord = (val) => {
    axios.get(process.env.REACT_APP_API_URL + "/user/getAlldata", { headers: { Token: token }, params: { searchtearm: val } }).then(async (userResponse) => {
      if (userResponse.data.length > 0) {
        for (let index = 0; index < userResponse.data.length; index++) {
          var count = 0;
          await axios.post(process.env.REACT_APP_API_URL + "/manageplaylist/getPlayListByUserId", { userid: userResponse.data[index]._id }).then((playlistcounts) => {
            // console.log(playlistcounts.data.count);
            userResponse.data[index].allPlaylists = playlistcounts.data.count;
          });
          setallUserData(userResponse.data);
          // console.log(userResponse.data);
        }
      } else {
        setallUserData([]);
      }
    });
  }


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
            .post(process.env.REACT_APP_API_URL + "/user/deleteMultipleUsers", {
              ids: DeleteId,
            })
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
      name: "",
      selector: (row) => (
        <>
          {row.profile != null ? (
            <img
              className="mt-3"
              src={"http://190.92.153.226:3000/asset/profile/" + row.profile}
              width={60}
              height={60}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <img
              className="mt-3"
              src={
                "assets/images/default-profile.jpg"
              }
              width={60}
              style={{ borderRadius: "50%" }}
            />
          )}
        </>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "USERNAME",
      selector: (row) => row.username,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "REGISTERED",
      selector: (row) => row.registeredAt,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "LEVEL",
      selector: (row) => <>{row.role == 1 ? "Admin" : "Basic"}</>,
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "PLAYLISTS",
      selector: (row) => <><div style={{ cursor: "pointer" }}>{row.allPlaylists ? row.allPlaylists + ">See More" : "0"}<a style={{ cursor: "pointer" }}></a></div></>,
      sortable: true,
      reorder: true,
    },
    // {
    //   id: 7,
    //   name: "LIKES",
    //   selector: (row) => <>{Math.floor(Math.random() * 10000)}</>,
    //   sortable: true,
    //   reorder: true,
    // },
  ];

  return (
    <div className="card radius-10" style={{ width: "90%", margin: "auto" }}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div
          style={{ borderRadius: "15px 15px 0px 0px" }}
          className="card-body cardHeader"
        >
          <h5 style={{ marginTop: "-10px" }}>Manage Users</h5>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    <input
                      className="InputBox"
                      type="text"
                      placeholder="SEARCH USER"
                      onChange={(e) => {
                        setSearchWord(e.target.value);
                      }}
                      id="search"
                    />
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-4" onClick={deleteMultipleDeletePlaylist}>
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    DELETE SELECTED USERS
                  </h6>
                </div>
              </div>
            </div>
            <div
              className="col-md-4"
              onClick={() => {
                {
                  showAllPlaylist == false
                    ? SetshowAllPlaylist(true)
                    : SetshowAllPlaylist(false);
                }
              }}
            >
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    {showAllPlaylist ? "SHOW" : "HIDE"} ALL USERS
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className={showAllPlaylist ? "row mt-3 d-none" : "row mt-5 "}>
            <DataTable
              style={{ background: "transparent" }}
              title=""
              columns={columns}
              data={allUserData}
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

export default Manageusers;
