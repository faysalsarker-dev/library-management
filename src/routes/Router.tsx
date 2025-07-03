import App from "@/App";
import  Root from "@/layout/Root";
import AddBook from "@/pages/Books/AddBook";
import BorrowSummaryPage from "@/pages/Borrow/BorrowSummaryPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [{ index: true, element: <App/> },
      {
        path:"/create-book",
        element:<AddBook/>
      },
      {
        path:"/borrow-summary",
        element:<BorrowSummaryPage/>
      },
    ],
  },
]);

export default router;
