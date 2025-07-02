import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import libraryImage from "@/assets/libary.png";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
    available: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Book Data:", formData);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
    
  <h1 className="text-2xl font-bold mb-6 text-primary">Library Management</h1>
      <Dialog>

        <DialogTrigger asChild>
          <Button className="bg-primary text-white self-end">Add New Book</Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Book</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fields here (title, author, etc.) */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
            </div>
            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input id="copies" name="copies" type="number" value={formData.copies} onChange={handleChange} required />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="available">Available</Label>
              <Switch id="available" checked={formData.available} onCheckedChange={handleSwitch} />
            </div>
            <Button type="submit" className="w-full bg-primary text-white">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* 👇 Add image here after the button */}
      <div className="mt-10 flex justify-center">
        <img
          src={libraryImage}
          alt="Add Book Illustration"
          className="w-full max-w-md md:max-w-2xl"
        />
      </div>
    </div>
  );
};

export default AddBook;
