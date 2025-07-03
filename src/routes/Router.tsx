import App from "@/App";
import  Root from "@/layout/Root";
import AddBook from "@/pages/Books/AddBook";
import BookDetailPage from "@/pages/Books/BookDetailPage";
import BooksPage from "@/pages/Books/BooksPage";
import UpdateBookPage from "@/pages/Books/UpdateBookPage";
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
        path:"/books",
        element:<BooksPage/>
      },
      {
        path:"/books/:id",
        element:<BookDetailPage/>
      },
      {
        path:"/edit-book/:id",
        element:<UpdateBookPage/>
      },
      {
        path:"/borrow-summary",
        element:<BorrowSummaryPage/>
      },
    ],
  },
]);

export default router;
