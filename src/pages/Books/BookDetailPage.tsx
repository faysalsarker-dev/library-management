import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useGetBookByIdQuery } from "@/redux/features/api/bookApi";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookByIdQuery(id);

const book = data?.data || {}


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="text-center text-red-500">
        <p>Failed to load book data.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </Button>

      <Card className="bg-white rounded-xl shadow-md">
        <CardHeader className="border-b p-6">
          <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
          <p className="text-muted-foreground mt-1">{book.author}</p>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div>
            <Label>Genre</Label>
            <p className="text-lg">{book.genre}</p>
          </div>

          <div>
            <Label>ISBN</Label>
            <p>{book.isbn}</p>
          </div>

          <div>
            <Label>Description</Label>
            <p>{book.description || "No description available."}</p>
          </div>

          <div>
            <Label>Copies Available</Label>
            <p>{book.copies}</p>
          </div>

          <div>
            <Label>Status</Label>
            <p className={book.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {book.available ? "Available" : "Unavailable"}
            </p>
          </div>

          <div>
            <Label>Created At</Label>
            <p>{new Date(book.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <Label>Last Updated</Label>
            <p>{new Date(book.updatedAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetailPage;
