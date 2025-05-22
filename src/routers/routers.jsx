import { createBrowserRouter } from "react-router";
import homeLayout from "../Layouts/homeLayout";
import Home from "../Pages/Home"
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import AddToFindRoommate from "../Pages/AddToFindRoommate";
import BrowseListings from "../Pages/BrowseListings";
import MyListings from "../Pages/MyListings";
import PrivateRoute from "../Provider/PrivateRoute";
import RoommateDetails from "../Pages/RoommateDetails";
import UpdateListing from "../Pages/UpdateListing";



const router = createBrowserRouter([
  {
    path: "/",
    Component: homeLayout,
    children: [
      {
        path: "/",
        loader: () => fetch('http://localhost:3000/roommates/available?limit=6').then(res => res.json()),
        Component: Home,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add-listings",
        element: <PrivateRoute><AddToFindRoommate></AddToFindRoommate></PrivateRoute>,
      },
      {
        path: "/browse-listings",
        element: <BrowseListings></BrowseListings>,
      },
      {
        path: "/my-listings",
        element: <PrivateRoute><MyListings></MyListings></PrivateRoute>,
      },

      {
        path: "/roommate/:id",
        element: <PrivateRoute><RoommateDetails></RoommateDetails></PrivateRoute>,
      },
      {
        path: "/mylistings/update/:id",
        element: < PrivateRoute ><UpdateListing></UpdateListing></PrivateRoute >,      
      }
      

    ]
  },
{
  path: "*",
    Component: ErrorPage,
  },
]);
export default router