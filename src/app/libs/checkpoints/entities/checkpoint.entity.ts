import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from '../../trips/entities/trip.entity';

@Entity({ name: 'checkpoints' })
export class CheckpointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  description?: string;

  @Column({ nullable: true, default: null })
  image?: string;

  @ManyToOne(() => TripEntity, (trip) => trip.checkpoints)
  trip: TripEntity;
}
