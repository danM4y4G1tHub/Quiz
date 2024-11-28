import { Body, Controller, Post } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SETTINGS } from '@src/constants/utils';
import { CreateUserQuizDTO } from './dto/create-user-quiz.dto';
import { UserQuizEntity } from './entity/user-quiz.entity';
import { UserQuizService } from './user-quiz.service';

@ApiTags('User Quiz')
@Controller('user-quiz')
export class UserQuizController {
  constructor(private readonly userQuizService: UserQuizService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: UserQuizEntity,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try it again!',
  })
  async createUser(
    @Body(SETTINGS.VALIDATION_PIPE)
    userQuizDTO: CreateUserQuizDTO,
  ): Promise<UserQuizEntity> {
    return await this.userQuizService.createNewUserQuiz(userQuizDTO);
  }
}
