import {createBrowserRouter} from "react-router";
import homeLayout from "../Layouts/homeLayout";
import home from "../Pages/home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import errorPage from "../Pages/errorPage";
import addToFindRoommate from '../Pages/addToFindRoommate';
import browseListings from '../Pages/browseListings';
import myListings from '../Pages/myListings';



const router = createBrowserRouter([
  {
    path: "/",
    Component: homeLayout,
    children: [
      {
        path: "",
        Component: home,
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
        Component: addToFindRoommate,
      },
      {
        path: "/browse-listings",
        Component: browseListings,
      },
      {
        path: "/my-listings",
        Component: myListings ,
      },

    ]
  },
   {
    path: "*",
    Component: errorPage,
  },
]);
export default router