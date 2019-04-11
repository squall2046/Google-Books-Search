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

  // searchBooks: function (props) {
  //   let title = props.title.trim().split(" ").join("+")
  //   console.log(title)
  //   return axios.get("https://www.googleapis.com/books/v1/volumes?key=AIzaSyAYkUaZG7o4tvhJk_3007DEGWnj2czd1M8&q=" + title);
  // },




};
