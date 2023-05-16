import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
const axios = require("axios");

function Home() {
  const token = localStorage.getItem("token");
  const YoutubeApiKey = "AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0";
  const navigate = useNavigate();

  const [addUsershow, SetaddUserModelshow] = useState(false);
  const handleUserModelShow = (opr) => {
    callData();
    setPosition(opr);
    SetaddUserModelshow(true);
    setUrl("");
  };
  const handleUserClose = () => SetaddUserModelshow(false);
  const [Url, setUrl] = useState("");
  const [Position, setPosition] = useState("");
  const [Title, SetTitle] = useState("");


  //Get Channel Data From youtube

   const callData = () =>
   {
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
  const submitUserData = () => {
    axios
  .get(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=`+Url+`&key=` +
      YoutubeApiKey
  )
  .then((res) => {
    // console.log(res.data.items);
    // console.log(res.data);
    // for (let index = 0; index < res.data.items.length; index++) {
    //   var newListArray = {
    //     title: res.data.items[index].snippet.title,
    //     url: `https://www.youtube.com/watch?v=` + res.data.items[index].contentDetails.videoId,
    //     posted_date: res.data.items[index].snippet.publishedAt,
    //     channel_name: res.data.items[index].snippet.channelTitle,
    //     channel_url:
    //       `https://www.youtube.com/channel/` +
    //       res.data.items[index].snippet.channelId,
    //     description: res.data.items[index].snippet.description,
    //     embeded_code: res.data.items[index].contentDetails.videoId,
    //     location: null,
    //     plays_at: null,
    //   };
    //   console.log(newListArray);
    // console.log(res.data.items);
    SetTitle(res.data.items[0].snippet.title);
    // }
  });

  if(!Url.indexOf('https://www.youtube.com/channel/')){

    axios
      .post(process.env.REACT_APP_API_URL + "/homecontrol/add", {
        url: Url.split('channel/')[1],
        position: Position,
        title:Title,
      })
      .then((res) => {
        handleUserClose();

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
    }
    else{
      alert("Please Enter a Valid Url");
    }
  };

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
                <div
                  onClick={() => {handleUserModelShow("channel1")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Channel 1 paste playlist url to set
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-none">
                <div
                  onClick={() => {handleUserModelShow("channel1")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Channel 1 paste playlist url to sett
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("topchannel1")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Top Channel 1
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("todayTopclip")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Todays Top Clips
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("channel2")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Channel 2
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("topchannel2")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Top Channel 2
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("supermusic")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Super Music
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("channel3")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Channel 3
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("topchannel3")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Top Channel 3
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 "></div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("channel4")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Channel 4
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("topchannel4")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Top Channel 4
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("trending1")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Trending 1
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("channel5")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Channel 5
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("explore1")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Explore 1
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("trending2")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Trending 2
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 "></div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("explore2")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Explore 2
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("trending3")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Trending 3
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 "></div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("explore3")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Explore 3
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("trending4")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Trending 4
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-4 "></div>
              <div className="col-md-4 ">
                <div
                  onClick={() => {handleUserModelShow("explore4")}}
                  className=" card-body cardColumn"
                >
                  <div className="text-white">
                    <h6 style={{ marginTop: "-8px" }} className="">
                      Explore 4
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4 "></div>
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
    </>
  );
}

export default Home;
