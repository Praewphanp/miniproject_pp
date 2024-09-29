export enum Genre {
  FictionType = "Fiction",
  NonFictionType = "Non-Fiction",
  ScienceType = "Science",
  HistoryType = "History",
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  publishedYear: number;
  available: boolean;
}
