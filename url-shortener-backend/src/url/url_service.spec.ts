import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { Url } from '../typeorm/entities/Url';
import { TypeOrmModule } from '@nestjs/typeorm';

let testModule: TestingModule;

describe('url service test', () => {
  let urlService: UrlService;

  beforeAll(async () => {
    testModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'ap-southeast.connect.psdb.cloud',
          port: 3306,
          username: 'yp6lp4txsxyvsswa03m3',
          password: 'pscale_pw_tcUQbEkoPt5pJWJE03ssk0MzmOfA5f34GvmuwcEaYd9',
          database: 'gt_url_shortener',
          entities: [Url],
          synchronize: true,
          ssl: { rejectUnauthorized: true },
        }),
        TypeOrmModule.forFeature([Url]),
      ],
      providers: [UrlService],
    }).compile();
    await testModule.init();

    urlService = testModule.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(urlService).toBeDefined();
  });

  //   Url that is not found
  describe('getLongUrl success', () => {
    it('should return the long url', async () => {
      expect(await urlService.getLongUrl('BlmQ3n')).toBe('https://youtube.com');
    });
  });
  describe('getLongUrl url does not exists ', () => {
    it('should throw NotFoundException ', async () => {
      await expect(urlService.getLongUrl('123')).rejects.toThrow(
        'Url Does Not Exist',
      );
    });
  });

  afterAll(async () => {
    await testModule.close();
  });
});
