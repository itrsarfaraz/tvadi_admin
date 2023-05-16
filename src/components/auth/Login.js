import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

toast.configure();
const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user_id = sessionStorage.getItem('user_id');
        if (user_id)
            navigate('/dashboard');
    }, []);
    const [button_hide, setNext] = useState({ display: 'block' });
    const [button_show, setNextshow] = useState({ display: 'none' });
    const { register, handleSubmit, click, formState: { errors } } = useForm({
        defaultValues: {
            email_or_mobile: "",
            password: ""
        }
    });
    const onSubmit = (data) => {
        // navigate('/dashboard');

        let new_pass = data['password'];
        axios.post(process.env.REACT_APP_API_URL + '/user/login', {
            email: data['email'],
            password: new_pass,
            role: "1"
        }).then((res) => {
            localStorage.setItem("token", res.data.token);
            if (res.data.role == "1") {
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user_id', res.data.user_id);
                sessionStorage.setItem('user_name', res.data.username);
                sessionStorage.setItem('email', res.data.email);
                sessionStorage.setItem('role', res.data.role);
                const responseData = JSON.stringify(res.data)
                sessionStorage.setItem('userDetails', responseData);
                navigate('/dashboard');
            } else {
                toast.error("Email or password is incorrect!", {})
            }
        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.errorMessage) {
                setNext({ display: 'block' });
                setNextshow({ display: 'none' });
                toast.error(err.response.data.errorMessage, {});
            }
        });
    };
    return (
        <>
            {/* <!--wrapper--> */}
            <div className="wrapper">
                <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
                    <div className="container-fluid">
                        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
                            <div className="col mx-auto">
                                <div className="text-center">
                                    <img src="assets/images/LoginLogo.png" width="180" alt="" />
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="border p-4 rounded">
                                            <div className="form-body">
                                                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                                                    <div className="col-12">
                                                        <label className="form-label">Enter Email / Mobile</label>
                                                        <input {...register("email", { required: "This is Requird" })} type="text" className="form-control" id="inputEmailAddress" placeholder="Enter Email/Mobile" />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="form-label">Enter Password</label>
                                                        <div className="input-group" id="show_hide_password">
                                                            <input type="password" {...register("password", { required: "This is Requird" })} className="form-control border-end-0" id="inputChoosePassword" placeholder="Enter Password" />
                                                            {/* <a href="true" className="input-group-text bg-transparent" ></a> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                                                            <label className="form-check-label" >Remember Me</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 text-end">
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button onClick={handleSubmit(onSubmit)} className="btn btn-light"><i className="bx bxs-lock-open"></i>Sign in</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<!--end row-->*/}
                    </div>
                </div>
            </div>
            {/*<!--end wrapper-->*/}
        </>
    )
}

export default Login