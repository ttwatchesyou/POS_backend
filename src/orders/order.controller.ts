import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import {
  CreateOrderDto,
  AddOrderItemDto,
  PayOrderDto,
} from './order.dto';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('Orders')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
@Controller('orders')
export class OrderController {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly itemRepo: Repository<OrderItemEntity>,
  ) {}


  @Get()
  findAll() {
    return this.orderRepo.find({
      where: { is_deleted: false },
      relations: ['items'],
      order: { id: 'DESC' },
    });
  }

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const exist = await this.orderRepo.findOne({
      where: {
        table_id: dto.table_id,
        status: OrderStatus.OPEN,
        is_deleted: false,
      },
    });

    if (exist) {
      throw new BadRequestException('Table already has an open order');
    }

    return this.orderRepo.save({
      table_id: dto.table_id,
      order_no: `ORD-${Date.now()}`,
      status: OrderStatus.OPEN,
    });
  }

 
  @Patch(':orderId/items')
  async addItem(
    @Param('orderId') orderId: number,
    @Body() dto: AddOrderItemDto,
  ) {
    const order = await this.orderRepo.findOneBy({ id: orderId });

    if (!order || order.status !== OrderStatus.OPEN) {
      throw new BadRequestException('Order is not open');
    }

    const totalPrice = dto.price * dto.qty;

    await this.itemRepo.save({
      order_id: orderId,
      food_id: dto.food_id,
      food_name: dto.food_name,
      price: dto.price,
      qty: dto.qty,
      note: dto.note,
      total_price: totalPrice,
    });


    const items = await this.itemRepo.find({
      where: { order_id: orderId },
    });

    const subTotal = items.reduce(
      (sum, i) => sum + Number(i.total_price),
      0,
    );

    await this.orderRepo.update(orderId, {
      sub_total: subTotal,
      total: subTotal - (order.discount || 0),
    });

    return { success: true };
  }

  @Patch(':tableId/pay')
  async pay(
    @Param('tableId') tableId: number,
    @Body() dto: PayOrderDto,
  ) {
    const order = await this.orderRepo.findOne({
      where: {
        table_id: tableId,
        status: OrderStatus.OPEN,
      },
    });

    if (!order) {
      throw new BadRequestException(
        'Table has no open order or order already paid',
      );
    }

    return this.orderRepo.update(order.id, {
      status: OrderStatus.PAID,
      discount: dto.discount || 0,
      total: order.sub_total - (dto.discount || 0),
      closed_at: new Date(),
    });
  }
}
