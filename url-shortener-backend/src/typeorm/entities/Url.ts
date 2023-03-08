import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'url' })
export class Url {
  @PrimaryColumn({ nullable: false, unique: true })
  shortUrl: string;
  @Column({ nullable: false })
  longUrl: string;
}
