import { Book, Genre } from "./Book";
import * as fs from "fs";

export class Library {
  private AllBook: Book[] = [];
  private nextId: number = 1;

  AddBook(book: Omit<Book, "id">): Book {
    const newBook = { ...book, id: this.nextId++ };
    this.AllBook.push(newBook);
    return newBook;
  }

  ListBooks(): void {
    this.AllBook.forEach((book) => console.log(book));
  }

  SearchBooks<K extends keyof Book>(value: Book[K]): Book[] {
    return this.AllBook.filter((book) => book["title"] === value);
  }

  UpdateBook(id: number, updates: Partial<Omit<Book, "id">>): void {
    const bookIndex = this.AllBook.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.AllBook[bookIndex] = { ...this.AllBook[bookIndex], ...updates };
    }
  }

  DeleteBook(id: number): void {
    this.AllBook = this.AllBook.filter((book) => book.id !== id);
  }

  SaveToFile(filename: string): void {
    fs.writeFileSync(filename, JSON.stringify(this.AllBook, null, 2));
    console.log(`Books saved to ${filename}`);
  }

  // Method to load books from a JSON file
  LoadFromFile(filename: string): void {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename, "utf8");
      this.AllBook = JSON.parse(data);
      console.log(`Books loaded from ${filename}`);
    } else {
      console.log(`File ${filename} does not exist.`);
    }
  }
}
