import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Results from "../components/Results";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Form, Input, FormBtn } from "../components/Form";
import "./style.css";
// import { relative } from "path";
// import Description from "../components/Description";

class Books extends Component {
  state = {
    books: "",
  };

  componentDidMount() {
    this.loadBooks();
  }

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

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

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
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                <i class="fas fa-book-open"> Submit</i>
              </FormBtn>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Results>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                        <h3> {book.title} </h3>
                      </Link>
                      <h6> written by {book.authors[0]} </h6>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                      <SaveBtn onClick={() => this.saveBook(book._id)} />

                      {/* <Description img={book.image} des={book.description} > */}
                      <img className="col-2 img" alt="book" src={book.image} />
                      <span className="col-9 des" >{book.description}</span>
                      {/* </Description> */}
                    </ListItem>
                  ))}
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
