import mongoose from 'mongoose'

let Schema = mongoose.Schema;

export default mongoose.model('Book', new Schema({
    ref: {
        type: String
    },
    title: {
        type: String
    },
    years: {
        type: Number
    },
    pages: Number
   
    }
));