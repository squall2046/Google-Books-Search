import axios from "axios";

export default {

  getBooks: function () {
    return axios.get("/api/books");
  },
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },

  searchBooks: (bookTitle) => {
    bookTitle = bookTitle.trim().split(" ").join("+");
    console.log("client side:", bookTitle);
    return axios.get(`/api/books/search/${ bookTitle }`);
  }

};
