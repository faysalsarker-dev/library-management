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

import { useGetBorrowSummaryQuery } from "@/redux/features/api/borrowApi";
import { useState } from "react";

const BorrowSummaryPage = () => {
  const [page, setPage] = useState(1);
  const limit = 4;

  const { data, isLoading } = useGetBorrowSummaryQuery({ page, limit });

  const borrowSummary = data?.data || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  };

  const totalBorrowed = borrowSummary.reduce(
    (sum, item) => sum + item.totalQuantity,
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
            Backend-paginated list of total borrowed books.
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
              {borrowSummary.map((item, i) => (
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
            </TableBody>
          </Table>

          {/* 🔽 Pagination Component from ShadCN */}
          {pagination.totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent className="justify-end">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: pagination.totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={pageNumber === page}
                        onClick={() => setPage(pageNumber)}
                        href="#"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, pagination.totalPages)
                      )
                    }
                    className={
                      page === pagination.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
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
