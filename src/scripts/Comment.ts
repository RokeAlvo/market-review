export interface Comment {
  id: string;
  user: string;
  rating: number;
  ratingLabel: string;
  body: string;
  date: Date;
  city: string;

}

export class Comment {
  constructor(
    id = '',
    user = '',
    rating = null,
    ratingLabel = '',
    body = '',
    date = new Date(0),
    city = '',
  ) {
    this.id = id;
    this.user = user;
    this.rating = rating;
    this.ratingLabel = ratingLabel;
    this.body = body;
    this.date = date;
    this.city = city;
  }

}
