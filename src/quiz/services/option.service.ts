import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OptionEntity } from '../entities/options.entity';
import { QuestionEntity } from '../entities/question.entity';
import { CreateOptionDTO } from './../dto/create-option.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
  ) {}

  async createNewOption(
    optionDTO: CreateOptionDTO,
    question: QuestionEntity,
  ): Promise<OptionEntity> {
    const newOption: OptionEntity = await this.optionRepository.save({
      text: optionDTO.text,
      isCorrect: optionDTO.isCorrect,
    });

    question.options = [...question.options, newOption];
    await question.save();
    return newOption;
  }
}
