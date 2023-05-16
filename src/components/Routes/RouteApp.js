import React from 'react'
import { Route, BrowserRouter, Routes  } from "react-router-dom";
import Error404 from '../error/Error404';
import Main from '../layout/Main';
import Dashboard from '../view/Dashboard';
import Profile from '../view/Profile';
import Adpool from '../view/Adpool';
import Manageusers from '../view/Manageusers';
import Manageplaylists from '../view/Manageplaylists';
import Adinsert from '../view/Adinsert';
import Misc from '../view/Misc';
import Home from '../view/Home';
import SpaceResImages from '../view/SpaceResImages';
import ManagePlayList from '../view/ManagePlayList';
import Videos from '../view/Videos';
import Uploads from '../view/Uploads';
import Users from '../view/Users';
import Test from '../view/Test';
import Login from '../auth/Login';

function RouteApp() {
return (
    <BrowserRouter>
      <Routes>
            <Route exact path="login" element={<Login />} />
            <Route path="/" element={<Main />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manageusers" element={<Manageusers />} />
            <Route path="/manageplaylists" element={<Manageplaylists />} />
            <Route path="/spaceres" element={<Adpool />} />
            <Route path="/adinsert" element={<Adinsert />} />
            <Route path="/home" element={<Home />} />
            <Route path="/misc" element={<Misc />} />
            <Route path="/adpool" element={<SpaceResImages />} />
            <Route exact path="dashboard" element={<Dashboard />} />
            <Route exact path="managePlayList" element={<ManagePlayList />} />
            <Route exact path="videos" element={<Videos />} />
            <Route exact path="uploads" element={<Uploads />} />
            <Route exact path="test" element={<Test />} />
            <Route exact path="users" element={<Users />} />
            <Route exact path="*" element={<Error404/>} />
          </Route>
      </Routes>
  </BrowserRouter>
)
}
export default RouteApp
