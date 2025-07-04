import { useNavigate } from "react-router";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useBorrowBookMutation } from "@/redux/features/api/borrowApi";

type BorrowBookDialogProps = {
  availableCopies: number;
  bookTitle: string;
  trigger: React.ReactNode;
  bookId: string | undefined;
};

type FormValues = {
  quantity: number;
  dueDate: Date | null;
};

const BorrowBookDialog = ({ availableCopies, bookTitle, trigger, bookId }: BorrowBookDialogProps) => {
  const navigate = useNavigate();
  const [borrowBook, { isLoading  }] = useBorrowBookMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      quantity: 1,
      dueDate: null,

    },

  });


  const onSubmit = async (data: FormValues) => {
    if (!data.dueDate) {
      toast.error("Please select a due date");
      return;
    }

    if (data.quantity < 1 || data.quantity > availableCopies) {
      toast.error(`Enter quantity between 1 and ${availableCopies}`);
      return;
    }
await borrowBook({...data, book: bookId})
      .unwrap()
      form.reset();
      toast.success(`Successfully borrowed ${data.quantity} copyies of "${bookTitle}"`);
      navigate("/borrow-summary");
   
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow "{bookTitle}"</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Quantity Field */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={availableCopies}
                      {...field}
                      className="rounded-lg"
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available: {availableCopies}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date Picker */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP") : "Select date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        initialFocus
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;
