import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken, getConnectionToken } from '@nestjs/mongoose';
import { ProductsController } from './controllers/productController';
import { ProductsService } from './services/product.service';
import { ProductShema } from './schema/product.shema';


// Main module for the product functions
@Module({
    // Created mongoose module for db connections
    imports: [MongooseModule.forRoot('mongodb://localhost/products', {
        useCreateIndex: true,
        useNewUrlParser: true,
            // Created mongoose model for use in services
    }), MongooseModule.forFeature([{ name: 'Product', schema: ProductShema }]) ],
    controllers: [ ProductsController ],
    providers: [ ProductsService ],
})
export class ProductModule { }
