import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { OnEvent } from '@nestjs/event-emitter';
import { events } from '@src/constants/event.constants';
import { CreateQuizDTO } from '../dto/create-quiz.dto';
import { QuizEntity } from '../entities/quiz.entity';
import { ResponseAddEvent } from '../events/response-add.events';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
  ) {}
  async getAllQuiz(): Promise<[QuizEntity[], number]> {
    return await this.quizRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .take(1)
      .getManyAndCount();
    // return await this.quizRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<QuizEntity>> {
    const queryBuilder = this.quizRepository.createQueryBuilder('q');
    queryBuilder.orderBy('q.id', 'DESC');

    return paginate<QuizEntity>(queryBuilder, options);
  }

  async getQuizById(id: number): Promise<QuizEntity> {
    return await this.quizRepository.findOne({
      where: { id },
      relations: { questions: true },
    });
  }

  async createNewQuiz(quizDTO: CreateQuizDTO): Promise<QuizEntity> {
    return await this.quizRepository.save(quizDTO);
  }

  @OnEvent(events.RESPONSE_SUBMITTED)
  checkQuizCompleted(payload: ResponseAddEvent) {
    console.log('checkQuizCompleted', payload);
  }
}
