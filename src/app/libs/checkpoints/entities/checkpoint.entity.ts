import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from '../../trips/entities/trip.entity';

@Entity({ name: 'CheckpointEntity' })
export class CheckpointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => TripEntity, (trip) => trip.checkpoints)
  trips: TripEntity;
}
