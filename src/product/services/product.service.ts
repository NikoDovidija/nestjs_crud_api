import { Model } from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDTO } from '../dto/product.dto';
import { Product } from '../interfaces/product.interface';

/* The main service class that executes operations to the db */
@Injectable()
export class ProductsService {

    // Injected mongoose Product model
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    // Method for the /POST endpoint - add new product
    async create(productDTO: ProductDTO): Promise<Product> {
        try {
            const product = new this.productModel(productDTO);
            product.dateCreated = new Date();
            const createdProduct = await product.save();
            // Return the newly created value
            return {
                name: createdProduct.name, price: createdProduct.price,
                available: createdProduct.available,
                dateCreated: createdProduct.dateCreated };
        } catch (err) {
            throw new NotFoundException('Could not create product');
        }
    }

    // Method for the /GET request, /products/ - return all products
    async findAll(): Promise<Product[]> {
        try {
            return this.productModel.find({}, '-_id -__v').exec();
        } catch (err) {
            throw new NotFoundException('Could not fetch products');
        }
    }
    // Method for the GET request, /products/:id endpoint - find product with id
    async findCertainProduct(numberVar: string): Promise<Product> {
        try {
            const product = await this.productModel.findOne({ _id: numberVar }, '-_id -__v').exec();
            if (!product) {
                throw new NotFoundException('Could not find product');
            }
            // Return the product
            return product;
        } catch (err) {
            throw new NotFoundException('Could not find product');
        }
    }
    // Method for the DELETE request /products/:id endpoint - remove product with id
    async removeCertainProduct(id: string): Promise<Product> {
        try {
            const removed = await this.productModel.findOneAndRemove({ _id: id }).exec();
            return {
                name: removed.name, price: removed.price,
                available: removed.available, dateCreated: removed.dateCreated}
        } catch (err) {
            throw new NotFoundException('Could not delete product');
        }
    }
    // Method for the PUT request /products/:id endpoint - update atribute of an exisitin product
    async updateCertainProduct(productDTO: ProductDTO, id: string ): Promise<Product> {
        try {
            const product = await this.productModel.findOneAndUpdate({ _id: id }, { $set: { productDTO } },
                 { new: true}).exec();

            // We can edit one or more values
            if (productDTO.name) {
                product.name = productDTO.name;
            }
            if (productDTO.available) {
                product.available = productDTO.available;
            }
            if (productDTO.price) {
                product.price = productDTO.price;
            }
            const savedProd = await product.save();
             // Return the new updated value
            return {name : savedProd.name, price : savedProd.price,
                available : savedProd.available, dateCreated : savedProd.dateCreated }
        } catch (err) {
            throw new NotFoundException('Could not update product data');
        }
    }
}
