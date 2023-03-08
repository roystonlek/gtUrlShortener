import { Controller, Get, Param, Post, Res, Body } from '@nestjs/common';
import { CreateUrlDto } from './dtos/CreateUrl.dto';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  /**
   * Method to receive a shortUrl key via domain/shortUrl and redirect to the longUrl
   * @param shortUrl
   * @param res - redirects with status code 301 to the longUrl
   */
  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl: string, @Res() res) {
    const longUrl = await this.urlService.getLongUrl(shortUrl);
    res.header('Location', longUrl);
    res.status(301).send();
  }
  /**
   * Method to receive a Url Object and add to database
   * @param url
   * @returns a url object
   */
  @Post()
  createUrl(@Body() url: CreateUrlDto) {
    console.log('called here ');
    return this.urlService.createUrl(url);
  }
}
