import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import Results from "../components/Results";
import SaveBtn from "../components/SaveBtn";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Form, Input, FormBtn } from "../components/Form";
import "./style.css";
// import { relative } from "path";
// import Description from "../components/Description";
class Books extends Component {
  state = {
    books: [],
    title: ""
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  // componentWillMount() {
  //   this.handleFormSubmit();
  // }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  searchBtnSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      // alert(this.state.title)
      this.searchBooks(this.state.title)

      // API.searchBooks(this.state.title)
      //   .then(res => {
      //     this.setState({ books: res.data },
      //       () => {
      //         let bookInfo = this.state.books.items.map(book => {
      //           return [
      //             book.volumeInfo.title,
      //             book.volumeInfo.subtitle,
      //             book.volumeInfo.authors,
      //             book.volumeInfo.averageRating,
      //             book.volumeInfo.imageLinks.thumbnail,
      //             book.volumeInfo.infoLink,
      //             book.volumeInfo.description]
      //         });
      //         console.log(bookInfo)
      //       }
      //     )
      //     // console.log(res.data);
      //     // console.log(this.state.books.items[0].volumeInfo.title)
      //   })
      //   .catch(err => console.log(err));
    }
  };

  searchBooks = title => {
    API.searchBooks(title)
      .then(res => {
        this.setState({ books: res.data.items });
        // console.log(this.state.books);
        // console.log(this.state.books[0].volumeInfo.title);
      })
      .catch(err => console.log(err));
  };

  saveBtnSubmit = bookId => {
    // event.preventDefault();
    // let theBook = this.state.books.map((book) => (book.id === bookId));
    let theBook = this.state.books.filter((book) => (book.id === bookId));
    // console.log(theBook)
    API.saveTheBook(theBook)
  }

  deleteBtnSubmit = event => {
    // event.preventDefault();

  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron />

            <Form>
              <h3>Book Search</h3>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Book Title (required)"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.searchBtnSubmit}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Results>
              {this.state.books.length ? (
                <List>
                  {this.state.books
                    .map(book => (
                      <ListItem key={book.id} children={book}>
                        <Link to={book.volumeInfo.infoLink}>
                          <h3>{book.volumeInfo.title}</h3>
                        </Link>
                        {book.volumeInfo.subtitle ? <h4>—— {book.volumeInfo.subtitle}</h4> : console.log(" books w/o subtitles")}
                        <h5>by <i>{book.volumeInfo.authors}</i></h5>
                        {book.volumeInfo.averageRating ? <h6 className="rating">Rating: {book.volumeInfo.averageRating}</h6> : <h6>Rating: N/A</h6>}
                        <SaveBtn onClick={() => this.saveBtnSubmit(book.id)} />
                        <DeleteBtn onClick={() => this.deleteBtnSubmit(book.id)} />
                        {/* <Description img={book.image} des={book.description} > */}
                        {book.volumeInfo.imageLinks ? <img className="col-md-3 mx-auto img" alt="book" src={book.volumeInfo.imageLinks.thumbnail} /> : console.log(" books w/o image")}
                        <div className="col-md-9 mx-auto des">{book.volumeInfo.description}</div>
                        {/* </Description> */}
                      </ListItem>
                    ))
                  }
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </Results>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
