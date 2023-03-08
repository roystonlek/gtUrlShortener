import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUrlParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { Url } from '../typeorm/entities/Url';
import ShortUniqueId from 'short-unique-id';
import validUrl from 'valid-url';

const _BASE_URL = 'http://localhost:3000/';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}

  async createUrl(urlDetails: CreateUrlParams) {
    if (urlDetails.longUrl.length == 0 && !validUrl.isUri(urlDetails.longUrl)) {
      throw new BadRequestException('Please Enter a Url ');
    }
    // Generate a shortUrl Extension and check if it exists in the database
    const uid = new ShortUniqueId({ length: 6 });
    let shortUrl = uid();
    let fullUrl = _BASE_URL + shortUrl;
    let check = await this.urlRepository.findOneBy({ shortUrl: fullUrl });
    // if exists, generate a new one
    while (check) {
      shortUrl = uid();
      fullUrl = _BASE_URL + shortUrl;
      check = await this.urlRepository.findOneBy({ shortUrl: fullUrl });
    }
    //create a record and save to database
    const newUrl = this.urlRepository.create({
      ...urlDetails,
      shortUrl: fullUrl,
    });
    return this.urlRepository.save(newUrl);
  }

  async getLongUrl(shortUrl: string) {
    const fullUrl = _BASE_URL + shortUrl;
    const url = await this.urlRepository.findOneBy({ shortUrl: fullUrl });
    if (!url) {
      throw new NotFoundException('Url Does Not Exist');
    }
    return url.longUrl;
  }
}
