import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
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
		try {
			const product = await this.productModel.findById(productID);
			return product;
		} catch (e) {
			throw new NotFoundException('Product does not exists');
		}
	}

	async createProduct(newProduct: CreateProductDTO): Promise<Product> {
		const product = new this.productModel(newProduct);

		if (newProduct.name == null || newProduct.name == '') {
			throw new BadRequestException('"Name" parameter missing');
		}

		await product.save();
		return product;
	}

	async updateProduct(productID: string, updateProduct: CreateProductDTO): Promise<Product> {
		try {
			const product = await this.productModel.updateOne( { _id: productID }, updateProduct, { new: true });
			return product;
		} catch(e) {
			throw new NotFoundException('Product does not exists');
		}
	}

	async deleteProduct(productID: string): Promise<any> {
		try {
			const deleteProduct = await this.productModel.deleteOne( { _id: productID });
			return deleteProduct;
		} catch(e) {
			throw new NotFoundException('Product does not exists');
		}

	}
}
