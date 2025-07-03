import { useState } from "react";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BorrowBookDialog } from "@/components/custom";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/features/api/bookApi";
import type { IBook } from "../interface/bookinterface";

const BookCardList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { data, isLoading, isError, error } = useGetBooksQuery({});
    const [deleteBook] = useDeleteBookMutation();

  const books = data?.data ?? [];


const handleDeleteBook = async (bookId: string) => {
  console.log(`Deleting book with ID: ${bookId}`);
  await deleteBook(bookId).unwrap();
};


  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-primary text-center">📚 Recent Books</h2>

      {isLoading && <p className="text-center text-muted-foreground">Loading books...</p>}
      {isError && (
        <p className="text-center text-red-500">Error loading books: {(error as any)?.message || "Unknown error"}</p>
      )}

      {!isLoading && books.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {books.map((book: IBook) => (
              <CarouselItem key={book._id} className="md:basis-1/2 lg:basis-1/3 px-3">
                <Card className="border backdrop-blur bg-white/30 border-muted shadow-xl rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                  <CardHeader className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-2xl p-4">
                    <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
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
                      <span className={book.available ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                        {book.available ? "Yes" : "No"}
                      </span>
                    </p>

                    <div className="flex gap-2 pt-3">
                      {/* Edit */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setSelectedBook(book)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Edit Book</DialogTitle>
                          </DialogHeader>
                          <form className="space-y-4">
                            <Label>Title</Label>
                            <Input defaultValue={book.title} />
                            <Label>Author</Label>
                            <Input defaultValue={book.author} />
                            <Label>Genre</Label>
                            <Input defaultValue={book.genre} />
                            <Label>ISBN</Label>
                            <Input defaultValue={book.isbn} />
                            <Label>Copies</Label>
                            <Input type="number" defaultValue={book.copies} />
                            <div className="flex items-center justify-between">
                              <Label>Available</Label>
                              <Switch defaultChecked={book.available} />
                            </div>
                            <Button type="submit" className="w-full">
                              Update Book
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>

                      {/* Delete */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button  variant="outline" size="icon">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm text-center">
                          <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this book?</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center gap-4 mt-4">
                            <Button onClick={() => handleDeleteBook(book._id)} variant="destructive">Delete</Button>
                            <Button variant="outline">Cancel</Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Borrow */}
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

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default BookCardList;
