import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    imageURL: { type: String, required: true},
    price: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
})