import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked } from "lucide-react";

const genres = [
  { name: "Fantasy", count: 42 },
  { name: "Science Fiction", count: 35 },
  { name: "Mystery", count: 28 },
  { name: "Biography", count: 16 },
  { name: "History", count: 19 },
  { name: "Romance", count: 22 },
  { name: "Thriller", count: 14 },
  { name: "Non-fiction", count: 18 },
];

const GenresSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-primary mb-8 text-center">📚 Browse by Genre</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {genres.map((genre) => (
          <Card key={genre.name} className="group cursor-pointer hover:bg-primary hover:text-white transition-colors">
            <CardHeader className="flex items-center gap-3 pb-2">
              <BookMarked className="w-5 h-5 text-muted-foreground group-hover:text-white" />
              <CardTitle className="text-lg font-semibold">{genre.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground group-hover:text-white">
              {genre.count} books available
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default GenresSection;
