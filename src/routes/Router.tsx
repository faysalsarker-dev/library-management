import App from "@/App";
import  Root from "@/layout/Root";
import AddBook from "@/pages/Books/AddBook";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [{ index: true, element: <App/> },
      {
        path:"/create-book",
        element:<AddBook/>
      }
    ],
  },
]);

export default router;
