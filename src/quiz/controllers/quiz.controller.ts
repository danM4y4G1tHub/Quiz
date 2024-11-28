import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@src/common/decorators/api-pagination/api-pagination.response';
import { Roles } from '@src/context/auth/decorator/roles.decorator';
import { JwtAuthGuard } from '@src/context/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@src/context/auth/guards/roles.guard';
import { CreateQuizDTO } from '../dto/create-quiz.dto';
import { QuizEntity } from '../entities/quiz.entity';
import { QuizService } from '../services/quiz.service';

@ApiTags('Quiz')
@Controller('quiz')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/')
  @ApiPaginatedResponse({ model: QuizEntity, description: 'List of quiz' })
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<QuizEntity>> {
    const options: IPaginationOptions = { limit, page };
    return await this.quizService.paginate(options);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a quiz by id', type: QuizEntity })
  async getQuizById(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.getQuizById(id);
  }

  @ApiCreatedResponse({
    description: 'The quiz that got created',
    type: QuizEntity,
  })
  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles('admin', 'members')
  async createQuiz(@Body() quizDTO: CreateQuizDTO): Promise<QuizEntity> {
    return await this.quizService.createNewQuiz(quizDTO);
  }
}
