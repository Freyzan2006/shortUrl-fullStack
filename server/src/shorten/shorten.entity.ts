import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('short_urls')
export class ShortUrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  alias: string;

  @Column('timestamp')
  expiresAt: Date;

  @Column()
  clickCount: number;
}