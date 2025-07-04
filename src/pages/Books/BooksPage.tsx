import { useState } from "react";
import { useSearchParams , Link} from "react-router";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/features/api/bookApi";
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
import { BorrowBookDialog } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";


const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageParam);
  const limit = 10;
  const filter = searchParams.get("filter") || "";
  const [deleteBook] = useDeleteBookMutation();
  const { data, isLoading, isError } = useGetBooksQuery({ page, limit ,filter});
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

     
    <div className="shadow-md overflow-x-auto rounded-xl border bg-white dark:bg-zinc-900">
      {isLoading ? (
        <div className="space-y-2 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-7 gap-4 items-center py-2">
              {[...Array(7)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full rounded" />
              ))}
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500 text-center py-10">
          ❌ Failed to load books.
        </p>
      ) : (
        <Table>
          <TableHeader className="bg-primary/70 text-white">
            <TableRow>
              <TableHead className="p-4 text-white">Title</TableHead>
              <TableHead className="text-white">Author</TableHead>
              <TableHead className="text-white">Genre</TableHead>
              <TableHead className="text-white">ISBN</TableHead>
              <TableHead className="text-white">Copies</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  No books found.
                </TableCell>
              </TableRow>
            ) : (
              books.map((book: IBook) => (
                <TableRow
                  key={book._id}
                  className="hover:bg-primary/5 transition-colors even:bg-muted/30"
                >
                  <TableCell className="font-medium text-sm">
                    {book.title}
                  </TableCell>
                  <TableCell className="text-sm">{book.author}</TableCell>
                  <TableCell className="text-sm">{book.genre}</TableCell>
                  <TableCell className="text-sm">{book.isbn}</TableCell>
                  <TableCell className="text-sm">{book.copies}</TableCell>
                  <TableCell className="text-sm">
                    <Badge
                      variant="outline"
                      className={
                        book.available
                          ? "text-green-600 border-green-400 bg-green-50"
                          : "text-red-600 border-red-400 bg-red-50"
                      }
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center flex-wrap">
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
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteBook(book._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <BorrowBookDialog
                        bookTitle={book.title}
                        availableCopies={book.copies}
                        bookId={book._id}
                        trigger={
                          <Button
                            size="icon"
                            disabled={!book.available || book.copies === 0}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                          >
                            <BookOpen className="w-5 h-5" />
                          </Button>
                        }
                      />
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
