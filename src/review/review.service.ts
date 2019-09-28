import {  Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewService extends TypeOrmCrudService<Review> {
  constructor(@InjectRepository(Review) repo) {
    super(repo);
  }
}
