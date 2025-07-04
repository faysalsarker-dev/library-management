export type Genre = "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";

export interface IBook {
   _id?: string | undefined;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

  export interface IBookGroup {
  genre: Genre;
  totalCopies: number;
}


  export interface BorrowedBook  {
    totalQuantity: number;
    book: {
      title: string;
      isbn: string;
    };
  };

