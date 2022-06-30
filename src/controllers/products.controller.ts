import { Request, Response } from 'express';
import { IProduct, Product } from '../models/products.model';
import { IResponse } from '../models/response.model';

export const createProduct = async (req: Request, res: Response)=> {           
    const { name, dateOfElaboration, placeOfProduction, price, stock  } : IProduct = req.body;
    const response = await new ProductController().create({  name, dateOfElaboration, placeOfProduction, price, stock });         
    return res.status(response.status).json(response);   
}

export const retrieveProduct = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new ProductController().retrieve(docId);         
    return res.status(response.status).json(response);   
 }
 
 export const updateProduct = async (req: Request, res: Response)=> {           
     const {name, dateOfElaboration, placeOfProduction, price, stock  } : IProduct = req.body;
     const docId : String = req.params.id; 
     const response = await new ProductController().update(docId, { name, dateOfElaboration, placeOfProduction, price, stock  });         
     return res.status(response.status).json(response);   
 }
 
 export const deleteProduct = async (req: Request, res: Response) => {
     const docId : String = req.params.id; 
     const response = await new ProductController().delete(docId);         
     return res.status(response.status).json(response);   
  }
 
 export const listProduct = async (req: Request, res: Response) => {
     const response = await new ProductController().list();         
     return res.status(200).json(response);    
 }



class ProductController {

    public async create(prodload : IProduct) : Promise<IResponse> {
        const product = new Product(prodload);
        return product.save().then(data => {
            return {
                message: "CREATED: Product added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Product",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Product.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Product not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Product retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, prodload : IProduct) : Promise<IResponse>{
        return Product.updateOne({_id: docId} , { $set: { 
            name: prodload.name,
            dateOfElaboration: prodload.dateOfElaboration, 
            placeOfProduction: prodload.placeOfProduction, 
            price: prodload.price, 
            stock: prodload.stock
          } }).then(data => {            
            return {
                message: "OK: Product updated",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Product not updated",
                status: 500,
                content : err
            }
        });
    }
    

    public async delete(docId: String) : Promise<IResponse> {
        return Product.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Product not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Product deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return Product.find({}).then(data => {
                return {
                    message: "OK: All product retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve product", status: 500, content : err }
        });       
    }

}



