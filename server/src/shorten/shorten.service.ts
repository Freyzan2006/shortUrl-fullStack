import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortUrlEntity } from './shorten.entity';
import { IShortUrlCreateForm, IShortUrlResponse } from 'src/interface/shortUrl.interface';

import * as crypto from 'crypto';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrlEntity)
    private readonly shortUrlRepository: Repository<ShortUrlEntity>,
  ) {}

  async createShortUrl(createDto: IShortUrlCreateForm): Promise<IShortUrlResponse> {
    const expiresAt = createDto.expiresAt ? new Date(createDto.expiresAt) : new Date();
    if (isNaN(expiresAt.getTime())) {
      throw new Error('Invalid date format');
    }

    let shortUrl: string = crypto.randomBytes(4).toString('hex');
    let isUnique = false;

    while (!isUnique) {
      shortUrl = crypto.randomBytes(4).toString('hex');
      isUnique = !(await this.shortUrlRepository.findOne({ where: { shortUrl } }));
    }

    const newShortUrl = this.shortUrlRepository.create({
      originalUrl: createDto.originalUrl,
      shortUrl,
      expiresAt,
      alias: createDto.alias || shortUrl,
      clickCount: 0,
    });

    return await this.shortUrlRepository.save(newShortUrl);
  }

  async getShortUrl(shortUrl: string): Promise<IShortUrlResponse | null> {
    return await this.shortUrlRepository.findOne({ where: { shortUrl } });
  }

  async getAllShortUrls(): Promise<IShortUrlResponse[]> {
    const shortUrls = await this.shortUrlRepository.find();
    return shortUrls; 
  }

  async deleteShortUrl(shortUrl: string): Promise<IShortUrlResponse> {
    const shortUrlToDelete = await this.shortUrlRepository.findOne({ where: { shortUrl } });
    if (!shortUrlToDelete) {
      throw new NotFoundException(`Short URL with alias ${shortUrl} not found`);
    }
    return await this.shortUrlRepository.remove(shortUrlToDelete);
  }

  async saveShortUrl(shortUrlData: ShortUrlEntity): Promise<ShortUrlEntity> {
    return await this.shortUrlRepository.save(shortUrlData);  
  }
}