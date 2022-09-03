import { School, SchoolDocument } from './../../schemas/school.schema';
import { SignupBody } from './signupBody.dto';
import { DefaultResponse, LoginResponse } from './auth.types';
import { Student, StudentDocument } from '../../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

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

  async login(
    accountType: string,
    emailorcode: string,
    password: string,
  ): Promise<DefaultResponse> {
    let response: LoginResponse | null = null;
    switch (accountType) {
      case 'student':
        response = await this.loginStudent(emailorcode, password);
        break;
      default:
        response = { code: '#Error' };
    }
    /* Add token */
    response.token = jwt.sign(
      { accountType, id: response.id },
      process.env.JWT_SECRET,
    );
    return response;
  }

  async loginStudent(code: string, password: string): Promise<LoginResponse> {
    const user = await this.studentModel.findOne({ code });
    if (!user) return { code: '#Error', message: 'Invalid Code Or Password' };

    if (user.password !== password)
      return { code: '#Error', message: 'Invalid Code Or Password' };

    return { code: '#Success' };
  }

  // async changeRCAStudents() {
  //   const rca = await this.schoolModel.findOne({ initials: 'RCA' });
  //   if (!rca) {
  //     console.log('No RCA found');
  //     return;
  //   }
  //   const rcaStudents = await this.studentModel.updateMany(
  //     { code: /rca/i },
  //     { school: rca._id },
  //   );
  //   console.log(rcaStudents);
  // }
}
