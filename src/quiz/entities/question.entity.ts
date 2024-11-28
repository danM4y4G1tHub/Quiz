import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OptionEntity } from './options.entity';
import { QuizEntity } from './quiz.entity';

@Entity('Question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  question: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions, { eager: true })
  @JoinColumn({ name: 'quizID' })
  quiz: QuestionEntity;

  @OneToMany(() => OptionEntity, (option) => option.id)
  options: OptionEntity[];
}
