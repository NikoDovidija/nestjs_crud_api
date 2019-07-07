import { Product } from '../interfaces/product.interface';

// The fake repository used in our productController e2e testing
export const mockRepository = {
    getAllProducts(): Product[] {
        return [{
            dateCreated: "Sun Jul 07 2019 17:57:08 GMT+0200 (Central European Summer Time)",
            name: "Asus S33 2018",
            price: 12000,
            available: false
        },
        {
            dateCreated: "Sun Jul 07 2019 17:57:25 GMT+0200 (Central European Summer Time)",
            name: "Apple MPB 2019",
            price: 19000,
            available: false
        },
        ];
    },
    getCertainProduct(): Product {
        return {
            dateCreated: "Sun Jul 07 2019 17:57:25 GMT+0200 (Central European Summer Time)",
            name: "Apple MPB 2019",
            price: 19000,
            available: false
        };
    },
};