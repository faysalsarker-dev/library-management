import { useState } from "react";
import { useSearchParams , Link} from "react-router";
import { useGetBooksQuery } from "@/redux/features/api/bookApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Eye, Pencil, Trash2, BookOpen, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import type { IBook } from "@/components/types/types";


const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParam);
  const limit = 10;

  const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
  const books = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ page: String(newPage) });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        📚 All Books
      </h1>

      <div className=" shadow-md overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center py-10">❌ Failed to load books.</p>
        ) : (
          <Table >
            <TableHeader className="bg-primary/70 ">
              <TableRow>
                <TableHead className="p-4">Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No books found.
                  </TableCell>
                </TableRow>
              ) : (
                books.map((book: IBook) => (
                  <TableRow key={book._id} className="hover:bg-primary/5 my-2 transition h-12 bg-gray-200">
                    <TableCell className="font-medium text-sm">{book.title}</TableCell>
                    <TableCell className="text-sm">{book.author}</TableCell>
                    <TableCell className="text-sm">{book.genre}</TableCell>
                    <TableCell className="text-sm">{book.isbn}</TableCell>
                    <TableCell className="text-sm">{book.copies}</TableCell>
                    <TableCell className="text-sm">
                      <Badge className={book.available ? "text-green-600" : "text-red-500"}>
                        {book.available ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Link to={`/books/${book._id}`}>
                            <Button variant="outline" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                        </Link>
                     <Link to={`/edit-book/${book._id}`}>
                            <Button variant="outline" size="icon">
                              <Pencil className="w-4 h-4" />
                            </Button>
                     </Link>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this book?
                              </AlertDialogTitle>
                              <AlertDialogDescription>This action is irreversible.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <Button
                          variant="secondary"
                          size="icon"
                          disabled={!book.available || book.copies === 0}
                          className="disabled:cursor-not-allowed"
                        >
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="mt-6 flex justify-center">
   <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        href={`?page=${page - 1}`}
        onClick={(e) => {
          e.preventDefault();
          if (page > 1) handlePageChange(page - 1);
        }}
        className={page === 1 ? "pointer-events-none opacity-50" : ""}
      />
    </PaginationItem>

    {Array.from({ length: totalPages }).map((_, i) => {
      const pageNum = i + 1;
      return (
        <PaginationItem key={pageNum}>
          <PaginationLink
            href={`?page=${pageNum}`}
            isActive={page === pageNum}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pageNum);
            }}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      );
    })}

    {totalPages > 5 && (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    )}

    <PaginationItem>
      <PaginationNext
        href={`?page=${page + 1}`}
        onClick={(e) => {
          e.preventDefault();
          if (page < totalPages) handlePageChange(page + 1);
        }}
        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>

      </div>
    </div>
  );
};

export default BooksPage;
