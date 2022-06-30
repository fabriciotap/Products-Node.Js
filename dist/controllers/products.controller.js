"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProduct = exports.deleteProduct = exports.updateProduct = exports.retrieveProduct = exports.createProduct = void 0;
const products_model_1 = require("../models/products.model");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dateOfElaboration, placeOfProduction, price, stock } = req.body;
    const response = yield new ProductController().create({ name, dateOfElaboration, placeOfProduction, price, stock });
    return res.status(response.status).json(response);
});
exports.createProduct = createProduct;
const retrieveProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new ProductController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveProduct = retrieveProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dateOfElaboration, placeOfProduction, price, stock } = req.body;
    const docId = req.params.id;
    const response = yield new ProductController().update(docId, { name, dateOfElaboration, placeOfProduction, price, stock });
    return res.status(response.status).json(response);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new ProductController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteProduct = deleteProduct;
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new ProductController().list();
    return res.status(200).json(response);
});
exports.listProduct = listProduct;
class ProductController {
    create(prodload) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new products_model_1.Product(prodload);
            return product.save().then(data => {
                return {
                    message: "CREATED: Product added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Product",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_model_1.Product.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Product not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Product retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, prodload) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_model_1.Product.updateOne({ _id: docId }, { $set: {
                    name: prodload.name,
                    dateOfElaboration: prodload.dateOfElaboration,
                    placeOfProduction: prodload.placeOfProduction,
                    price: prodload.price,
                    stock: prodload.stock
                } }).then(data => {
                return {
                    message: "OK: Product updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Product not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return products_model_1.Product.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Product not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Product deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return products_model_1.Product.find({}).then(data => {
                return {
                    message: "OK: All product retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve product", status: 500, content: err };
            });
        });
    }
}
