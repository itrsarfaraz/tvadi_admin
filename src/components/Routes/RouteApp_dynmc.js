import React from 'react'
import { Route, BrowserRouter, Routes  } from "react-router-dom";
import Error404 from '../error/Error404';
import Main from '../layout/Main';
import Dashboard from '../view/Dashboard';
import ManagePlayList from '../view/ManagePlayList';
import Videos from '../view/Videos';
import Users from '../view/Users';
import Test from '../view/Test';

function RouteApp() {
    const paths =
    [   
        { name:'/', componentName:<Dashboard/>},
        { name:'/dashboard', componentName:<Dashboard/>},
        { name:'/managePlayList', componentName:<ManagePlayList/>},
        { name:'/videos', componentName:<Videos/>},
        { name:'/users', componentName:<Users/>},
        { name:'/test', componentName:<Test/>},
        { name:'*', componentName:<Error404/> }
    ];
    return (
            <>
                <BrowserRouter>
                    <Routes>
                          <Route path='/' element={<Main/>}>
                            {
                             paths.map(val=>(
                                <Route key={val} exact path={val.name} element={val.componentName} />
                             ))
                            }
                          </Route>
                    </Routes>   
                </BrowserRouter>
            </>
  )
}
export default RouteApp
