import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from './table.entity';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';


@ApiTags('Tables')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
@Controller('tables')
export class TableController {
constructor(@InjectRepository(TableEntity) private repo: Repository<TableEntity>) {}


@Get()
findAll() {
return this.repo.find({ where: { is_deleted: false } });
}


@Post()
create(@Body() body: Partial<TableEntity>) {
return this.repo.save(body);
}


@Patch(':id/state')
updateState(@Param('id') id: number, @Body() body: { state: boolean }) {
return this.repo.update(id, { state: body.state });
}

@Patch(':id/availability')
updateAvailability(@Param('id') id: number, @Body() body: { isAvailable: boolean }) {
return this.repo.update(id, { isAvailable: body.isAvailable });
}


@Patch(':id/soft-delete')
softDelete(@Param('id') id: number) {
return this.repo.update(id, { is_deleted: true });
}
}