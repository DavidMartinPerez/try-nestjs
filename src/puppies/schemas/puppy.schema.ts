import { Schema } from 'mongoose';

export const PuppySchema = new Schema({
    name: String,
    breed: String,
    age: Number,
    adopted: Boolean
})