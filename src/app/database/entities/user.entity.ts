import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';

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
}
