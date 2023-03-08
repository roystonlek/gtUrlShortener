import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getLongUrl(@Param(':id') shortUrl, @Res() res): any {
    const longUrl = this.appService.getLongUrl(shortUrl);
    res.header('Location', longUrl);
    res.status(301).send();
  }
}
