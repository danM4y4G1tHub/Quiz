import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('Option')
export class OptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'boolean' })
  idCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  @JoinColumn({ name: 'questionID' })
  question: QuestionEntity;
}
