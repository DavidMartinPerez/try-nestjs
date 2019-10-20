import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreatePuppyDTO } from './dto/create-puppy.dto';
import { PuppiesService } from './puppies.service';
import { Puppy } from './interfaces/Puppy';

@Controller('puppies')
export class PuppiesController {

	constructor(private puppiesService: PuppiesService) {}

	@Get()
	getPuppies(): Promise<Puppy[]> {
		return this.puppiesService.getPuppies();
	}

	@Get(':id')
	getPuppy( @Param('id') id: string ): Promise<Puppy>  {
		return this.puppiesService.getPuppy( id );
	}

	@Post()
	createPuppy(@Body() puppy: CreatePuppyDTO): Promise<Puppy> {
		return this.puppiesService.createPuppy( puppy );
	}

	@Put(':id')
	updatePuppy( @Body() puppy: Puppy, @Param('id') id ): Promise<Puppy> {
		return this.puppiesService.updatePuppy( id, puppy );
	}

	@Delete(':id')
	deletePuppy(@Param('id') id): Promise<any> {
		return this.puppiesService.deletePuppy(id);
	}
}
