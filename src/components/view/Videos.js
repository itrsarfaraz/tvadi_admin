import React, { useEffect, useRef , useState } from 'react'
import { toast } from 'react-toastify';
import '../../css/style.css';
// Import Icons
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import 'react-toastify/dist/ReactToastify.css';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardHeader, MDBCardFooter, MDBCardText } from 'mdb-react-ui-kit';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from "react-bootstrap/Modal";
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


// Axios
const axios = require('axios');
toast.configure();
// Main From
const Videos = () => {
    const [loading, setLoading] = useState(false);
    const [allPlayListData, setallPlayListData] = useState([]);
    const [allVideoData, setAllVideoAcout] = useState([]);
    useEffect(() => {
        //  Coustm Style Sylesheet
        setLoading(false);
        document.getElementsByClassName('page-content')[0].style.padding = "0px";
        CallVideosData();

    }, [])
    useEffect(() => {
        if (!loading) {
            if (allVideoData == 0)
                setLoading(false)
            else {
                setLoading(true)
                return;
            }
        }
    });
    function CallVideosData() {
        //  Get All Data of PlayList
        axios.get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata").then((response) => { setallPlayListData(response.data); });
        // Get All Videos Data
        axios.get(process.env.REACT_APP_API_URL + "/playlist_video/getAlldata").then((response) => { setAllVideoAcout(response.data); });
    }
    // Share model
    const [open, setOpen] = React.useState(false);
    const [shareCode, setShareCode] = React.useState("");
    const handleClickOpen = (code) => { setShareCode(code); setOpen(true); };
    const handleClose = () => { setOpen(false); };
  
    // Youtube Play Video
    const [videoUrl, setVideoUrl] = useState('');
    const [VideoViews, setViwes] = useState('');
    const [videoTitle, setTitle] = useState('');
    const [videoStart, setVideoStart] = useState(true);

    const SetvideoInfo = (url, views, title, embeded_code) => {
        let UslIs = url;
        let paramString = UslIs.split('?')[1];
        let queryString = new URLSearchParams(paramString);
        for (let pair of queryString.entries()) {
            setVideoUrl(pair[1]);
        }
        setViwes(views);
        setTitle(title);
        setVideoStart(true);
    }
    //  Add video
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showAddVideo, setAddVideoShow] = useState(false);
    const handleAddVideoShow = () => setAddVideoShow(true);
    const handleAddVideoClose = () => setAddVideoShow(false);

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
        }).then((res) => {
            toast.success("Added Successfully", {});
        }).catch((err) => {
            toast.error(err.response.data.errorMessage, {});
        });
        setAddVideoShow(false);
        CallVideosData();
    }
    //  Delete Video Data
    const DeleteVideoData = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.post(process.env.REACT_APP_API_URL + '/playlist_video/delete', { ids: id }).then((res) => {
                    toast.success("Delete Successfully", {});
                    CallVideosData();
                }).catch((err) => {
                    if (err.response && err.response.data && err.response.data.errorMessage) {
                        toast.error(err.response.data.errorMessage, {});
                    }
                });
            }
        });
    }
    //  New Add in playlist

      // Add Playlist Model
      const [AddPlayListVideo, setAddPlayListVideo] = React.useState("");
      //  Add Playlist Open Model and Set Value
      const handlePlayListClickOpen = (value) =>
      {
          setAddPlayListVideo(value);
      };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const SetNewPalylistData = [];
    allPlayListData.map((val, index) => 
    {
        SetNewPalylistData[index] = { title: val.title, id: val._id };
    })
    var getNewPlaylistData = [];
    const setGetNewPlaylistDataFun = (val) => {
        getNewPlaylistData = [];
        for (let i = 0; i < val.length; i++) {
            getNewPlaylistData[i] = val[i].id;
        }
    }

    const SubmitNewPlaylistData = () =>
     {

        for (let i = 0; i < getNewPlaylistData.length; i++) {
            axios.post(process.env.REACT_APP_API_URL + '/addvideoplaylist/add', { playlist: getNewPlaylistData[i], video: AddPlayListVideo }).then((res) => {

                if (res.data.status == false) {
                    toast.error(res.data.title, {});
                }
                else {
                    toast.success(res.data.title, {});
                }
                console.log(res)
            }).catch((err) => {
                if (err.response && err.response.data && err.response.data.errorMessage) {
                    toast.error(err.response.data.errorMessage, {});
                }
            });
        }
        document.getElementsByClassName('MuiAutocomplete-clearIndicator')[0].click()
    }
    // copy Embed Code
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  function copyToClipboard(e) { textAreaRef.current.select(); document.execCommand('copy'); e.target.focus(); setCopySuccess('Copied!'); };
    return (
        <div className="card nameChips p-2 px-2" style={{ overflow: 'auto' }}>
            {/* <div className='row'>
                <div style={{ position: 'relative' }} className='col-12 text-right'>
                    <br />
                    <button onClick={handleAddVideoShow} style={{ position: 'absolute', right: '2.7%' }} type="button" className="btn btn-light float-right" >Add Video</button>
                    <br />
                </div>
            </div> */}
            <Divider style={{ marginTop: '5px' }}>
                <Chip label="Videos" style={{ padding: '0', margin: '10px', color: '#fff' }} />
            </Divider>
            <Grid container rowSpacing={1} sx={{ p: '15px' }} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                {
                    allVideoData.map((value, index) => {
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                <MDBCard style={{ width: 'auto' }}>
                                    {
                                        loading ? (
                                            <MDBCardHeader background='white' style={{ padding: '1rem 0.5rem', color: '#000', borderRadius: 0, display: 'flex' }}>
                                                <Avatar style={{ margin: 'auto' }}>A</Avatar>
                                                {/* <Avatar style={{ margin: 'auto' }}>{value.channel_name.slice(0, 1)}</Avatar> */}
                                                <div style={{ margin: 'auto', width: '80%' }}>{value.title.slice(0, 20) + ' ...'}</div></MDBCardHeader>
                                        ) :
                                            (
                                                <Skeleton sx={{ m: 2 }} animation="wave" variant="circular" width={40} height={40} />
                                            )
                                    }
                                    {
                                        value.thumbnail ? (loading ? (<MDBCardImage src={value.thumbnail} style={{ borderRadius: 0,height:'145px' }} alt='...' position='top' />) : (<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />)) : (loading ? (<MDBCardImage src='default.png' style={{ borderRadius: 0 , height:'145px' }} alt='...' position='top' />) : (<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />))
                                        
                                    }
                                    {
                                        loading ? (
                                            <MDBCardBody style={{ background: '#fff', color: '#000', height: '80px' }}>
                                                <MDBCardText className='px-0' style={{ padding: '0px' }}>
                                                    {
                                                        value.description?(
                                                            value.description.slice(0, 60) + ' ...'
                                                        ):
                                                        ("Discription : Not Set In This Video")
                                                    }
                                                </MDBCardText>
                                            </MDBCardBody>
                                        ) :
                                            (
                                                <div>
                                                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="40%" />
                                                </div>
                                            )
                                    }
                                    {
                                        loading ?
                                            (
                                                <MDBCardFooter className="p-0" style={{ borderRadius: 0 }} border='light'>
                                                    <ButtonGroup variant="text" aria-label="text button group" style={{ background: '#fff', width: '100%', borderRadius: 0 }}>
                                                        <Button data-bs-toggle="modal" data-bs-target="#videoPayerModel" onClick={(ev) => { SetvideoInfo(value.url, value.views, value.title) }} style={{ outline: 'none', border: 'none', borderRadius: '0', margin: 'auto', fontSize: '1.2rem', color: '#504c4c', fontSize: '22px' }}>
                                                            <i className="bi bi-play"></i>
                                                        </Button>
                                                        <Button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handlePlayListClickOpen(value._id)} style={{ outline: 'none', border: 'none', color: '#504c4c', borderRadius: '0', margin: 'auto', fontSize: '1.2rem' }}><i className="bi bi-list-check"></i></Button>
                                                        <Button onClick={() => handleClickOpen(value.embeded_code)} style={{ outline: 'none', border: 'none', color: '#504c4c', borderRadius: '0', margin: 'auto', fontSize: '1.2rem' }}>
                                                            <i className="bi bi-share"></i>
                                                        </Button>
                                                        <Button sx={{ outline: 'none' }} style={{ outline: 'none', border: 'none', color: '#504c4c', borderRadius: '0', margin: 'auto', fontSize: '1.2rem' }}><a style={{ color: '#504c4c' }} target="_blank" href={value.url}><i className="bi bi-youtube"></i></a></Button>
                                                        <Button onClick={() => DeleteVideoData(value._id)} style={{ outline: 'none', border: 'none', color: '#504c4c', borderRadius: '0', margin: 'auto', fontSize: '1.2rem' }}><i className="bi bi-trash"></i></Button>
                                                    </ButtonGroup>
                                                </MDBCardFooter>
                                            ) :
                                            (
                                                <div>
                                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                    <Skeleton animation="wave" height={10} width="80%" />
                                                </div>
                                            )
                                    }
                                </MDBCard>
                            </Grid>
                        )
                    })
                }
            </Grid>
            {/* Play Video Model */}
            <div id="videoPayerModel" className="modal">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{videoTitle}<br />{VideoViews}</h5>
                            <button onClick={() => setVideoStart(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            {
                                videoStart ?
                                    (
                                        <iframe width="100%" height="100%" src={"https://www.youtube.com/embed/" + videoUrl + "?autoplay=0"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    ) : ('')
                            }
                        </div>
                    </div>
                </div>
            </div>
            Share Model
            <Dialog  component="div" open={open} keepMounted onClose={handleClose}  aria-describedby="alert-dialog-slide-description">
                <DialogTitle component="span">{"Embed Code"}</DialogTitle>
                {/* <DialogContent component="div"><DialogContentText component="span" id="alert-dialog-slide-description">{shareCode}</DialogContentText></DialogContent> */}
                <DialogContent component="div"><form><textarea style={{width:'100%', height:'100px'}} className="embedTextArea" ref={textAreaRef} value={shareCode} /></form></DialogContent>

                <DialogActions component="div">{document.queryCommandSupported('copy') && <div><button className="btn btn-dark" onClick={copyToClipboard}>Copy</button> {copySuccess}</div>}<Button onClick={handleClose}>Close</Button></DialogActions>
            </Dialog>
            {/* Add Video  */}
            {/* Model */}
            <Modal size="lg" show={showAddVideo} onHide={handleAddVideoClose}>
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
                                    <button type="button" onClick={handleAddVideoClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-light">Save changes</button>
                                </Modal.Footer>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* New Model Add video in playlist  */}

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Select Playlist</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Autocomplete   
                                 onChange={(event, value) => { setGetNewPlaylistDataFun(value) }} 
                                 multiple 
                                 limitTags={2}
                                 id="checkboxes-tags-demo"
                                 options={SetNewPalylistData} 
                                 disableCloseOnSelect 
                                 getOptionLabel={(option) => option.title} 
                                 renderOption={(props, option, { selected }) =>
                                (
                                    <li {...props}> <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} /> {option.title} </li>
                                )}
                                style={{ width: 'auto', color: '#fff' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Playlist" placeholder="Add Playlist" style={{ color: '#fff' }} />
                                )}
                                isOptionEqualToValue={(option, value) => option === value}
                            />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={SubmitNewPlaylistData} type="button" data-bs-dismiss="modal" className="btn btn-primary">Add Video</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        // End Return
    )
    // End Function
}
export default Videos
