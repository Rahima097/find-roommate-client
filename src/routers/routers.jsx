import {createBrowserRouter} from "react-router";
import homeLayout from "../Layouts/homeLayout";
import home from "../Pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: homeLayout,
    children: [
      {
        path: "",
        Component: home,
      },]
  },
]);
export default router