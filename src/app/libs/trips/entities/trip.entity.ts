import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CheckpointEntity } from '../../checkpoints/entities/checkpoint.entity';

@Entity({ name: 'trips' })
export class TripEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column({ nullable: true, default: null })
  image?: string;
  @Column()
  price: number;

  @Column()
  time: string;

  @OneToMany(() => CheckpointEntity, (checkpoint) => checkpoint.trip)
  checkpoints: CheckpointEntity[];
}
