
import { useGetBookGroupQuery } from "@/redux/features/api/bookApi";
import { BookMarked, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { IBookGroup } from "../types/types";
import { Link } from "react-router";

const GenresSection = () => {
  const { data: genreData, isLoading, isError } = useGetBookGroupQuery({});

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
 <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-10 border-b-2 border-accent pb-2">
          Browse by Genre
        </h2>
 </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="p-6 rounded-xl shadow-sm space-y-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Failed to load genres</AlertTitle>
          <AlertDescription>Please try again later.</AlertDescription>
        </Alert>
      )}

      {/* Empty State */}
      {!isLoading && !isError && genreData?.data?.length === 0 && (
        <p className="text-center text-muted-foreground">No genres found.</p>
      )}

      {/* Genre Cards */}
      {!isLoading && !isError && genreData?.data?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {genreData.data.map((genre: IBookGroup) => (
            <Link to={`/books?filter=${genre.genre}`} key={genre.genre}>
            <Card className="group p-0 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl border transition-all duration-300 cursor-pointer">
  {/* Top Content */}
  <div className="p-5 flex flex-col gap-3">
    <div className="bg-primary/10 text-primary w-fit p-2 rounded-xl transition-all duration-300 group-hover:bg-primary group-hover:text-white">
      <BookMarked className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">
      {genre.genre}
    </h3>
  </div>

  {/* Bottom Content */}
  <div className="bg-muted/50 group-hover:bg-primary/90 w-full p-5 transition-all duration-300">
    <p className="text-sm text-muted-foreground group-hover:text-white transition-colors">
      {genre.totalCopies} books available
    </p>
  </div>
</Card>

            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default GenresSection;
