import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 48 })
  yandexId: string;

  @Column({ length: 255 })
  user: string;

  @Column('int')
  rating: number;

  @Column({ length: 255 })
  ratingLabel: string;

  @Column('text')
  body: string;

  @Column()
  date: Date;

  @Column({ length: 255 })
  city: string;

}
