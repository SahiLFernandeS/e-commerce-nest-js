import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
class Detail {
    @Prop()
    year?: number;

    @Prop()
    varietal?: string;

    @Prop()
    region?: string;

    @Prop()
    country?: string;

    @Prop()
    alcoholContent?: number;

    @Prop()
    brewery?: string;

    @Prop()
    volume?: string;

    @Prop()
    brand?: string;
}

export const DetailSchema = SchemaFactory.createForClass(Detail);

@Schema({timestamps: true})
export class Product {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    category: string;

    @Prop({ type: DetailSchema })
    details: Detail;

    @Prop({required: true})
    stock: number;

    @Prop({required: true})
    images: string[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = HydratedDocument<Product>;