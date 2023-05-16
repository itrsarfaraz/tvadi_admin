import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Login from "../auth/Login";
import Footer from "./Footer";
import { toast } from "react-toastify";
import Header from "./Header";
import { SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id");
    const role = sessionStorage.getItem("role");

    if (!user_id) {
      navigate("/login");
    }

    

  }, []);

  if (window.location.pathname === "/login") {
    return <Login />;
  }
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <div className="wrapper">
          <Header />
          <div className="page-wrapper">
            <div className="page-content">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </SnackbarProvider>
    </>
  );
}

export default Main;
