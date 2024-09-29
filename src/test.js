"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Library_1 = require("./Library");
const Book_1 = require("./Book");
const myLibrary = new Library_1.Library();
// Adding books
myLibrary.AddBook({
    title: "Book A",
    author: "Author A",
    genre: Book_1.Genre.FictionType,
    publishedYear: 2020,
    available: true,
});
myLibrary.AddBook({
    title: "Book B",
    author: "Author B",
    genre: Book_1.Genre.NonFictionType,
    publishedYear: 2019,
    available: false,
});
// Save to file
myLibrary.SaveToFile("books.json");
// Create a new library instance and load from file
const newLibrary = new Library_1.Library();
newLibrary.LoadFromFile("books.json");
// List books to confirm loading
newLibrary.ListBooks();
