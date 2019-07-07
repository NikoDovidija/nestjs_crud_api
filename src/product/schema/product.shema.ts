import * as mongoose from 'mongoose';

// The Shema object used for DB manipulation

export const ProductShema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    price: { type: Number, require: true, unique: false },
    available: { type: Boolean, require: true, unique: false },
    dateCreated: { type: String, default: new Date(), unique: false},
});
