import { LoginResponse } from './auth.types';
import { Student, StudentDocument } from './../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  login(
    accountType: string,
    emailorcode: string,
    password: string,
  ): Promise<LoginResponse> | LoginResponse {
    switch (accountType) {
      case 'student':
        return this.loginStudent(emailorcode, password);
        break;
      default:
        return { code: '#Error' };
    }
  }

  async loginStudent(code: string, password: string): Promise<LoginResponse> {
    const user = await this.studentModel.findOne({ code });
    if (!user) return { code: '#Error', message: 'Invalid Code Or Password' };

    if (user.password !== password)
      return { code: '#Error', message: 'Invalid Code Or Password' };

    return { code: '#Success' };
  }
}
