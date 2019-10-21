import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private productModel: Model<Product>) {}

	async getProducts(): Promise<Product[]> {
		const products = await this.productModel.find();
		return products;
	}

	async getProduct(productID: string): Promise<Product> {
		const product = await this.productModel.findById(productID);
		return product;
	}

	async createProduct(newProduct: CreateProductDTO): Promise<Product> {
		const product = new this.productModel(newProduct);
		await product.save();
		return product;
	}

	async updateProduct(productID: string, updateProduct: CreateProductDTO): Promise<Product> {
		const updatedProduct = await this.productModel.update(productID, updateProduct, { new: true });
		return updatedProduct;
	}

	async deleteProduct(productID: string): Promise<Product> {
		const deleteProduct = await this.productModel.findByIdAndDelete(productID);
		return deleteProduct;
	}
}
