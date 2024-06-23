import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schema/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(name: string, category: string, volume: string): Promise<Product[]> {
    interface Query {
      name: {}
      category: {}
      'details.volume': {}
    }
    let query: Query = {
      name: { $regex: name? name: "", $options: 'i' },
      category: { $regex: category? category: "", $options: 'i'},
      'details.volume' : { $regex: volume? volume: "", $options: 'i' }
    }
    return this.productModel.find(query).exec();
  }

  async findOne(id: string): Promise<Product | null> {
    let product = this.productModel.findById(id).exec();
    if (!product) { 
      return null;
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
