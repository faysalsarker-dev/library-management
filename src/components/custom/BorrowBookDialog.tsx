import { useState } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type BorrowBookDialogProps = {
  availableCopies: number;
  bookTitle: string;
  trigger: React.ReactNode;
};

const BorrowBookDialog = ({ availableCopies, bookTitle, trigger }: BorrowBookDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1 || quantity > availableCopies) {
      toast.error(`Please enter a quantity between 1 and ${availableCopies}`);
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    // Simulated API call
    setTimeout(() => {
      toast.success(`Successfully borrowed ${quantity} copy(ies) of "${bookTitle}"`);
      navigate("/borrow-summary");
    }, 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Borrow "{bookTitle}"</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              max={availableCopies}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Available: {availableCopies}</p>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button type="submit" className="w-full">
            Confirm Borrow
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;
