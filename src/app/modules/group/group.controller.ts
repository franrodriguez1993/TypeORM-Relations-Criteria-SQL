import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDTO, UpdateGroupDTO } from './group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDTO) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDTO) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Put('member-add/:groupId/:userId')
  addMember(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
  ) {
    return this.groupService.addMember(groupId, userId);
  }

  @Put('member-remove/:groupId/:userId')
  removeMember(
    @Param('groupId') groupId: number,
    @Param('userId') userId: number,
  ) {
    return this.groupService.removeMember(groupId, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.groupService.delete(id);
  }
}
