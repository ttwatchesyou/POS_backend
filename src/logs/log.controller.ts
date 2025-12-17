import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogEntity, LogState } from './log.entity';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Logs')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
@Controller('logs')
export class LogController {
  constructor(
    @InjectRepository(LogEntity)
    private readonly repo: Repository<LogEntity>,
  ) {}

  @Get()
  findAll() {
    return this.repo.find();
  }

  @Post()
  create(
    @Body()
    body: {
      id_tb: number;
      id_food: string[]; 
    },
  ) {
    return this.repo.save({
      id_tb: body.id_tb,
      id_food: body.id_food,
      state: LogState.PENDING, 
    });
  }

 
  @Patch(':id/state')
  updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { state: 0 | 1 },
  ) {
    return this.repo.update(id, {
      state: body.state,
    });
  }
}
