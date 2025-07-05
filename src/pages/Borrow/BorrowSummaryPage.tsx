import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBorrowSummaryQuery } from "@/redux/features/api/borrowApi";
import type { BorrowedBook } from "@/components/types/types";

const BorrowSummaryPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetBorrowSummaryQuery({ page, limit });

  const borrowSummary = data?.data || [];
  const totalPages = data?.totalPages || 1;
  


  const totalBorrowed = borrowSummary.reduce(
    (sum: number, item: BorrowedBook) => sum + item.totalQuantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <Card className="bg-white/80 dark:bg-background/70 shadow-xl backdrop-blur-md border border-muted rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-muted">
          <CardTitle className="text-3xl font-extrabold text-primary tracking-tight flex items-center gap-2">
            📚 Borrow Summary
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            See how many books have been borrowed
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-1/2">📖 Book Title</TableHead>
                <TableHead className="w-1/3">🔢 ISBN</TableHead>
                <TableHead className="text-right">📦 Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(limit)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-4/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-10" /></TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-red-500 font-medium">
                    ❌ Failed to load data. Please try again later.
                  </TableCell>
                </TableRow>
              ) : borrowSummary.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                    No borrowed books found.
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {borrowSummary.map((item: BorrowedBook, i: number) => (
                    <TableRow key={i} className="hover:bg-muted/20">
                      <TableCell>{item.book.title}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.book.isbn}
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {item.totalQuantity}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/10 font-semibold">
                    <TableCell />
                    <TableCell className="text-right text-muted-foreground">
                      Total
                    </TableCell>
                    <TableCell className="text-right text-lg text-primary">
                      {totalBorrowed}
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>

          {!isLoading && !isError && totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent className="justify-end">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={pageNumber === page}
                        onClick={() => setPage(pageNumber)}
                        href="#"
                        className={`${
                          pageNumber === page ? "bg-primary text-white" : "text-primary"
                        } hover:bg-primary/90 hover:text-white transition-colors`}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className={
                      page === totalPages ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowSummaryPage;
