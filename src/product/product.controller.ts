import {
	Controller,
	Get,
	Post,
	Body,
	HttpStatus,
	Response,
	Param,
	NotFoundException,
	Query,
	Delete,
	Put
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get('/all')
	async getAllProducts(@Response() res): Promise<Product[]> {
		const products = await this.productService.getProducts();
		return res.status(HttpStatus.OK).json({
			message: 'All products',
			products
		});
	}

	@Get('/:id')
	async getProduct(@Response() res, @Param('id') productID): Promise<Product> {
		try {
			const product = await this.productService.getProduct(productID);

			if (!product) {
				console.log('Producto no existe para recuperar');
				throw new NotFoundException('Product does not exists');
			}

			return res.status(HttpStatus.OK).json({ product });
		} catch (e) {
			throw e;
		}
	}

	@Post('/create')
	async createPost(@Response() res, @Body() newProduct: CreateProductDTO): Promise<Product> {
		const product = await this.productService.createProduct(newProduct);
		return res.status(HttpStatus.OK).json({ message: 'Product Successfully Created', product });
	}

	@Put('/update')
	async updateProduct(@Response() res, @Body() updateProduct: CreateProductDTO, @Query('id') id): Promise<Product> {
        try {
            const product = await this.productService.updateProduct(id, updateProduct);
            if (!product) {
                console.log('Producto no existe para actualizar');
                throw new NotFoundException('Product does not exists');
            }
            return res.status(HttpStatus.OK).json({ message: 'Product Successfully Created', product });
        } catch(e) {
            throw e;
        }
	}

	@Delete('/delete')
	async deleteProduct(@Response() res, @Query('id') id: string): Promise<any> {
		try {
			const result = await this.productService.deleteProduct(id);

			if (!result) {
				console.log('Producto no existe para eliminar');
				throw new NotFoundException('Product does not exists');
			}

			return res.status(HttpStatus.OK).json({ message: 'Product Successfully Deleted', result });
		} catch (e) {
			throw e;
		}
	}
}
