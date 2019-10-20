import { Test, TestingModule } from '@nestjs/testing';
import { PuppiesController } from './puppies.controller';

describe('Puppies Controller', () => {
  let controller: PuppiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuppiesController],
    }).compile();

    controller = module.get<PuppiesController>(PuppiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
