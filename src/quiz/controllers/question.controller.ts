import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuestionDTO } from '../dto/create-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuizEntity } from '../entities/quiz.entity';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService,
  ) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createQuestion(
    @Body() questionDTO: CreateQuestionDTO,
  ): Promise<QuestionEntity> {
    const quiz: QuizEntity = await this.quizService.getQuizById(
      questionDTO.quizId,
    );
    return await this.questionService.createNewQuestion(questionDTO, quiz);
  }
}
