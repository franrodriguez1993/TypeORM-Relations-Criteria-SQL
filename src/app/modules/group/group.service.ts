import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateGroupDTO, UpdateGroupDTO } from './group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from 'src/app/database/entities/group.entity';
import { FindOptionsRelations, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ModuleRef } from '@nestjs/core';
import { GroupCriteria } from './group.criteria';

@Injectable()
export class GroupService {
  private userService: UserService;
  constructor(
    private readonly moduleRef: ModuleRef,
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
  ) {}

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async create(createGroupDto: CreateGroupDTO) {
    const group = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(group);
  }

  async findAll() {
    return await this.listGroupByCriteria(
      {},
      { members: { address: true, pets: true } },
    );
  }

  async findOne(id: number) {
    // const group = await this.groupRepository.findOne({
    //   where: { id },
    //   relations: ['members', 'members.address', 'members.pets'],
    // });

    const group = await this.groupRepository.findOne({
      where: { id },
      relations: { members: { address: true, pets: true } },
    });

    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDTO) {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) throw new NotFoundException('Group not found');

    Object.assign(group, updateGroupDto);

    return await this.groupRepository.save(group);
  }

  async addMember(groupId: number, userId: number) {
    //finduser
    const user = await this.userService.findOne(userId);

    //find group:
    const group = await this.findOne(groupId);

    const checkUserInMembers = group.members.filter((m) => m.id === userId);
    if (checkUserInMembers.length !== 0)
      throw new BadRequestException('User already in group');

    group.members.push(user);

    return await this.groupRepository.save(group);
  }

  async removeMember(groupId: number, userId: number) {
    //finduser
    const user = await this.userService.findOne(userId);

    //find group:
    const group = await this.findOne(groupId);

    const newMembers = group.members.filter((m) => m.id !== user.id);

    group.members = newMembers;

    return await this.groupRepository.save(group);
  }

  async delete(id: number) {
    const result = await this.groupRepository.delete({ id });
    if (result.affected === 0) throw new NotFoundException('Group not found');
    return 'Group deleted';
  }

  /**  CRITERIA  **/
  async listGroupByCriteria(
    where: GroupCriteria,
    relations: FindOptionsRelations<GroupEntity> = {},
  ) {
    return await this.groupRepository.find({ where, relations });
  }
}
