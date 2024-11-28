import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

import { CreateUserQuizDTO } from './dto/create-user-quiz.dto';
import { UserQuizEntity } from './entity/user-quiz.entity';

@Injectable()
export class UserQuizService {
  constructor(
    @InjectRepository(UserQuizEntity)
    private readonly userQuizRepository: Repository<UserQuizEntity>,
  ) {}

  async createNewUserQuiz(
    userQuizDTO: CreateUserQuizDTO,
  ): Promise<UserQuizEntity> {
    const user: UserQuizEntity = new UserQuizEntity();

    user.name = userQuizDTO.name;
    user.email = userQuizDTO.email;
    user.password = userQuizDTO.password;

    return await user.save();
  }

  async getUserByEmail(email: string): Promise<UserQuizEntity> {
    return await this.userQuizRepository.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<UserQuizEntity | undefined> {
    return await this.userQuizRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
  }
}
