import { Publisher } from '../../publisher/entities/publisher.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column({ name: 'release_date' })
  releaseDate: Date;

  @Column({ name: 'discounted_on', nullable: true })
  discountedOn: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => Publisher, { eager: true, nullable: false })
  @JoinColumn({ name: 'publisher_id' })
  publisher!: Publisher;

  constructor(game: Partial<Game>) {
    Object.assign(this, game);
  }
}
