// "use strict";
// var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     var desc = Object.getOwnPropertyDescriptor(m, k);
//     if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
//       desc = { enumerable: true, get: function() { return m[k]; } };
//     }
//     Object.defineProperty(o, k2, desc);
// }) : (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     o[k2] = m[k];
// }));
// var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
//     Object.defineProperty(o, "default", { enumerable: true, value: v });
// }) : function(o, v) {
//     o["default"] = v;
// });
// var __importStar = (this && this.__importStar) || function (mod) {
//     if (mod && mod.__esModule) return mod;
//     var result = {};
//     if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
//     __setModuleDefault(result, mod);
//     return result;
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.Library = void 0;
// import * as fs from "fs";
class Library {
  constructor() {
    document.getElementById("message").innerHTML = "Add new book";
    this.books = [
      {
        id: 1,
        title: "The Alchemist",
        author: "Paul Coelho",
        genre: "Adventure",
        publishedYear: 1988,
        available: true,
      },
      {
        id: 2,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        genre: "Mystery",
        publishedYear: 2003,
        available: false,
      },
      {
        id: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Tragedy",
        publishedYear: 1925,
        available: true,
      },
    ];
    this.nextId = 1;
  }

  add_Book(book) {
    const newBook = { ...book, id: this.nextId++ };
    this.books.push(newBook);
    return newBook;
  }

  list_Books() {
    return this.books;
  }

  search_Books(value) {
    return this.books.filter((book) => book.title.includes(value));
  }

  update_Book(id, updates) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
      this.books[bookIndex] = { ...this.books[bookIndex], ...updates };
    }
  }

  deleteBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
  }
}

const library = new Library();
let editBookId = null;

function searchBooks() {
  const searchValue = document.getElementById("searchInput").value;
  const filteredBooks = library.search_Books(searchValue);

  renderBookTable(filteredBooks);
}

function renderBookTable(filteredBooks = library.list_Books()) {
  const tableBody = document.querySelector("#bookTable tbody");
  tableBody.innerHTML = "";

  filteredBooks.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.publishedYear}</td>
            <td>${book.available ? "Yes" : "No"}</td>
            <td>
                <button class="edit-button" data-id="${book.id}">Edit</button>
                <button class="delete-button" data-id="${
                  book.id
                }">Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      library.deleteBook(id);
      renderBookTable();
    });
  });

  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const book = library.list_Books().find((book) => book.id === id);

      // ตั้งค่า editBookId ที่นี่
      editBookId = id; // ตั้งค่า editBookId
      document.getElementById("title").value = book.title;
      document.getElementById("author").value = book.author;
      document.getElementById("genre").value = book.genre;
      document.getElementById("publishedYear").value = book.publishedYear;
      document.getElementById("available").checked = book.available;

      document.getElementById("message").innerHTML = "Edit book";
    });
  });
}
document.getElementById("searchInput").addEventListener("input", () => {
  searchBooks();
});

document.querySelectorAll(".delete-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    library.deleteBook(id);
    renderBookTable();
  });
});

document.querySelectorAll(".edit-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    const book = library.list_Books().find((book) => book.id === id);

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("genre").value = book.genre;
    document.getElementById("publishedYear").value = book.publishedYear;
    document.getElementById("available").checked = book.available;
    editBookId = id;
  });
});

document.getElementById("newBookForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const publishedYear = parseInt(
    document.getElementById("publishedYear").value
  );
  const available = document.getElementById("available").checked;

  console.log(editBookId);

  if (editBookId) {
    library.update_Book(editBookId, {
      title,
      author,
      genre,
      publishedYear,
      available,
    });
    editBookId = null;
  } else {
    library.add_Book({ title, author, genre, publishedYear, available });
  }

  renderBookTable();

  document.getElementById("message").innerHTML = "Add new book";
  document.getElementById("newBookForm").reset();
});

function exportBooksToJSON() {
  const dataStr = JSON.stringify(library.list_Books(), null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Details.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document
  .getElementById("exportButton")
  .addEventListener("click", exportBooksToJSON);

renderBookTable();
