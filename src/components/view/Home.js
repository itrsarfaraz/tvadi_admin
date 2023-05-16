import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
const axios = require("axios");

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [addUsershow, SetaddUserModelshow] = useState(false);
  const [detailModal, SetdetailModal] = useState(false);
  const [PlaylistDataForModal, setPlaylistDataForModal] = useState([]);
  const [SectionId, setSectionId] = useState([]);


  const [Opr, setOpr] = useState(false);
  const handleUserModelShow = (opr) => {
    callData();
    setPosition(opr);
    SetaddUserModelshow(true);
    setUrl("");
  };

  const showDetails = (opr) => {
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData", {
        headers: { Token: token },
      })
      .then((response) => {
        axios
          .get(process.env.REACT_APP_API_URL + "/homecontrol/getAlldata", {
            headers: { Token: token },
          }).then((res) => {
            res.data.forEach(element => {
              if (opr == element.position) {
                setSectionId(element._id);
                for (let index = 0; index < response.data.length; index++) {
                  if (response.data[index]._id == element.url.split("id=")[1]) {
                    setPlaylistDataForModal(response.data[index]);
                  }
                }
              }
            });
          })
      });
    setOpr(opr);
    SetdetailModal(true);

  };
  const handleUserClose = () => SetaddUserModelshow(false);
  const handleUserClose1 = () => {
    SetdetailModal(false);
    setPlaylistDataForModal([])
  }
  const [Url, setUrl] = useState("");
  const [Position, setPosition] = useState("");
  const [Mark, setMark] = useState([]);


  //Get Channel Data From youtube


  const callData = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/homecontrol/getAlldata", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          if (Position == response.data[index].position)
            setUrl(response.data[index].url);
        }
      });
  }

  useEffect(() => {
    const position = [];
    axios
      .get(process.env.REACT_APP_API_URL + "/homecontrol/getAlldata", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          // setUrl(response.data[index].url);
          setUrl(response.data[index].url);

          position.push(response.data[index].position);
          setMark(position);
        }
      });
    callData();
  }, [SectionId, Position]);
  const submitUserData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/homecontrol/add", {
        url: Url,
        position: Position,
      })
      .then((res) => {
        handleUserClose();
        callData();

        toast.success("Added Successfully", {});
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

  const clearPlaylist = (id) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/homecontrol/clear",
        {
          playlistId: id,
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success("Reset Success");
        handleUserClose1();
        callData();
      })
      .catch((err) => {
        console.log("err");
        toast.danger("Something went wrong");
      });
  }


  return (
    <>
      <div className="card radius-10" style={{ width: "90%", margin: "auto" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
          <div
            style={{ borderRadius: "15px 15px 0px 0px" }}
            className="card-body cardHeader"
          >
            <h5 style={{ marginTop: "-10px" }}>Home Setup</h5>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
          <div className="card-body" style={{ minHeight: "400px" }}>
            <div className="row">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel1") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel1") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 1 paste playlist url
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel1") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-none">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel1") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel1") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 1
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel1") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel1") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel1") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 1
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel1") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("todayTopclip") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("todayTopclip") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Todays Playlist
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("todayTopclip") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel2") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel2") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 2
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel2") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel2") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel2") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 2
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel2") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("supermusic") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("supermusic") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Discover Music
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("supermusic") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel3") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel3") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 3
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel3") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel3") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel3") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 3
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel3") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 "></div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel4") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel4") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 4
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel4") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel4") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel4") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 4
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel4") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending1") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending1") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 1
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending1") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel5") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel5") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 5
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel5") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel5") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel5") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 5
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel5") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending2") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending2") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 2
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending2") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel6") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel6") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 6
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel6") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel6") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel6") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 6
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel6") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending3") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending3") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 3
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending3") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel7") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel7") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 7
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel7") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel7") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel7") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 7
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel7") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending4") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending4") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 4
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending4") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel8") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel8") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 8
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel8") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel8") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel8") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 8
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel8") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending5") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending5") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 5
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending5") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel9") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel9") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 9
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel9") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel9") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel9") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 9
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel9") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending6") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending6") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 6
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending6") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>



            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel10") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel10") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 10
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel10") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("topchannel10") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("topchannel10") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Top Channel 10
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("topchannel10") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending7") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending7") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 7
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending7") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel11") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel11") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 11
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel11") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore1") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore1") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 1
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore1") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending8") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending8") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 8
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending8") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>



            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel12") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel12") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 12
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel12") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore2") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore2") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 2
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore2") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending9") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending9") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 9
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending9") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>



            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel13") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel13") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 13
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel13") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore3") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore3") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 3
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore3") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("trending10") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("trending10") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Trending 10
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("trending10") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel14") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel14") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 14
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel14") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore4") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore4") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 4
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore4") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured1") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured1") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 1
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured1") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel15") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel15") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 15
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel15") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore5") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore5") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 5
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore5") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured2") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured2") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 2
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured2") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel16") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel16") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 16
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel16") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore6") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore6") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 6
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore6") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured3") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured3") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 3
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured3") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel17") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel17") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 17
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel17") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore7") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore7") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 7
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore7") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured4") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured4") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 4
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured4") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel18") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel18") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 18
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel18") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore8") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore8") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 8
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore8") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured5") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured5") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 5
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured5") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel19") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel19") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 19
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel19") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore9") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore9") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 9
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore9") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured6") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured6") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 6
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured6") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("channel20") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("channel20") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Channel 20
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("channel20") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("explore10") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("explore10") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        Explore 10
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("explore10") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured7") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured7") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 7
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured7") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div
                  className=" card-body cardColumn"
                >
                  <div className="text-white">

                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  className=" card-body cardColumn"
                >
                  <div className="text-white">

                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured8") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <>
                      <div className="text-white">
                        <h6 style={{ marginTop: "-8px" }} className="">
                          {Mark.indexOf("featured8") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                          featured 8
                        </h6>
                      </div>
                    </>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured8") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div
                  className=" card-body cardColumn"
                >
                  <div className="text-white">

                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  className=" card-body cardColumn"
                >
                  <div className="text-white">

                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured9") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured9") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 9
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured9") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-3">
              <div className="col-md-4 ">
                <div
                  className=" card-body cardColumn"
                >
                  <div className="text-white">

                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  className=" card-body cardColumn"
                >
                  <div className="text-white">

                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className="row">
                  <div
                    onClick={() => { handleUserModelShow("featured10") }}
                    className="col-md-10 card-body cardColumn"
                  >
                    <div className="text-white">
                      <h6 style={{ marginTop: "-8px" }} className="">
                        {Mark.indexOf("featured10") >= 0 ? (<><i className="bi bi-circle-fill text-success"></i>&nbsp;</>) : (<><i className="bi bi-circle-fill text-danger"></i>&nbsp;</>)}
                        featured 10
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button onClick={() => { showDetails("featured10") }} className="btn-sm backgroundButton text-white"><i className="bi bi-arrow-up"></i></button>
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>

      <Modal show={addUsershow} onHide={handleUserClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <label className="form-label text-white">URL</label>
              <div className="input-group" id="show_hide_password">
                <input
                  onChange={(e) => setUrl(e.target.value)}
                  type="text"
                  // value={"https://www.youtube.com/channel/"+Url}
                  className="form-control border-end-0"
                  id="inputChoosePassword"
                  placeholder="Enter Playlist URL"
                />
              </div>
            </div>
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
            Add
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={detailModal} onHide={handleUserClose1}>
        <Modal.Header closeButton>
          <Modal.Title>URL Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-12">
              <div className="row">
                <div className="col-4"><h5>Playlist Title :</h5></div>
                <div className="col-6"><h6>{PlaylistDataForModal.length != 0 ? PlaylistDataForModal.title : "Not Found"}</h6></div>
              </div>
              <div className="row mt-2">
                <div className="col-4"><h5>Total Videos :</h5></div>
                <div className="col-6"><h6>{PlaylistDataForModal.length != 0 ? PlaylistDataForModal.videos ? PlaylistDataForModal.videos.length : ("") : "Not Found"}</h6></div>
              </div>
              <div className="row">
                <div className="col-4"><h5>Playlist Url :</h5></div>
                <div className="col-6"><h6>{`http://190.92.153.226:3000/playlist?id=${PlaylistDataForModal._id}`}</h6></div>
              </div>
              <div className="row mt-2">
                <div className="col-4"><h5>Thumbnail :</h5></div>
                <div className="col-6">{PlaylistDataForModal.length != 0 ? PlaylistDataForModal.videos ? (<><img src={PlaylistDataForModal.videos[0].thumbnail} alt="" width={100} /></>) : ("") : "Not Found"}</div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="d-flex justify-content-start" variant="danger" onClick={(e) => {
            clearPlaylist(SectionId);
          }}>
            Clear
          </Button>
          <Button variant="secondary" onClick={handleUserClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
