import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { toast } from "react-toastify";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Modal from "react-bootstrap/Modal";
import { CSVLink, CSVDownload } from 'react-csv';


const axios = require("axios");
var moment = require("moment");

function Manageplaylist() {
  const [allData, setallData] = useState([]);

  const navigate = useNavigate();
  const [allPlaylistData, setallPlaylistData] = useState([]);
  const [allPlaylistVideosData, setallPlaylistVideosData] = useState([]);
  const [user, setuser] = useState("");
  const [playListName, setPlayListName] = useState("");
  const [opration, setOpration] = useState("");
  const [DeleteId, setDeleteId] = useState([]);
  const [showAllPlaylist, SetshowAllPlaylist] = useState(false);
  const [searchTerm, SetsearchTerm] = useState("");

  //Add And Update Playlist
  const submitPlaylistData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/manageplaylist/add", {
        title: playListName,
        opration: opration,
        id: updatePlaylistId,
        user: JSON.parse(sessionStorage.getItem("userDetails")).user_id,
      })
      .then((res) => {
        if (opration == "add") toast.success("Added Successfully", {});
        else toast.success("Update Successfully", {});
        // callData();
        setSearchWord("");
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

  // var deleteIdArr = [];
  const addEntryClick = (val) => {
    setDeleteId([...DeleteId, `${val}`]);
  };

  const handleChange = (state) => {
    setDeleteId(state.selectedRows);
  };

  useEffect(async () => {
    setSearchWord("");
  }, []);

  const setSearchWord = (val) => {
    axios
      .post(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata", {
        searchtearm: val,
      })
      .then((playlistResponse) => {
        if (playlistResponse.data.length > 0) {
          for (let index = 0; index < playlistResponse.data.length; index++) {
            setallPlaylistVideosData(playlistResponse.data[index].videos);

            var durationCount = 0, likesCount = 0, viewsCount = 0;

            for (let k = 0; k < playlistResponse.data[index].videos.length; k++) {
              if (playlistResponse.data[index].users[0]) {
                playlistResponse.data[index].user_ = playlistResponse.data[index].users[0].username;
              }
              let likes = playlistResponse.data[index].videos[k].likes ? playlistResponse.data[index].videos[k].likes : 0;
              if (!isNaN(parseInt(playlistResponse.data[index].videos[k].duration))) {
                durationCount = durationCount + parseInt(playlistResponse.data[index].videos[k].duration);
              }
              likesCount = likesCount + parseInt(likes);
              if (playlistResponse.data[index].videos[k].views != null && playlistResponse.data[index].videos[k].views != "") {
                viewsCount = viewsCount + parseInt(playlistResponse.data[index].videos[k].views);
              }
            }
            playlistResponse.data[index].allVideoLength = durationCount;
            playlistResponse.data[index].allVideoLikes = likesCount > 999 && likesCount < 1000000 ? (likesCount / 1000).toFixed(1) + "K" : likesCount > 1000000 ? (likesCount / 1000000).toFixed(1) + "M" : likesCount;
            playlistResponse.data[index].allVideoViews = viewsCount > 999 && viewsCount < 1000000 ? (viewsCount / 1000).toFixed(1) + "K" : viewsCount > 1000000 ? (viewsCount / 1000000).toFixed(1) + "M" : viewsCount;
            playlistResponse.data[index].id = index + 1;
            setallPlaylistData(playlistResponse.data);
            console.log(playlistResponse.data);
          }
        } else {
          setallPlaylistData([]);
        }
      });
    //});
  };
  const deleteMultiplePlaylist = () => {
    if (DeleteId.length == 0) {
      toast.warning("Please Select Playlist to Delete");
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
              "/manageplaylist/deleteMultiplePlaylist",
              {
                ids: DeleteId,
              }
            )
            .then((res) => {
              toast.success("Delete Successfully", {});
              // callData();
              setSearchWord("");

            })
            .catch((err) => {
              console.log("err");
            });
        }
      });
    }
  };

  const setSelectedHomePlay = () => {
    if (DeleteId.length == 0) {
      toast.warning("Please Select Playlist to Set");
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL + "/manageplaylist/setSelectedHomePlay",
          {
            ids: DeleteId,
            locationStatus: "homePlay",
          }
        )
        .then((res) => {
          toast.success("Set To Home Page Successfully", {});
          // callData();
        })
        .catch((err) => {
          console.log("err");
        });
    }
  };

  const setSelectedRandomPool = (status) => {
    if (DeleteId.length == 0) {
      toast.warning("Please Select Playlist to Set");
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL + "/manageplaylist/setSelectedRandomPool",
          {
            ids: DeleteId,
            locationStatus: status,
          }
        )
        .then((res) => {
          toast.success("Set To Random Pool Successfully", {});
          // callData();
          setSearchWord("");
        })
        .catch((err) => {
          console.log("err");
        });
    }
  };


  const clearSelectedPool = () => {
    if (DeleteId.length == 0) {
      toast.warning("Please Select Playlist to Set");
    } else {
      axios
        .post(
          process.env.REACT_APP_API_URL + "/manageplaylist/setSelectedRandomPool",
          {
            ids: DeleteId,
            locationStatus: "",
          }
        )
        .then((res) => {
          toast.success("Set To Random Pool Successfully", {});
          // callData();
          setSearchWord("");
        })
        .catch((err) => {
          console.log("err");
        });
    }
  };

  for (let index = 0; index < allPlaylistData.length; index++) {
    var i = [];
    allPlaylistData[index].videos.forEach(element => {
      delete element.__v;
      delete element.MorelocationStatus;
      delete element.RandomlocationStatus;
      delete element.createdAt;
      delete element.updatedAt;
      delete element.likes;
      delete element._id;
      delete element.likes_by
      delete element.keywords
      delete element.location
      delete element.locationStatus
      delete element.user_id
      delete element.playlist_id
      i.push(element);
      allPlaylistData[index].csvVideos = i;
    });
  }

  const columns = [
    {
      id: 1,
      name: "USER",
      selector: (row) => row.user_,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "PLAYLIST NAME",
      selector: (row) => row.title,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "TITLE",
      selector: (row) => (
        <>
          {row.videos.length == 0 ? (
            <div className="w-100" style={{ height: "100%" }}>
              <img
                src="assets/images/default-thumbnail.png"
                className="img-fluid"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ) : (
            ""
          )}
          {row.videos.length == 1 ? (
            <div
              className="w-100"
              style={{ height: "100%", background: "#fff" }}
            >
              <img
                src={row.videos[0].thumbnail.includes(".mp4") || row.videos[0].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[0].thumbnail}
                className="img-fluid"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ) : (
            ""
          )}
          {row.videos.length == 2 ? (
            <div className="row">
              <div className="col-6 p-0">
                <img
                  src={row.videos[0].thumbnail.includes(".mp4") || row.videos[0].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[0].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[1].thumbnail.includes(".mp4") || row.videos[1].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[1].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {row.videos.length == 3 ? (
            <div className="row mt-3">
              <div className="col-6 p-0">
                <img
                  src={row.videos[0].thumbnail.includes(".mp4") || row.videos[0].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[0].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[1].thumbnail.includes(".mp4") || row.videos[1].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[1].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[2].thumbnail.includes(".mp4") || row.videos[2].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[2].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src="https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg"
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {row.videos.length >= 4 ? (
            <div className="row mt-2">
              <div className="col-6 p-0">
                <img
                  src={row.videos[0].thumbnail.includes(".mp4") || row.videos[0].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[0].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px", height: "50px" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[1].thumbnail.includes(".mp4") || row.videos[1].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[1].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[2].thumbnail.includes(".mp4") || row.videos[2].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[2].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[3].thumbnail.includes(".mp4") || row.videos[3].thumbnail.includes(".mov") ? ("https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg") : row.videos[3].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%", height: "50px" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "PLAYS",
      selector: (row) => (
        <>{row.videos[0] ? row.allVideoViews : ""}</>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "LENGTH",
      selector: (row) => (
        <>{moment.utc(row.allVideoLength * 1000).format("HH:mm:ss")}</>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "Pool Status",
      selector: (row) => (
        <>
          {row.locationStatus == "morePool" ? "More Pool" : row.locationStatus == "randomPool" ? "Random Pool" : row.locationStatus == "homePlay" ? "Home play" : "Not Set"}
        </>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 7,
      name: "URL",
      selector: (row) => (
        <>
          <div className="row mt-2">
            <div className="col">
              <textarea value={"http://190.92.153.226:3000/playlist?id=" + row._id} readOnly cols="21" rows="4">
                {/* {"http://190.92.153.226:3000/playlist?id=" + row._id} */}
              </textarea>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col">
              <button className="btn backgroundButton border-white" style={{ width: "100%" }} >
                <i style={{ color: "white", fontSize: "1rem" }}></i>
                {row.csvVideos != undefined ? (<CSVLink data={row.csvVideos} download={row.title} >SAVE CSV</CSVLink>) : ("")}

              </button>
            </div>
          </div>
        </>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 8,
      name: "",
      cell: (row) => (
        <>
          <div className="row">
            <div className="col mb-2">
              <button
                className="btn backgroundButton border-white"
                style={{ width: "140px" }}
              >
                <i style={{ color: "white", fontSize: "1rem" }}>CSV REPLACE</i>
              </button>
            </div>
            <input
              style={{
                opacity: "0",
                zIndex: "1",
                position: "absolute",
                width: "86%",
              }}
              accept=".csv"
              onChange={(e) => {
                uploadFile(e, row._id);
                // setUpdateId(row._id);
              }}
              type="file"
              className="form-control"
            />
            <div className="col mb-2">
              <button
                onClick={() => {
                  setuser(row.user);
                  setPlayListName(row.title);
                  setUpdateId(row._id);
                  handlePlaylistModelShow("update");
                }}
                className="btn backgroundButton border-white"
                style={{ width: "140px" }}
              >
                <i style={{ color: "white", fontSize: "1rem" }}>RENAME</i>
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  const handlePlaylistModelClose = () => SetaddPlayListModelshow(false);
  const [addPlayListModelshow, SetaddPlayListModelshow] = useState(false);
  const [updatePlaylistId, setUpdateId] = useState("");

  const handlePlaylistModelShow = (opr) => {
    SetaddPlayListModelshow(true);
    setOpration(opr);
    if (opr == "add") setPlayListName("");
  };
  const [uploadProfileLoader, setUploadProfileLoader] = useState(false);
  const uploadFile = (event, id) => {
    setUploadProfileLoader(true);
    const formdata = new FormData();
    formdata.append("avtar", event.target.files[0]);
    if (id) {
      formdata.append("playlist_id", id);
    }
    formdata.append(
      "userId",
      JSON.parse(sessionStorage.getItem("userDetails")).user_id
    );
    axios
      .post(
        process.env.REACT_APP_API_URL + "/playlist/importCsv",
        formdata,
        { userId: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("File Imported Successfully", {});
        // callData();
        setSearchWord("");

      })
      .catch((err) => {
        toast.error("Invalid Format", {});
        console.log(err);
      });
  };



  return (
    <>
      <div className="card radius-10" style={{ width: "100%", margin: "auto" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
          <div
            style={{ borderRadius: "15px 15px 0px 0px" }}
            className="card-body cardHeader"
          >
            <h5 style={{ marginTop: "-10px" }}>Manage Playlists</h5>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
          <div className="card-body" style={{ height: "auto" }}>
            <div className="row">
              <div className="col-md-4 ">
                <div className=" card-body cardColumn">
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      <input
                        className="InputBox"
                        type="text"
                        placeholder="SEARCH PLAYLIST OR USER"
                        onChange={(e) => {
                          setSearchWord(e.target.value);
                          SetsearchTerm(e.target.value);
                        }}
                        id="search"
                      />
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
                      {showAllPlaylist ? "SHOW" : "HIDE"} ALL PLAYLISTS A-Z
                    </h6>
                  </div>
                </div>
              </div>
              <div onClick={deleteMultiplePlaylist} className="col-md-4 ">
                <div className=" card-body cardColumn">
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      DELETE SELECTED PLAYLIST
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div
                onClick={(event) => {
                  setSelectedRandomPool("randomPool");
                }}
                className="col-md-4 "
              >
                <div className=" card-body cardColumn">
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      ADD TO "RANDOM" POOL
                    </h6>
                  </div>
                </div>
              </div>
              <div
                onClick={(event) => {
                  setSelectedRandomPool("morePool");
                }}
                className="col-md-4 "
              >
                <div className=" card-body cardColumn">
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      ADD TO "MORE" POOL
                    </h6>
                  </div>
                </div>
              </div>
              <div
                onClick={(event) => {
                  setSelectedRandomPool("homePlay");
                }}
                className="col-md-4 "
              >
                <div className=" card-body cardColumn">
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      SET SELECTED TO HOME PLAY
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div
                onClick={() => {
                  clearSelectedPool();
                }}
                className="col-md-4 "
              >
                <div className=" card-body cardColumn">
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      CLEAR CURRENT POOL
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
                data={allPlaylistData}
                // data={allPlaylistData.filter((items) => {
                //   if (searchTerm == "") {
                //     return items;
                //   } else if (
                //     items.title.toLowerCase().includes(searchTerm.toLowerCase()) || items.user_ && items.user_.toLowerCase().includes(searchTerm.toLowerCase())
                //   ) {
                //     return items;
                //   }
                // })}
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
      {/* Add Data Model */}
      <Modal show={addPlayListModelshow} onHide={handlePlaylistModelClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {opration == "add" ? "Add Playlist" : "Edit Playlist"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label text-white">Title</label>
              <div className="input-group" id="show_hide_password">
                <input
                  value={playListName != "" ? playListName : ""}
                  onChange={(e) => setPlayListName(e.target.value)}
                  type="text"
                  className="form-control border-end-0"
                  id="inputChoosePassword"
                  placeholder="Enter Playlist Title"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePlaylistModelClose}>
            Close
          </Button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              submitPlaylistData();
              handlePlaylistModelClose();
            }}
          >
            {opration == "add" ? "Add" : "Update"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Manageplaylist;
