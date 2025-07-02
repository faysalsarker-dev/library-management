import  { useState } from "react";
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

const sampleBooks = [
  {
    _id: "685640eefe6a5b38675f9b3c",
    title: "Who is the Dev",
    author: "Stephen Fsd",
    genre: "FANTASY",
    isbn: "9780553322130",
    description: "An overview of cosmology and black holes.",
    copies: 0,
    available: false,
  },
  {
    _id: "book2",
    title: "The Silent Code",
    author: "Alice Byte",
    genre: "SCI-FI",
    isbn: "9781234567890",
    description: "An adventure through the digital unknown.",
    copies: 4,
    available: true,
  },  {
    _id: "685640eefe6a5b38675f9b3c",
    title: "Who is the Dev",
    author: "Stephen Fsd",
    genre: "FANTASY",
    isbn: "9780553322130",
    description: "An overview of cosmology and black holes.",
    copies: 0,
    available: false,
  },
  {
    _id: "book2",
    title: "The Silent Code",
    author: "Alice Byte",
    genre: "SCI-FI",
    isbn: "9781234567890",
    description: "An adventure through the digital unknown.",
    copies: 4,
    available: true,
  },  {
    _id: "685640eefe6a5b38675f9b3c",
    title: "Who is the Dev",
    author: "Stephen Fsd",
    genre: "FANTASY",
    isbn: "9780553322130",
    description: "An overview of cosmology and black holes.",
    copies: 0,
    available: false,
  },
  {
    _id: "book2",
    title: "The Silent Code",
    author: "Alice Byte",
    genre: "SCI-FI",
    isbn: "9781234567890",
    description: "An adventure through the digital unknown.",
    copies: 4,
    available: true,
  },

];

const BookCardList = () => {
  const [books, setBooks] = useState(sampleBooks);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-primary">📚 Recent Books</h2>

      <Carousel className="w-full">
        <CarouselContent>
          {books.map((book) => (
            <CarouselItem key={book._id} className="md:basis-1/2 lg:basis-1/3 px-2">
              <Card className="shadow-md hover:shadow-lg transition-all border border-muted">
                <CardHeader>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><span className="font-medium">Genre:</span> {book.genre}</p>
                  <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
                  <p><span className="font-medium">Copies:</span> {book.copies}</p>
                  <p>
                    <span className="font-medium">Available:</span>{" "}
                    <span className={book.available ? "text-green-600" : "text-red-500"}>
                      {book.available ? "Yes" : "No"}
                    </span>
                  </p>

                  <div className="flex gap-2 pt-2">
                    {/* Edit Button */}
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
                          <Button type="submit" className="w-full">Update Book</Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm text-center">
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to delete this book?</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-center gap-4 mt-4">
                          <Button variant="destructive">Delete</Button>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Borrow Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          disabled={!book.available || book.copies === 0}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                        >
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <DialogTitle>Borrow Book</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <Label>Borrower Name</Label>
                          <Input placeholder="Enter borrower's name" />
                          <Label>Borrow Date</Label>
                          <Input type="date" />
                          <Button type="submit" className="w-full">Confirm Borrow</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BookCardList;
