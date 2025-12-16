import { ApiProperty } from '@nestjs/swagger';

/**
 * เปิดบิล (สร้าง Order)
 */
export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'ID โต๊ะ' })
  table_id: number;
}

/**
 * เพิ่มรายการอาหารลงบิล
 */
export class AddOrderItemDto {
  @ApiProperty({ example: 5 })
  food_id: number;

  @ApiProperty({ example: 'ข้าวผัดกุ้ง' })
  food_name: string;

  @ApiProperty({ example: 60 })
  price: number;

  @ApiProperty({ example: 2 })
  qty: number;

  @ApiProperty({
    example: 'ไม่ใส่พริก',
    required: false,
  })
  note?: string;
}

/**
 * ปิดบิล / จ่ายเงิน
 */
export class PayOrderDto {
  @ApiProperty({ example: 0 })
  discount: number;
}
