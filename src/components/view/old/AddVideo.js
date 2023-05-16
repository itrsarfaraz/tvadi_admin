import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/style.css';
import swal from 'sweetalert';
import Modal from "react-bootstrap/Modal";
import { SnackbarProvider, useSnackbar } from "notistack";


const axios = require('axios');

function AddVideo() {

  const { enqueueSnackbar } = useSnackbar();


  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };




  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  Featch All Data
  const [allVideoData, setallVideoData] = useState([]);
  function callData() {
    axios.get(process.env.REACT_APP_API_URL + "/playlist_video/getAlldata").then((response) => {
      setallVideoData(response.data);
    });
  }
  window.addEventListener('load', (event) => {
    callData();
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  //  console.log("hello"+ process.env.REACT_APP_API_URL);


  function submitAddVideoForm(data) {
         axios.post(process.env.REACT_APP_API_URL + '/playlist_video/add', {
            title: data['title'],
            url: data['url'],
            views: data['views'],
            posted_date: data['posted_date'],
            duration: data['duration'],
            channel_name: data['channel_name'],
            channel_url: data['channel_url'],
            thumbnail: data['thumbnail'],
            description: data['description'],
            embeded_code: data['embeded_code'],
            category: data['category'],
            plays_at: data['plays_at'],
            captions: data['captions']
      }).then((res)=>{
         enqueueSnackbar("Video Added Successfuly","success");
      }).catch((err) => {
         enqueueSnackbar("err.title","error");
      });
      // .then((res) => {
      //   swal({
      //     text: res.data.title,
      //     icon: "success",
      //     type: "success"
      //   }).then(function () {
      //     callData();
      //     setShow(false);
      //   });
      // }).catch((err) => {
      //     swal({
      //       text: err.response.data.errorMessage,
      //       icon: "error",
      //       type: "error"
      //     });
      // });
  }
  return (
    <>

      <button onClick={handleClickVariant('success')}>Helllo Hi</button>
      {/* Add Video Model */}
      <div className='row'>
        <div style={{ position: 'relative' }} className='col-12 text-right'>
          <button onClick={handleShow} style={{ position: 'absolute', right: '0.9%' }} type="button" className="btn btn-light float-right" >Add Video</button>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div class="col">
        <div class="card p-3" style={{ overflow: 'auto' }}>
          <table id="DataTable" className="table table-striped" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Url</th>
                <th>Views</th>
                <th>Duration</th>
                <th>Posted date</th>
                <th>Channel Name</th>
              </tr>
            </thead>
            <tbody>
              {
                allVideoData.map((value, index) => {
                  return (
                    <tr>
                      <td>{index}</td>
                      <td>{value.title}</td>
                      <td>{value.url}</td>
                      <td>{value.views}</td>
                      <td>{value.duration}</td>
                      <td>{value.posted_date}</td>
                      <td>{value.channel_name}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      {/* model */}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-body p-5">
              <form className="row g-3" onSubmit={handleSubmit(submitAddVideoForm)}>
                <div className="col-md-6">
                  <label className="form-label">Video Title</label>
                  <div className="input-group">
                    <input {...register("title", { required: "This is Required" })} id="title" type="text" className="form-control" placeholder="Video Title" />
                  </div>
                  <p className='text-danger'>{errors.title?.message}</p>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Video Url</label>
                  <div className="input-group">
                    <input {...register("url", { required: "This is Required" })} id="url" type="text" className="form-control" placeholder="Video Url" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">views</label>
                  <div className="input-group">
                    <input {...register("views", { required: "This is Required" })} type="text" className="form-control" id="views" placeholder="Views" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">Posted Date</label>
                  <div className="input-group">
                    <input {...register("posted_date", { required: "This is Required" })} type="date" className="form-control" id="posted_date" placeholder="Posted Date" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">Duration</label>
                  <div className="input-group">
                    <input {...register("duration", { required: "This is Required" })} type="time" className="form-control" id="duration" placeholder="Duration" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">Channel Name</label>
                  <div className="input-group">
                    <input {...register("channel_name", { required: "This is Required" })} type="text" className="form-control" id="channel_name" placeholder="Channel Name" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">Channel Url</label>
                  <div className="input-group">
                    <input {...register("channel_url", { required: "This is Required" })} type="text" className="form-control" id="channel_url" placeholder="Channel Url" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">Thumbnail</label>
                  <div className="input-group">
                    <input {...register("thumbnail", { required: "This is Required" })} type="text" className="form-control" id="thumbnail" placeholder="Thumbnail Url" />
                  </div>
                </div>
                <div className="col-6">
                  <label className="form-label">Description</label>
                  <textarea {...register("description", { required: "This is Required" })} className="form-control" id="description" placeholder="Description" rows="2"></textarea>
                </div>
                <div className="col-6">
                  <label className="form-label">Embeded Code</label>
                  <textarea {...register("embeded_code", { required: "This is Required" })} className="form-control" id="embeded_code" placeholder="Embeded Code" rows="2"></textarea>
                </div>
                <div className="col-4">
                  <label className="form-label">Category</label>
                  <div className="input-group">
                    <input {...register("category", { required: "This is Required" })} type="text" className="form-control" id="category" placeholder="Category" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">Plays At</label>
                  <div className="input-group">
                    <input {...register("plays_at", { required: "This is Required" })} type="text" className="form-control" id="plays_at" placeholder="Plays At" />
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label">Captions</label>
                  <div className="input-group">
                    <input {...register("captions", { required: "This is Required" })} type="text" className="form-control" id="captions" placeholder="Captions" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck2" />
                    <label className="form-check-label" >Check me out</label>
                  </div>
                </div>
                <Modal.Footer>
                  <button type="button" onClick={handleClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-light">Save changes</button>
                </Modal.Footer>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default AddVideo

