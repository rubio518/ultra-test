import { Publisher } from 'src/publisher/entities/publisher.entity';

export class CreateGameDto {
  title: string;
  price: number;
  tags: string[];
  releaseDate: Date;
  publisher: Publisher;
}
