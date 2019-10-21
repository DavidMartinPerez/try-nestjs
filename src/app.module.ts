import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuppiesController } from './puppies/puppies.controller';
import { PuppiesService } from './puppies/puppies.service';
import { PuppiesModule } from './puppies/puppies.module';
import {MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    PuppiesModule,
    MongooseModule.forRoot( 'mongodb://localhost/try-nest', {useNewUrlParser: true} ),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
