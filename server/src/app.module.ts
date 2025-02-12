import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlController } from './shorten/shorten.controller';
import { ShortUrlEntity } from './shorten/shorten.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrlService } from './shorten/shorten.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',  
      port: process.env.DB_PORT && parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'username',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'database-name',
      entities: [ShortUrlEntity],
      synchronize: true,  
    }),
    TypeOrmModule.forFeature([ShortUrlEntity]),
  ],
  controllers: [AppController, ShortUrlController],
  providers: [AppService, ShortUrlService],
})
export class AppModule {}
