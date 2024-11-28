import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from './question.entity';

@Entity('Quiz')
export class QuizEntity extends BaseEntity {
  @ApiProperty({
    description: 'Primary key as Quiz ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title',
    example: 'NestJs ',
  })
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: QuestionEntity[];
}
