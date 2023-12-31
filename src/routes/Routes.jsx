import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AddClasses from "../pages/Dashboard/Instructor/AddClasses/AddClasses";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses/MyClasses";
import DisplayInstructor from "../pages/DisplayInstructor/DisplayInstructor";
import DisplayClasses from "../pages/DisplayClasses/DisplayClasses";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import SelectedClasses from "../pages/SelectedClasses/SelectedClasses";
import StudentRoute from "./StudentRoute";
import Payment from "../pages/Payment/Payment";
import ErrorPage from "../../ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "signup",
        element: <SignUp></SignUp>
      },
      {
        path: 'displayInstructor',
        element: <DisplayInstructor></DisplayInstructor>
      },
      {
        path: 'displayClasses',
        element: <DisplayClasses></DisplayClasses>
      }
    ],
  },

  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: 'manageClasses',
        element: <PrivateRoute><AdminRoute><ManageClasses></ManageClasses></AdminRoute></PrivateRoute>
      },
      {
        path: 'manageUsers',
        element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
      },
      {
        path: 'addClasses',
        element: <PrivateRoute><InstructorRoute><AddClasses></AddClasses></InstructorRoute></PrivateRoute>
      },
      {
        path: 'myClasses',
        element: <PrivateRoute><InstructorRoute><MyClasses></MyClasses></InstructorRoute></PrivateRoute>
      },
      {
        path: 'selectedClasses',
        element: <PrivateRoute><StudentRoute><SelectedClasses></SelectedClasses></StudentRoute></PrivateRoute>
      },
      {
        path:'payment',
        element:<Payment></Payment>
      }
    ]
  }

]);

export default router;