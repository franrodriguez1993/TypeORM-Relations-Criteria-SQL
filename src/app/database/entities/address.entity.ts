import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'addresses', synchronize: true })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street_name: string;

  @Column()
  street_number: number;

  @Column()
  city: string;

  @Column()
  state: string;
}
