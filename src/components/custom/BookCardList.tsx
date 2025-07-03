import { useState } from "react";
import {  Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BookFormDialog, BorrowBookDialog } from "@/components/custom";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/redux/features/api/bookApi";
import type { IBook } from "../types/types";

const BookCardList = () => {
  const { data, isLoading, isError } = useGetBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook, { isLoading: isPending }] = useUpdateBookMutation();

  const [editingBook, setEditingBook] = useState<IBook | null>(null);

  const books = data?.data ?? [];

  const handleDeleteBook = async (bookId: string) => {
    await deleteBook(bookId).unwrap();
  };

  const handleUpdateBook = async (data: IBook) => {
    if (!editingBook || !editingBook._id) return;
    await updateBook({ id: editingBook._id, ...data }).unwrap();
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
          Error loading books
        </p>
      )}

      {!isLoading && books.length > 0 && (
        <Carousel className="w-full p-3">
          <CarouselContent>
            {books.map((book:IBook) => (
              <CarouselItem
                key={book._id}
                className="md:basis-1/2 lg:basis-1/3 p-3"
              >
                          <Card className="border p-0 border-muted backdrop-blur bg-white/30  rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                  <CardHeader className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-2xl p-4">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Avatar>
<AvatarFallback>{book.author.slice(0, 2).toUpperCase()}</AvatarFallback>
</Avatar>
                      
                      {book.author}</p>
                    <CardTitle className="text-lg font-semibold">
                      {book.title}
                    </CardTitle>
                
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

                    <div className="flex gap-2 justify-between pt-3">
                     
                   

              
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

        
  <div className="space-x-2 ">
                        
     <Button
                          onClick={() => setEditingBook(book)}
                          className="btn btn-secondary "
                        >
                          ✏️ Edit Book
                        </Button>
  
  
  
                 
  
                        <BorrowBookDialog
                          bookTitle={book.title}
                          availableCopies={book.copies}
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



<AlertDialog>
  <AlertDialogTrigger> <Trash2 className="w-5 h-5 text-destructive" /></AlertDialogTrigger>
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


                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {books.length > 3 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      )}
    </div>
  );
};

export default BookCardList;
