import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuizEntity } from './entity/user-quiz.entity';
import { UserQuizController } from './user-quiz.controller';
import { UserQuizService } from './user-quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuizEntity])],
  controllers: [UserQuizController],
  providers: [UserQuizService],
  exports: [UserQuizService, TypeOrmModule],
})
export class UserQuizModule {}
