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

const borrowSummary = [
  {
    totalQuantity: 10,
    book: {
      title: "The Theory of Everything",
      isbn: "9780553380163",
    },
  },
  {
    totalQuantity: 7,
    book: {
      title: "Digital Fortress",
      isbn: "9780312944926",
    },
  },
  {
    totalQuantity: 14,
    book: {
      title: "Atomic Habits",
      isbn: "9780735211292",
    },
  },
  {
    totalQuantity: 5,
    book: {
      title: "The Silent Code",
      isbn: "9781234567890",
    },
  },
];

const totalBorrowed = borrowSummary.reduce(
  (sum, item) => sum + item.totalQuantity,
  0
);

const BorrowSummaryPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <Card className="border-none shadow-md bg-background/80 backdrop-blur-sm rounded-2xl">
        <CardHeader className="pb-4 border-b border-muted">
          <CardTitle className="text-3xl font-bold text-primary">
            📚 Borrow Summary
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Aggregated data of all books borrowed through BookPick.
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto mt-4">
          <Table>
            <TableHeader className="bg-muted/50 rounded-md">
              <TableRow>
                <TableHead className="text-sm font-semibold text-muted-foreground w-1/2">
                  Book Title
                </TableHead>
                <TableHead className="text-sm font-semibold text-muted-foreground w-1/3">
                  ISBN
                </TableHead>
                <TableHead className="text-sm font-semibold text-muted-foreground text-right">
                  Total Borrowed
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowSummary.map((item, i) => (
                <TableRow
                  key={i}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="font-medium text-base">
                    {item.book.title}
                  </TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowSummaryPage;
 