import { Controller, Get, Req, Param, Post, Body, Delete,Put } from '@nestjs/common';
import { ProductDTO } from '../dto/product.dto';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../services/product.service';
import { Request } from 'express';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // Endpoint : /products
    // HTTP method : get
    // Params: None
    // Returns: All products
    @Get('/products')
    async getAllProducts(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    // Endpoint : /products/:id
    // HTTP method : get
    // Params: id
    // Returns: A product with a certain id
    @Get('product/:id')
    getProductById(@Param('id') id: string) {
        return this.productsService.findCertainProduct(id);
    }

    // Endpoint : /product/:id
    // HTTP method : delete
    // Params : id
    // Returns: Response with the operation status
    @Delete('product/:id')
    removeProductById(@Param('id') id: string): Promise<Product> {
        return this.productsService.removeCertainProduct(id);
    }

    // Endpoint : /product
    // HTTP method : post
    // Body : Product 
    // Returns: Response with the operation status
    @Post('/product')
    saveProductWithParams(@Body() productDTO: ProductDTO) {
        return this.productsService.create(productDTO);
    }

    // Endpoint : /product/:id
    // HTTP method : put
    // Body : Product
    // Returns: Response with the operation status
    @Put('/product/:id')
    updateProductWithParams(@Param('id') id: string, @Body() productDTO: ProductDTO) {
        return this.productsService.updateCertainProduct(productDTO, id);
    }
}
