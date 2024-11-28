import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionDTO {
  @IsNotEmpty({
    message: 'The question should have a content',
  })
  @Length(3, 255)
  question: string;

  @IsNotEmpty()
  quizId: number;
}
