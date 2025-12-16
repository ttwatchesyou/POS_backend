import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodEntity } from './food.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiTags,
  ApiSecurity,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Foods')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
@Controller('foods')
export class FoodController {
  constructor(
    @InjectRepository(FoodEntity)
    private repo: Repository<FoodEntity>,
  ) {}

  // ---------------- GET ----------------
  @Get()
  findAll() {
    return this.repo.find({
      where: { is_deleted: false },
    });
  }

  // ---------------- POST ----------------
  @Post()
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      state: { type: 'boolean' },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/foods',
      filename: (_, file, cb) => {
        cb(null, Date.now() + extname(file.originalname));
      },
    }),
  }),
)
create(
  @Body() body: { name: string; state: boolean },
  @UploadedFile() file?: Express.Multer.File,
) {
  return this.repo.save({
    name: body.name,
    state: body.state,
    image_url: file ? `/uploads/foods/${file.filename}` : null,
  });
}


  // ---------------- PATCH ----------------
  @Patch(':id/state')
  updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { state: boolean },
  ) {
    return this.repo.update(id, {
      state: body.state,
    });
  }

  // ---------------- SOFT DELETE ----------------
  @Patch(':id/soft-delete')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.repo.update(id, {
      is_deleted: true,
    });
  }
}
