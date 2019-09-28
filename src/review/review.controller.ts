import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Crud({
  model: {
    type: Review
  }
})
@Controller('review')
export class ReviewController {
  constructor(public service: ReviewService){}
}
