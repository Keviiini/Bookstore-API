import books from '../models/book'
import mongoose from 'mongoose';

const resetDatabase = () => {
  console.log("rogjrwoihgiowhreogihw");
  mongoose.connect('mongodb://localhost/bookStore', function () {
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();

  });


}

export default resetDatabase;
