import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TableModule } from './tables/table.module';
import { FoodModule } from './foods/food.module';
import { LogModule } from './logs/log.module';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_pos_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TableModule,
    FoodModule,
    LogModule,
    OrderModule,
  ],
})
export class AppModule {}
