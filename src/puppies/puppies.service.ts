import { Injectable } from '@nestjs/common';
import { Puppy } from './interfaces/Puppy';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePuppyDTO } from './dto/create-puppy.dto';

@Injectable()
export class PuppiesService {
	constructor(@InjectModel('Puppy') private puppyModel: Model<Puppy>) {}

	//Recuperar todos los cachorros
	async getPuppies(): Promise<Puppy[]> {
		return await this.puppyModel.find().exec();
	}

	//Recuperar cachorros
	async getPuppy(id: string): Promise<Puppy> {
		return await this.puppyModel.findById( id );
	}

	// Crear cachorro
	async createPuppy( puppy: CreatePuppyDTO ): Promise<Puppy> {
		const newPuppy = new this.puppyModel( puppy );
		return await newPuppy.save();
	}

	//Eliminar cachorro
	async deletePuppy( _id: string ) : Promise<any> {
		const query = { _id };
		return await this.puppyModel.deleteOne( query );
	}

	// Actualizar cachorro
	async updatePuppy( _id:string, puppy: Puppy ) : Promise<Puppy> {
		return await this.puppyModel.updateOne( { _id }, puppy );
	}
}
