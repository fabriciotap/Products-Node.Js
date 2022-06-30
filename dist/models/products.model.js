"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
//Schema
const productSchema = new mongoose_1.Schema({
    name: { type: String },
    dateOfElaboration: { type: Date },
    placeOfProduction: { type: String },
    price: { type: Number },
    stock: { type: Number }
});
//Model
const Product = (0, mongoose_1.model)('Products', productSchema);
exports.Product = Product;
