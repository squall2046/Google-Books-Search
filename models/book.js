const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: { type: String },
  description: String,
  image: String,
  link: { type: String },
  title: { type: String },
  saved: { type: Boolean, default: false },
  Published: Date,
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
