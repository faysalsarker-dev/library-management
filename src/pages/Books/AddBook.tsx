import { Button } from "@/components/ui/button";

import libraryImage from "@/assets/libary.png";
import type { IBook } from "@/components/types/types";
import { useAddBookMutation } from "@/redux/features/api/bookApi";
import {  useState } from "react";
import { BookFormDialog } from "@/components/custom";



const AddBook = () => {
  const [open, setOpen] = useState(false);

  const [addBook, { isLoading }] = useAddBookMutation();

 

  const handleAddBook = async (data:IBook) => {
    await addBook(data).unwrap();
    setOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Library Management</h1>

     <BookFormDialog
      open={open}
      setOpen={setOpen}
      onSubmit={handleAddBook}
      mode="create"
      isSubmitting={isLoading}
    
      trigger={
        <Button className="btn btn-primary">➕ Add New Book</Button>
      }
    />

     
      <div className="mt-12 flex justify-center">
        <img
          src={libraryImage}
          alt="Library Illustration"
          className="w-full max-w-md md:max-w-2xl rounded-lg"
        />
      </div>
    </div>
  );
};

export default AddBook;
