import { Controller, Get, Post, Body, HttpStatus, Response, Param, HttpException } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get('/')
	async getAllProducts(@Response() res): Promise<Product[]> {
		const products = await this.productService.getProducts();
		return res.status(HttpStatus.OK).json({
			message: 'All products',
			products
		});
	}

	@Get('/:id')
	async getProduct( @Response() res, @Param('id') productID ) : Promise<Product> {
        const product = await this.productService.getProduct( productID );

        res.status(HttpStatus.OK).json({ product });
        return product;
    }

	@Post('/create')
	async createPost(@Response() res, @Body() newProduct: CreateProductDTO): Promise<Product> {
        console.log(newProduct);
        if (newProduct.name == null || newProduct.name == '') {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Falta el parametro name'
                },
                400
            );
        }
        const product = await this.productService.createProduct(newProduct);
        return res.status(HttpStatus.OK).json({ message: 'Product Successfully Created', product });
	}
}
