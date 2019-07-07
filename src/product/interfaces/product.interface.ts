import { Document } from 'mongoose';

// The object interface that defines the structure of the Product entitiy

export interface Product extends Document {
    readonly name: string;
    readonly price: number;
    readonly available: boolean;
    readonly dateCreated: string;
}