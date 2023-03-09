import { Test, TestingModule } from '@nestjs/testing';
import { UrlControllerController } from './url_controller.controller';

describe('UrlControllerController', () => {
  let controller: UrlControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlControllerController],
    }).compile();

    controller = module.get<UrlControllerController>(UrlControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
