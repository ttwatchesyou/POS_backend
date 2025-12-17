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
import { FoodOptionEntity } from './food-option.entity';
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
    @InjectRepository(FoodEntity) private foodRepo: Repository<FoodEntity>,
    @InjectRepository(FoodOptionEntity) private optionRepo: Repository<FoodOptionEntity>,
  ) {}

  @Get()
  findAll() {
    return this.foodRepo.find({ where: { is_deleted: false }, relations: ['options'] });
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        state: { type: 'boolean' },
         price: { type: 'number' },
        image: { type: 'string', format: 'binary' },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              price: { type: 'number' },
            },
          },
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
  async create(
    @Body() body: { name: string; state: boolean; price: number; options?: { name: string; price: number }[] },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const food = this.foodRepo.create({
      name: body.name,
      state: body.state,
      price: body.price,
      image_url: file ? `/uploads/foods/${file.filename}` : null,
    });

    if (body.options?.length) {
      food.options = body.options.map(opt => this.optionRepo.create({ name: opt.name, price: opt.price }));
    }

    return this.foodRepo.save(food);
  }

  @Patch(':id/state')
  updateState(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { state: boolean },
  ) {
    return this.foodRepo.update(id, { state: body.state });
  }

  @Patch(':id/soft-delete')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.foodRepo.update(id, { is_deleted: true });
  }
}
