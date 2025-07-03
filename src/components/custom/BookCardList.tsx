import { useState } from "react";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookFormDialog, BorrowBookDialog } from "@/components/custom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/redux/features/api/bookApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { IBook } from "../types/types";

const BookCardList = () => {
  const { data, isLoading, isError, error } = useGetBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook, { isLoading: isPending }] = useUpdateBookMutation();

  // Track which book is being edited by storing its id & data
  const [editingBook, setEditingBook] = useState<IBook | null>(null);

  const books = data?.data ?? [];

  const handleDeleteBook = async (bookId: string) => {
    console.log(`Deleting book with ID: ${bookId}`);
    await deleteBook(bookId).unwrap();
  };

  const handleUpdateBook = async (data: IBook) => {
    if (!editingBook) return;
    console.log(`Updating book with ID: ${editingBook?._id}`, data);
    await updateBook({ id: editingBook?._id, ...data }).unwrap();
    setEditingBook(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">
        📚 Recent Books
      </h2>

      {isLoading && (
        <p className="text-center text-muted-foreground">Loading books...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">
          Error loading books: {(error as any)?.message || "Unknown error"}
        </p>
      )}

      {!isLoading && books.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {books.map((book: IBook) => (
              <CarouselItem
                key={book._id}
                className="md:basis-1/2 lg:basis-1/3 px-3"
              >
                <Card className="border backdrop-blur bg-white/30 border-muted shadow-xl rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                  <CardHeader className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-2xl p-4">
                    <CardTitle className="text-lg font-semibold">
                      {book.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </CardHeader>

                  <CardContent className="space-y-2 px-4 py-3">
                    <p>
                      <span className="font-semibold">Genre:</span> {book.genre}
                    </p>
                    <p>
                      <span className="font-semibold">ISBN:</span> {book.isbn}
                    </p>
                    <p>
                      <span className="font-semibold">Copies:</span> {book.copies}
                    </p>
                    <p>
                      <span className="font-semibold">Available:</span>{" "}
                      <span
                        className={
                          book.available
                            ? "text-green-600 font-medium"
                            : "text-red-500 font-medium"
                        }
                      >
                        {book.available ? "Yes" : "No"}
                      </span>
                    </p>

                    <div className="flex gap-2 pt-3">
                      {/* Edit Button opens dialog with selected book */}
                      <Button
                        onClick={() => setEditingBook(book)}
                        className="btn btn-secondary"
                      >
                        ✏️ Edit Book
                      </Button>

                      {/* Edit Dialog for current editingBook */}
                      {editingBook && editingBook._id === book._id && (
                        <BookFormDialog
                          open={true}
                          setOpen={() => setEditingBook(null)}
                          onSubmit={handleUpdateBook}
                          initialData={editingBook}
                          mode="edit"
                          isSubmitting={isPending}
                        />
                      )}

                      {/* Delete Dialog */}
                      
<AlertDialog>
  <AlertDialogTrigger> <Trash2 className="w-4 h-4 text-destructive" /></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction   onClick={() => handleDeleteBook(book._id)}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>



               

                      {/* Borrow Dialog */}
                      <BorrowBookDialog
                        bookTitle={book.title}
                        availableCopies={book.copies}
                        trigger={
                          <Button
                            size="icon"
                            disabled={!book.available || book.copies === 0}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                          >
                            <BookOpen className="w-4 h-4" />
                          </Button>
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

        {
          data?.data.length > 3 && (

           <>
              <CarouselPrevious />
              <CarouselNext />
           </>
          )
        }
            
         
        </Carousel>
      )}
    </div>
  );
};

export default BookCardList;
