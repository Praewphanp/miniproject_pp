import { Library } from "./Library";
import { Genre } from "./Book";

const myLibrary = new Library();

// Adding books
myLibrary.AddBook({
  title: "Book A",
  author: "Author A",
  genre: Genre.FictionType,
  publishedYear: 2020,
  available: true,
});
myLibrary.AddBook({
  title: "Book B",
  author: "Author B",
  genre: Genre.NonFictionType,
  publishedYear: 2019,
  available: false,
});

// Save to file
myLibrary.SaveToFile("books.json");

// Create a new library instance and load from file
const newLibrary = new Library();
newLibrary.LoadFromFile("books.json");

// List books to confirm loading
newLibrary.ListBooks();
