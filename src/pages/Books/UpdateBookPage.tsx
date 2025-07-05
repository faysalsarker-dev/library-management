import  { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { IBook, Genre } from "@/components/types/types";
import { useNavigate, useParams } from "react-router";
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/features/api/bookApi';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const genreOptions: { label: string; value: Genre }[] = [
  { label: "Fiction", value: "FICTION" },
  { label: "Non-Fiction", value: "NON_FICTION" },
  { label: "Science", value: "SCIENCE" },
  { label: "History", value: "HISTORY" },
  { label: "Biography", value: "BIOGRAPHY" },
  { label: "Fantasy", value: "FANTASY" },
];

const UpdateBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isSubmitting }] = useUpdateBookMutation();

  const form = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      
    },
  });


  useEffect(() => {
  if (book?.data) {
          form.reset({
 ...book.data,
      
    });
  }
}, [book?.data, form]);




  const onSubmit = async (data: IBook) => {
    try {
      await updateBook({ id: id!, ...data }).unwrap();
      navigate("/books"); 
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (isLoading || !book?.data) {
  return <p className="text-center py-10">Loading book data...</p>;
}
if (isError) {
  return <p className="text-center py-10 text-red-500">Failed to load book data.</p>;
}

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-primary">✏️ Update Book</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField
  control={form.control}
  name="genre"
  rules={{ required: "Genre is required" }}
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>Genre</FormLabel>
      <Select
        value={field.value}
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {genreOptions.map((genre) => (
            <SelectItem key={genre.value} value={genre.value}>
              {genre.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>



            <FormField
              control={form.control}
              name="copies"
              rules={{
                required: "Copies is required",
                min: { value: 1, message: "At least 1 copy is required" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} placeholder="Number of copies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isbn"
            rules={{ required: "ISBN is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Add a short description (optional)" rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>Available</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-white rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateBookPage;
