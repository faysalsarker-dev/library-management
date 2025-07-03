import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IBook, Genre } from "@/components/types/types";
import { Button } from "@/components/ui/button";

const genreOptions: { label: string; value: Genre }[] = [
  { label: "Fiction", value: "FICTION" },
  { label: "Non-Fiction", value: "NON_FICTION" },
  { label: "Science", value: "SCIENCE" },
  { label: "History", value: "HISTORY" },
  { label: "Biography", value: "BIOGRAPHY" },
  { label: "Fantasy", value: "FANTASY" },
];

interface BookFormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: Partial<IBook>;
  onSubmit: (data: IBook) => void | Promise<void>;
  isSubmitting?: boolean;
  mode: "create" | "edit";
  trigger?: React.ReactNode; 
}

const BookFormDialog: React.FC<BookFormDialogProps> = ({
  open,
  setOpen,
  initialData,
  onSubmit,
  isSubmitting,
  mode,
  trigger,
}) => {
  const form = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      ...initialData,
    },
  });


  useEffect(() => {
    if (open) {
      form.reset({
        title: "",
        author: "",
        genre: "FICTION",
        isbn: "",
        description: "",
        copies: 1,
        available: true,
        ...initialData,
      });
    }
  }, [initialData, open, form]);

  const handleFormSubmit = async (data: IBook) => {
    await onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* If a trigger is passed, render that else a default button */}
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="bg-primary text-white rounded-full px-6 py-2 hover:bg-primary/90 transition">
            {mode === "create" ? "➕ Add New Book" : "✏️ Edit Book"}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="max-w-xl rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "create" ? "Add New Book" : "Update Book"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-5 pt-2"
          >
            {/* Title */}
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

            {/* Author */}
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

            {/* Genre & Copies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Genre */}
              <FormField
                control={form.control}
                name="genre"
                rules={{ required: "Genre is required" }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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

              {/* Copies */}
              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Number of copies is required",
                  min: { value: 1, message: "Minimum 1 copy required" },
                }}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Number of copies"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ISBN */}
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

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a short description (optional)"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Available */}
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Available</FormLabel>
                  <FormControl>
                    <Switch
                      id="available"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white rounded-full mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "create"
                  ? "Adding..."
                  : "Updating..."
                : mode === "create"
                ? "Add Book"
                : "Update Book"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookFormDialog;
