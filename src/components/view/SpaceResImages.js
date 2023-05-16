import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { toast } from "react-toastify";

const axios = require("axios");
toast.configure();

function SpaceResImages() {
  const token = localStorage.getItem("token");
  // Featch All Data
  const [allData, setallData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getResspaceData", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          setallData(response.data);
        }
      });
  }, []);
  const [showDiv, setShowDiv] = useState("Home");
  const [uploadProfileLoader, setUploadProfileLoader] = useState(false);
  const uploadFile = (event) => {
    console.log(event);
    setUploadProfileLoader(true);

    const formdata = new FormData();
    formdata.append("avtar", event.target.files[0]);
    formdata.append("pagename", showDiv);
    formdata.append("imagelocation", 1);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile1 = (event) => {
    setUploadProfileLoader(true);

    const formdata1 = new FormData();
    formdata1.append("avtar", event.target.files[0]);
    formdata1.append("pagename", showDiv);
    formdata1.append("imagelocation", 2);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata1,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile2 = (event) => {
    setUploadProfileLoader(true);

    const formdata2 = new FormData();
    formdata2.append("avtar", event.target.files[0]);
    formdata2.append("pagename", showDiv);
    formdata2.append("imagelocation", 3);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata2,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile3 = (event) => {
    setUploadProfileLoader(true);

    const formdata3 = new FormData();
    formdata3.append("avtar", event.target.files[0]);
    formdata3.append("pagename", showDiv);
    formdata3.append("imagelocation", 4);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata3,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile4 = (event) => {
    
    setUploadProfileLoader(true);

    const formdata4 = new FormData();
    formdata4.append("avtar", event.target.files[0]);
    formdata4.append("pagename", showDiv);
    formdata4.append("imagelocation", 5);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata4,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile5 = (event) => {
    setUploadProfileLoader(true);

    const formdata5 = new FormData();
    formdata5.append("avtar", event.target.files[0]);
    formdata5.append("pagename", showDiv);
    formdata5.append("imagelocation", 6);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata5,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile6 = (event) => {
    setUploadProfileLoader(true);

    const formdata5 = new FormData();
    formdata5.append("avtar", event.target.files[0]);
    formdata5.append("pagename", showDiv);
    formdata5.append("imagelocation", 7);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata5,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile7 = (event) => {
    setUploadProfileLoader(true);

    const formdata5 = new FormData();
    formdata5.append("avtar", event.target.files[0]);
    formdata5.append("pagename", showDiv);
    formdata5.append("imagelocation", 8);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/user/updateResImage",
        formdata5,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="card radius-10" style={{ width: "90%", margin: "auto" }}>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
          <div
            style={{ borderRadius: "15px 15px 0px 0px" }}
            className="card-body cardHeader"
          >
            <h5 style={{ marginTop: "-10px" }}>Ad Pool</h5>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
          <div className="card-body" style={{ height: "auto" }}>
            <div className="p-3" style={{ overflow: "auto" }}>
              <div className="row">
                <div className="col-3">
                  <div className="input-group" id="show_hide_password">
                    <select
                      className="form-control"
                      onChange={(e) => setShowDiv(e.target.value)}
                      required
                    >
                      <option value="Home">Home</option>
                      <option value="Playlist">Playlist</option>
                      <option value="Profile">Profile</option>
                    </select>
                  </div>
                </div>
              </div>
              <br />
              <br />

              {/* Home Section */}
              {showDiv == "Home" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-7 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[0] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[0].resimage &&
                              allData[0].imagelocation == 1 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[0].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div className="pt-2">
                        <h6>Main Player Banner </h6>
                      </div>
                    </div>
                    <div
                      className="col-3 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile7(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[7] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[7].resimage &&
                              allData[7].imagelocation == 8 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[7].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div className="pt-2">
                        <h6>Square Ad</h6>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">

                  </div>
                  <div className="row mt-3">
                    <div
                      className="col-3 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile1(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[1] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[1].resimage &&
                              allData[1].imagelocation == 2 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[1].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div className="pt-2">
                        <h6>Home Reserved 1</h6>
                      </div>
                    </div>

                    <div
                      className="col-3 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile2(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[2] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[2].resimage &&
                              allData[2].imagelocation == 3 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[2].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div className="pt-2">
                        <h6>Home Reserved 2</h6>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div
                      className="col-3 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile3(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[3] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[3].resimage &&
                              allData[3].imagelocation == 4 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[3].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div className="pt-2">
                        <h6>Home Reserved 3</h6>
                      </div>
                    </div>

                    <div
                      className="col-3 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile4(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[4] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[4].resimage &&
                              allData[4].imagelocation == 5 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[4].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div className="pt-2">
                        <h6>Home Reserved 4</h6>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* End Home Section */}

              {/* Playlist Section */}
              {showDiv == "Playlist" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-9 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile5(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[5] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[5].resimage &&
                              allData[5].imagelocation == 6 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[5].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div>
                        <h6>User Reserved 1 </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-3 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile6(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[6] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[6].resimage &&
                              allData[6].imagelocation == 7 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[6].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div>
                        <h6>Main Player Square </h6>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* End Playlist Section */}

              {/* Profile Section  */}
              {showDiv == "Profile" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-3 transparent UserImgBox"
                      item
                      xs={12}
                      md={4}
                      style={{ position: "relative" }}
                    >
                      <form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        style={{ opacity: "0" }}
                      >
                        <input
                          onChange={(e) => uploadFile7(e)}
                          style={{
                            position: "absolute",
                            top: "0",
                            opacity: "0",
                            height: "100%",
                          }}
                          type="file"
                          name=""
                          id="input_file"
                          accept=".jpg,.webp,.jfif,.jpeg,.png,.gif"
                          className="form-control"
                          value=""
                        />
                      </form>
                      <div className="UserImg">
                        {allData[7] ? (
                          <div>
                            {allData.length != 0 &&
                              allData[7].resimage &&
                              allData[7].imagelocation == 8 ? (
                              <img
                                id="proFileImage"
                                src={
                                  "assets/images/reserved/" +
                                  allData[7].resimage
                                }
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            ) : (
                              <img
                                id="proFileImage"
                                src={require("../../images/default.jpg")}
                                className="img-fluid"
                                alt=""
                                style={{ height: "120px" }}
                              />
                            )}
                          </div>
                        ) : (
                          <img
                            id="proFileImage"
                            src={require("../../images/default.jpg")}
                            className="img-fluid"
                            alt=""
                            style={{ height: "120px" }}
                          />
                        )}
                      </div>
                      <div>
                        <h6>Profile User Reserved</h6>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Profile Section  */}
    </>
  );
}

export default SpaceResImages;
