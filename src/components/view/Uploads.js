import React, { useState, useEffect } from 'react';
import '../../css/style.css';
import DataTable from "react-data-table-component";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import swal from 'sweetalert';
const axios = require('axios');
toast.configure();

function ManagePlayList() {

	const [allData, setallData] = useState([]);
	function callData() 
	{
		var data = [];
		axios.get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata").then((response) => {
			for (let index = 0; index < response.data.length; index++){
				if(response.data[index].introVideo !== null){
					data.push(response.data[index]);
				}
			}
			for (let index = 0; index < data.length; index++){
				data[index].id = index+1;
			}
			setallData(data);
		});
	}
	useEffect(() => {
		callData();
		document.getElementsByClassName('page-content')[0].style.padding = "1.5rem 1.5rem 0 1.5rem";
	}, [])
	//  Delete PlayList
	const deletePlayList = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this imaginary file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.post(process.env.REACT_APP_API_URL + '/manageplaylist/add', { currentplaylistid: id , opration :"deleteIntro"}).then((res) => {
					toast.success("Delete Successfully", {});
					callData();
				}).catch((err) => {
					if (err.response && err.response.data && err.response.data.errorMessage) {
						toast.error(err.response.data.errorMessage, {});
					}
				});
			}
		});
	}
	
	
	const columns = [
		{ id: 1, name: 'S.no', selector: (row) => row.id, sortable: true, reorder: true },
		{ id: 2, name: "Playlists", selector: (row) => row.title, sortable: true, reorder: true },
		{ id: 3, name: "Videos", selector: (row) =>  
			<React.Fragment>
				{row.introVideo != null ? (row.introVideo.split('_')[1].substring(0,20))+"..." : ("Video Not Found")}
			</React.Fragment>,
		},
		// { id: 3, name: "Videos", button: true, cell: (row) => <i>Active</i> },
		{ id: 4, name: "", cell: (row) => "" },
		{
			id: 5, name: "Action", button: true, cell: (row) =>
				<React.Fragment>
					<Button onClick={() => deletePlayList(row._id)} className="btn btn-sm btn-light"><i className="bx bx-trash me-0" ></i></Button>&nbsp;
					{/* <Button onClick={() => { setuser(row.user); setPlayListName(row.introVideo); setUpdateId(row._id); handlePlaylistModelShow("update"); }} className="btn btn-sm btn-light"><i className="lni lni-pencil-alt me-0"></i></Button> */}
				</React.Fragment>,
		}
		
	];
	const [addPlayListModelshow, SetaddPlayListModelshow] = useState(false);
	const handlePlaylistModelShow = (opr) => {
		SetaddPlayListModelshow(true);
		setOpration(opr);
		if (opr == "add")
			setPlayListName("");
	}
	const handlePlaylistModelClose = () => SetaddPlayListModelshow(false);
	// ////////////////////////
	// Submit Playlist Data
	const [opration, setOpration] = useState('');
	const [playListName, setPlayListName] = useState("");
	const [user, setuser] = useState("");
	const [updatePlaylistId, setUpdateId] = useState("");
	const submitPlaylistData = () => {
		axios.post(process.env.REACT_APP_API_URL + '/manageplaylist/add', {
			title: playListName,
			opration: opration,
			id: updatePlaylistId
		}).then((res) => {
			if (opration == "add")
			toast.success("Added Successfully", {});
			else
			toast.success("Update Successfully", {});
			callData();
		}).catch((err) => {
			if (err.response && err.response.data && err.response.data.errorMessage) {
				toast.error(err.response.data.errorMessage, {});
			}
		});
	}
	return (
		<>
		
			<div className="col">
				<br /><br />
				<div className="card p-3" style={{ overflow: 'auto' }}>
					<DataTable style={{ background: 'transparent' }} title="Manage Intro Videos" columns={columns} data={allData} defaultSortFieldId={1} sortIcon={<ArrowUpwardIcon />} pagination />
				</div>
			</div>
			{/* Add Data Model */}
			<Modal show={addPlayListModelshow} onHide={handlePlaylistModelClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Playlist</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="row g-3">
						<div className="col-12">
							<label className="form-label">Title</label>
							<div className="input-group" id="show_hide_password">
								<input value={
									playListName != "" ? playListName : ""
								} onChange={e => setPlayListName(e.target.value)} type="text" className="form-control border-end-0" id="inputChoosePassword" placeholder="Enter Playlist Title" />
							</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handlePlaylistModelClose}>
						Close
					</Button>
					<Button type='submit' variant="primary" onClick={() => { submitPlaylistData(); handlePlaylistModelClose(); }}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
export default ManagePlayList