import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

import { MESSAGES, REGEX } from '@src/constants/utils';

export class CreateUserQuizDTO {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Daniel Maya',
  })
  @IsNotEmpty()
  @Length(3)
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'danielmaya@yahoo.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Str0ng3r/P4s$word',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;

  @ApiProperty({
    description: 'The confirm password of the user',
    example: 'Str0ng3r/P4s$word',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  confirm: string;
}
