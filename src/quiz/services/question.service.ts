import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateQuestionDTO } from '../dto/create-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuizEntity } from '../entities/quiz.entity';

export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async createNewQuestion(
    questionDTO: CreateQuestionDTO,
    quiz: QuizEntity,
  ): Promise<QuestionEntity> {
    const newQuestion: QuestionEntity = await this.questionRepository.save({
      question: questionDTO.question,
    });

    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();

    return newQuestion;
  }

  async findQuestionByID(id: number): Promise<QuestionEntity> {
    return await this.questionRepository.findOne({
      where: { id },
      relations: { quiz: true, options: true },
    });
  }
}
