import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getLongUrl(shortUrl): string {
    return 'https://www.google.com';
  }
}
