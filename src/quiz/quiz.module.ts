// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ENTITIES } from 'entities';
// import { UserQuizModule } from '../user-quiz/user-quiz.module';
// import { OptionController } from './controllers/option.controller';
// import { QuestionController } from './controllers/question.controller';
// import { QuizController } from './controllers/quiz.controller';
// import { ResponseController } from './controllers/response.controller';
// import { OptionService } from './services/option.service';
// import { QuestionService } from './services/question.service';
// import { QuizService } from './services/quiz.service';
// import { ResponseService } from './services/response.service';

// @Module({
//   imports: [TypeOrmModule.forFeature(ENTITIES), UserQuizModule],
//   controllers: [
//     QuizController,
//     QuestionController,
//     OptionController,
//     ResponseController,
//   ],
//   providers: [QuizService, QuestionService, OptionService, ResponseService],
//   exports: [TypeOrmModule],
// })
// export class QuizModule {}
