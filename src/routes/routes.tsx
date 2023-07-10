import { createBrowserRouter } from "react-router-dom";
import LocationListing from "../pages/LocationsListing/LocationListing";
import LocationDetails from "../pages/LocationDetails/LocationDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LocationListing/>,
  },
  {
    path: "/location-info",
    children: [{
      path: ":id",
      element: <LocationDetails/>
    }],
  }
]);
