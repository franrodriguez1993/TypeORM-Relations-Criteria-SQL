import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'groups', synchronize: true })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  /**  MANY TO MANY - BIDIRECCIONAL  **/
  @ManyToMany(() => UserEntity, (user) => user.groups)
  members: UserEntity[];
}
