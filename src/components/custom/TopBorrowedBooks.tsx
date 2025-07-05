import { Card, CardContent } from "@/components/ui/card";
import { useGetTopBorrowQuery } from "@/redux/features/api/borrowApi";
import { BookOpen, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { BorrowedBook } from "../types/types";

const TopBorrowedBooks = () => {
  const { data, isLoading, isError } = useGetTopBorrowQuery({});
const topBorrowedBooks = data?.data || []
  return (
    <section className="py-10 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="text-primary" size={28} />
          Top Borrowed Books
        </h2>

        {/* Loading State */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="rounded-2xl border border-border/60 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </Card>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <p className="text-center text-red-500 text-sm mt-6">
            ❌ Failed to load top borrowed books. Please try again later.
          </p>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!topBorrowedBooks || topBorrowedBooks.length === 0) && (
          <p className="text-center text-muted-foreground text-sm mt-6">
            No top borrowed books found.
          </p>
        )}

        {/* Data */}
        {!isLoading && !isError && topBorrowedBooks && topBorrowedBooks.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topBorrowedBooks.map((item: BorrowedBook, index: number) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all border border-border/60 rounded-2xl"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-primary" />
                    <h3 className="text-lg font-semibold">{item.book.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    ISBN: {item.book.isbn}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Total Borrowed:{" "}
                    <span className="text-primary font-bold">
                      {item.totalQuantity}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopBorrowedBooks;
