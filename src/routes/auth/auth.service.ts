import { School, SchoolDocument } from './../../schemas/school.schema';
import { SignupBody } from './signupBody.dto';
import { DefaultResponse } from './auth.types';
import { Student, StudentDocument } from '../../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
  ) {}

  async signupSchool(body: SignupBody): Promise<DefaultResponse> {
    try {
      const school = new this.schoolModel(body);
      await school.save();
      return { code: '#Success' };
    } catch (e: any) {
      return { code: '#Error', message: e.message };
    }
  }

  login(
    accountType: string,
    emailorcode: string,
    password: string,
  ): Promise<DefaultResponse> | DefaultResponse {
    switch (accountType) {
      case 'student':
        return this.loginStudent(emailorcode, password);
        break;
      default:
        return { code: '#Error' };
    }
  }

  async loginStudent(code: string, password: string): Promise<DefaultResponse> {
    const user = await this.studentModel.findOne({ code });
    if (!user) return { code: '#Error', message: 'Invalid Code Or Password' };

    if (user.password !== password)
      return { code: '#Error', message: 'Invalid Code Or Password' };

    return { code: '#Success' };
  }
}
