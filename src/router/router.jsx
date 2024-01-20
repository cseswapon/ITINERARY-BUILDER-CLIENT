import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AddInfo from "../Pages/AddInfo/AddInfo";
import AllData from "../Pages/AllData/AllData";
import CountryInfo from "../Pages/CountryInfo/CountryInfo";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addinfo",
    element: <AddInfo />,
  },
  {
    path: "/alldata",
    element: <AllData />,
  },
  {
    path: "/alldata/:countryname",
    element: <CountryInfo />,
  },
]);
