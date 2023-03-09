import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './typeorm/entities/Url';
import { UrlModule } from './url/url.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // // for local development
      // type: 'mysql',
      // // host: 'localhost',
      // // for local machine with docker
      // // host: 'host.docker.internal',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      // database: 'shortener',
      // entities: [Url],
      // synchronize: true,

      // using docker compose
      // type: 'mysql',
      // host: 'mysql',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      // database: 'shortener',
      // entities: [Url],
      // synchronize: true,

      // planetscale
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
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
