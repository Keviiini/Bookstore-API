import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';
import books from '../models/book'
import resetDatabase from '../utils/resetDatabase';

/*
 * GET /book to read books.
 */
const getBooks = (req, res) => {
  // res.status(200).send({ message: 'route non activé' });
  books.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: 'error fetching books' });
    } if (!data) {
      console.log(data);
      res.status(200).send({ books: [] });
    } else {
      res.status(200).send({ books: data });
    }
  });

};

/*
 * POST /book to save a new book.
 */

const initialStructure = {
  books: []
};

const postBook = (req, res) => {
  // res.status(200).send({ message: 'route non activé' });
  let obj = new books(req.body);
  console.log("ewoihgew");
  console.log(req.body);
  obj.ref = uuid();
  obj.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: 'an Error occured' });
    } else {
      console.log(data);
      res.status(200).send({ message: 'book successfully added' });
    }
  });
};

/*
 * GET /book/:id route to retrieve a book given its id.
 */
const getBook = (req, res) => {
  // res.status(200).send({ message: 'route non activé' });
  books.findOne({ ref: req.params.id }, (err, book) => {
    if (err) {
      console.log(err);
      res.status(400).send({ message: 'an Error occured' });
    }
    if (!book) {
      res.status(400).send({ message: 'book does not exist' });
    } else {
      res.status(200).send({ message: 'book fetched', book });
    }
    // res.json(extractData(err, data));
  });
};

/*
 * DELETE /book/:id to delete a book given its id.
 */
const deleteBook = (req, res) => {

  books.findOneAndRemove({ ref: req.params.id }, (err, data) => {
    if (err || data === null) {
      console.log(err);
      res.status(400).send({ message: 'book does not exist' });
    } else {
      res.status(200).send({ message: 'book successfully deleted' });
    }
  })

};

/*
 * PUT /book/:id to updatea a book given its id
 */
const updateBook = (req, res) => {
  // res.status(200).send({ message: 'route non activé' });
console.log("les donner");
console.log(req.params);
  books.findOneAndUpdate({ ref: req.params.id }, req.body, { new: true }, (err, data) => {
    if (err || (data === null)) {
      console.log('Cest la merde ', data);
      res.status(400).send({ message: 'book does not exist' });
    } else {
      console.log(data);
      res.status(200).send({ message: 'book successfully updated', book:data });
    }
  });

};

const deleteBooks = (req, res) => {
  resetDatabase();
  getBooks(req, res);

};
//export all the functions
export default { getBooks, postBook, getBook, deleteBook, updateBook, deleteBooks };
