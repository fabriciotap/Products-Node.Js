import { Schema, model } from 'mongoose';

//Interface
export interface IProduct {
    name:                     string;
    dateOfElaboration:        null | Date;
    placeOfProduction:        null | string;
    price:                    number | null;
    stock:                    number;
} 

//Schema
const productSchema = new Schema<IProduct>({
    name: {type: String},
    dateOfElaboration : {type: Date},
    placeOfProduction: {type: String},
    price: {type: Number},
    stock: {type: Number}
});

//Model
const Product = model<IProduct>('Products',  productSchema);

export {Product}

