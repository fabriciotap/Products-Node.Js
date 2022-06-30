"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const products_controller_1 = require("./controllers/products.controller");
const router = (app) => {
    app.post("/products", products_controller_1.createProduct);
    app.get("/products/:id", products_controller_1.retrieveProduct);
    app.put("/products/:id", products_controller_1.updateProduct);
    app.delete("/products/:id", products_controller_1.deleteProduct);
    app.get("/products", products_controller_1.listProduct);
};
exports.router = router;
