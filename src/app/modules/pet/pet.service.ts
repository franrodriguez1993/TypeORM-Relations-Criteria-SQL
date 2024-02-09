import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDTO, UpdatePetDTO } from './pet.dto';
import { UserService } from '../user/user.service';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from 'src/app/database/entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
  private userService: UserService;

  constructor(
    private readonly moduleRef: ModuleRef,
    @InjectRepository(PetEntity)
    private petRepository: Repository<PetEntity>,
  ) {}

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async create(createPetDto: CreatePetDTO) {
    //check user:
    const user = await this.userService.findOne(createPetDto.userId);

    const pet = this.petRepository.create({
      name: createPetDto.name,
      origin: createPetDto.origin,
    });

    //relation
    pet.user = user;

    return await this.petRepository.save(pet);
  }

  async findAll() {
    return await this.petRepository.find({});
  }

  async findOne(id: number) {
    return await this.petRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async update(id: number, updatePetDto: UpdatePetDTO) {
    const pet = await this.petRepository.findOne({ where: { id } });
    if (!pet) throw new NotFoundException('Pet not found');

    //matcheamos las propiedades del dto con las del registro
    Object.assign(pet, updatePetDto);

    //las guardamos
    return await this.petRepository.save(pet);
  }

  async remove(id: number) {
    const result = await this.petRepository.delete({ id });

    if (result.affected === 0) throw new NotFoundException('Pet not found');
    return 'Pet deleted';
  }
}
