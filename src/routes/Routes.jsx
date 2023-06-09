import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Instructor from "../pages/Instructor/Instructor";
import Dashboard from "../layouts/Dashboard";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddClasses from "../pages/Dashboard/Instructor/AddClasses/AddClasses";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses/MyClasses";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element:<Home></Home>
        },
        {
          path:"login",
          element:<Login></Login>
        },
        {
          path:"signup",
          element:<SignUp></SignUp>
        },
        {
          path:'instructors',
          element:<Instructor></Instructor>
        }
      ],
    },

    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'manageClasses',
          element:<ManageClasses></ManageClasses>
        },
        {
          path:'manageUsers',
          element:<ManageUsers></ManageUsers>
        },
        {
          path:'addClasses',
          element:<AddClasses></AddClasses>
        },
        {
          path:'myClasses',
          element:<MyClasses></MyClasses>
        }
      ]
    }
    
  ]);

  export default router;