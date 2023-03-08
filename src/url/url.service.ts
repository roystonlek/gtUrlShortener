import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUrlParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { Url } from '../typeorm/entities/Url';
@Injectable()
export class UrlService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}
  getLongUrls() {
    return this.urlRepository.find();
  }
  createUrl(urlDetails: CreateUrlParams) {
    if (urlDetails.longUrl.length == 0) {
      throw new BadRequestException('Please Enter a Url ');
    }
    const newUrl = this.urlRepository.create({ ...urlDetails });
    return this.urlRepository.save(newUrl);
  }
  async getLongUrl(shortUrl: string) {
    const url = await this.urlRepository.findOneBy({ shortUrl });
    if (!url) {
      throw new NotFoundException('Url Does Not Exist');
    }
    return url.longUrl;
  }
}
