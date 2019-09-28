import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewModule } from './review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Connection } from 'typeorm';
// import { DatabaseModule } from './database.module';

@Module({
  imports: [ReviewModule, TypeOrmModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
