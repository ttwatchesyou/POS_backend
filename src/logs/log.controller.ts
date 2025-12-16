import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
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
constructor(@InjectRepository(LogEntity) private repo: Repository<LogEntity>) {}


@Get()
findAll() {
return this.repo.find({ where: { is_deleted: false } });
}


@Post()
create(@Body() body: Partial<LogEntity>) {
return this.repo.save(body);
}


@Patch(':id/state')
updateState(@Param('id') id: number, @Body() body: { state: LogState }) {
return this.repo.update(id, { state: body.state });
}


@Patch(':id/soft-delete')softDelete(@Param('id') id: number) {
return this.repo.update(id, { is_deleted: true });
}
}
// ts
// import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { LogEntity } from './log.entity';
// import { FoodEntity } from '../foods/food.entity';
// import { ApiTags, ApiSecurity } from '@nestjs/swagger';
// import { ApiKeyGuard } from '../common/guards/api-key.guard';


// @ApiTags('Logs')
// @ApiSecurity('api-key')
// @UseGuards(ApiKeyGuard)
// @Controller('logs')
// export class LogController {
// constructor(
// @InjectRepository(LogEntity) private repo: Repository<LogEntity>,
// @InjectRepository(FoodEntity) private foodRepo: Repository<FoodEntity>,
// ) {}


// @Get()
// findAll() {
// return this.repo.find({ where: { is_deleted: false } });
// }


// @Post()
// async create(@Body() body: { table_id: number; food_id: number }) {
// const food = await this.foodRepo.findOneBy({ id: body.food_id });
// return this.repo.save({
// table_id: body.table_id,
// food_id: body.food_id,
// food_name: food.name,
// food_state: food.state,
// });
// }


// @Patch(':id/soft-delete')
// softDelete(@Param('id') id: number) {
// return this.repo.update(id, { is_deleted: true });
// }
// }