import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './typeorm/entities/Url';
import { UrlModule } from './url/url.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // for local development
      // host: 'localhost',
      // for local machine with docker
      // host: 'host.docker.internal',
      // for docker internal
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'shortener',
      entities: [Url],
      synchronize: true,
    }),
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
