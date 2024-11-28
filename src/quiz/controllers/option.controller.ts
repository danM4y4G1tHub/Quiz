import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { QuestionEntity } from '../entities/question.entity';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { CreateOptionDTO } from './../dto/create-option.dto';
import { OptionEntity } from './../entities/options.entity';

@ApiTags('Option')
@Controller('question/option')
@ApiSecurity('bearer')
export class OptionController {
  constructor(
    private readonly optionService: OptionService,
    private readonly questionService: QuestionService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async createOptionToQuestion(@Body() optionDTO: CreateOptionDTO) {
    const question: QuestionEntity =
      await this.questionService.findQuestionByID(optionDTO.questionID);

    const option: OptionEntity = await this.optionService.createNewOption(
      optionDTO,
      question,
    );
    return { question, option };
  }
}
