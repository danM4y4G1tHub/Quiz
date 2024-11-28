import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '../enums/user-roles';

@Entity('UserQuiz')
export class UserQuizEntity extends BaseEntity {
  @ApiProperty({
    description: 'Primary key as User ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User name',
    example: 'Daniel Maya',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'danielmaya@gmail.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoles, nullable: true })
  role: UserRoles;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
