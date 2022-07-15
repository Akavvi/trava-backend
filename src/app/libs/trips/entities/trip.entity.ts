import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CheckpointEntity } from '../../checkpoints/entities/checkpoint.entity';

@Entity({ name: 'TripEntity' })
export class TripEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  time: string;

  @OneToMany(() => CheckpointEntity, CheckpointEntity => CheckpointEntity.trips)
  checkpoints: CheckpointEntity[];
}
