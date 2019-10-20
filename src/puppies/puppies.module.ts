import { Module } from '@nestjs/common';
import { PuppiesService } from './puppies.service';
import { PuppiesController } from './puppies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PuppySchema } from './schemas/puppy.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Puppy', schema: PuppySchema }])
    ],
    controllers: [ PuppiesController ],
    providers: [ PuppiesService ]
})
export class PuppiesModule {}
