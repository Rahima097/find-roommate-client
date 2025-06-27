import { createBrowserRouter } from "react-router";
import homeLayout from "../Layouts/homeLayout";
import Home from "../Pages/Home"
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import AddToFindRoommate from "../Pages/addToFindRoommate";
import BrowseListings from "../Pages/browseListings";
import MyListings from "../Pages/MyListings";
import PrivateRoute from "../Provider/PrivateRoute";
import RoommateDetails from "../Pages/RoommateDetails";
import UpdateListing from "../Pages/UpdateListing";
import About from "../Pages/About"
import Faq from "../Pages/Faq"
import Contact from "../Pages/Contact";
import Dashboard from "../Pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: homeLayout,
    children: [
      {
        path: "/",
        loader: () => fetch('https://find-roommate-server.vercel.app/roommates/available?limit=6').then(res => res.json()),
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
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/faq",
        element: <Faq></Faq>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/browse-listings",
        element: <BrowseListings></BrowseListings>,
      },
      {
        path: "/roommate/:id",
        element: <PrivateRoute><RoommateDetails></RoommateDetails></PrivateRoute>,
      },
      {
        path: "/mylistings/update/:id",
        element: <PrivateRoute><UpdateListing></UpdateListing></PrivateRoute>,
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "all-listings",
        element: <BrowseListings></BrowseListings>,
      },
      {
        path: "my-listings",
        element: <MyListings></MyListings>,
      },
      {
        path: "add-listing",
        element: <AddToFindRoommate></AddToFindRoommate>,
      },
    ]
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
export default router