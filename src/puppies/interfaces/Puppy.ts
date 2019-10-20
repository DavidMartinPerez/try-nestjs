import { Document } from 'mongoose';

export interface Puppy extends Document {
    id?:number;
    name: string; // nombre
    breed: string; //Raza
    age:number
    adopted: boolean; //adoptado?
}