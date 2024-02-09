import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'pets', synchronize: true })
export class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  origin: string;

  //ManyToOne va en la entidad que pertenece a la entidad A
  @ManyToOne(() => UserEntity, (user) => user.pets)
  user: UserEntity;
}
