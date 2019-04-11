require("dotenv").config();
const axios = require("axios");
const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  searchBooks: function (req, res) {
    // let bookTitle = req.params.bookTitle.replace(/\s/g, "+");
    let bookTitle = req.params.bookTitle.trim().split(" ").join("+");
    // console.log("server side:", bookTitle);
    axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.GOOGLE_API_KEY}`
      // "https://www.googleapis.com/books/v1/volumes?key=&q=" + bookTitle
    ).then(response => {
      res.json(response.data)
    }).catch(err => {
      res.json({ error: error })
    });
  },

  saveBooks: function (req, res) {
    // console.log("server side:", req.body)
    db.Book.insertMany([{
      authors: req.body[0].volumeInfo.authors,
      description: req.body[0].volumeInfo.description,
      img: req.body[0].volumeInfo.infoLink,
      link: req.body[0].volumeInfo.infoLink,
      title: req.body[0].volumeInfo.title,
      saved: true
    }])
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};
