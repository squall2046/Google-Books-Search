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
    // set bookTitle to the req.body.title with spaces replaced with plus signs(+)
    // let bookTitle = req.body.title.replace(/\s/g, "+");
    let bookTitle = req.params.bookTitle.trim().split(" ").join("+");
    console.log("server side:", bookTitle);
    axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${process.env.GOOGLE_API_KEY}`
      // "https://www.googleapis.com/books/v1/volumes?key=AIzaSyAYkUaZG7o4tvhJk_3007DEGWnj2czd1M8&q=" + bookTitle
    ).then(response => {
      res.json(response.data)
    }).catch(err => {
      res.json({ error: error })
    });
  }

};
