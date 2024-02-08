import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/app/database/entities/user.entity';
import { Repository } from 'typeorm';
import { AddressEntity } from 'src/app/database/entities/address.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    // create entity:
    const address = this.addressRepository.create(createUserDto.address);

    const user = this.userRepository.create({
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      dni: createUserDto.dni,
      phone_number: createUserDto.phone_number,
      active: true,
    });

    user.address = address;
    // save, catch errors and return entity:
    return await this.userRepository.save(user).catch((err: Error) => {
      throw new BadRequestException(err.message);
    });
  }

  async findAll() {
    return await this.userRepository.find({
      where: { active: true },
      relations: { address: true },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, active: true },
      relations: { address: true },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    // Buscamos el registro
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    if (!user) throw new BadRequestException('user not found');

    // Aislamos la entidad relacionada
    const address = user.address;

    // Matcheamos las propiedades del objeto, con las opcionales del dto
    Object.assign(user, updateUserDto);
    // lo mismo con la address
    Object.assign(address, updateUserDto.address);

    // Asignamos nuevamente la address
    user.address = address;

    // Actualizamos registro. Se actualiza en cascada.
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    return await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ active: false })
      .where('id=:id', { id })
      .execute();
  }
}
