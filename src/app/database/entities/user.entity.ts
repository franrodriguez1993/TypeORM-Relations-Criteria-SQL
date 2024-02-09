import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { PetEntity } from './pet.entity';

@Entity({ name: 'users', synchronize: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  dni: number;

  @Column()
  active: boolean;

  // OneToOne solo se coloca en una de las tablas, donde se genera la foreign key "addressId"
  // Si no se usa cascade, se deberá guardar primero el registro address antes de asignarlo a user
  @OneToOne(() => AddressEntity, { cascade: true })
  @JoinColumn()
  address: AddressEntity;

  //OneToMany va en la entidad que va a tener multiples instancias de B
  @OneToMany(() => PetEntity, (pet) => pet.user, { cascade: true })
  pets: PetEntity[];
}
