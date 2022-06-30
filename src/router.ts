import {Application} from 'express';
import{createProduct,deleteProduct,listProduct,retrieveProduct,updateProduct} from './controllers/products.controller';

export const router = (app: Application) => {
    app.post("/products", createProduct);    
    app.get("/products/:id", retrieveProduct);
    app.put("/products/:id", updateProduct);
    app.delete("/products/:id", deleteProduct);    
    app.get("/products", listProduct);
}