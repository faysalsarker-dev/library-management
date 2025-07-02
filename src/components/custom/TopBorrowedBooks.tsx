import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, BarChart3 } from "lucide-react";

type BorrowedBook = {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
};

const borrowedBooks: BorrowedBook[] = [
  {
    totalQuantity: 10,
    book: {
      title: "The Theory of Everything",
      isbn: "9780553380163",
    },
  },
  {
    totalQuantity: 8,
    book: {
      title: "Sapiens: A Brief History of Humankind",
      isbn: "9780062316097",
    },
  },
  {
    totalQuantity: 7,
    book: {
      title: "Atomic Habits",
      isbn: "9780735211292",
    },
  },
];

const TopBorrowedBooks = () => {
  return (
    <section className="py-10 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="text-primary" size={28} />
          Top Borrowed Books
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {borrowedBooks.map((item, index) => (
            <Card key={index} className="hover:shadow-xl transition-all border border-border/60 rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-primary" />
                  <h3 className="text-lg font-semibold">{item.book.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">ISBN: {item.book.isbn}</p>
                <p className="text-sm font-medium text-foreground">
                  Total Borrowed: <span className="text-primary font-bold">{item.totalQuantity}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopBorrowedBooks;
