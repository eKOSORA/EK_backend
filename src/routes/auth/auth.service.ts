import { Educator, EducatorDocument } from './../../schemas/educator.schema';
import { Parent, ParentDocument } from './../../schemas/parent.schema';
import { School, SchoolDocument } from './../../schemas/school.schema';
import { SignupBody } from './signupBody.dto';
import { DefaultResponse, LoginResponse } from './auth.types';
import { Student, StudentDocument } from '../../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types as mongoTypes } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(School.name)
    private readonly schoolModel: Model<SchoolDocument>,
    @InjectModel(Parent.name)
    private readonly parentModel: Model<ParentDocument>,
    @InjectModel(Educator.name)
    private readonly educatorModel: Model<EducatorDocument>,
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
      case 'educator':
        response = await this.loginStudent(emailorcode, password);
        break;
      case 'parent':
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

    return { code: '#Success', id: user._id };
  }

  async loginParent(
    emailorphone: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.parentModel.findOne({
      $or: [{ email: emailorphone }, { tel: emailorphone }],
    });
    if (!user)
      return { code: '#Error', message: 'Invalid Email / Tel Or Password' };

    if (user.password !== password)
      return { code: '#Error', message: 'Invalid Code Or Password' };

    return { code: '#Success', id: user._id };
  }

  async loginEducator(
    emailorphone: string,
    password: string,
  ): Promise<LoginResponse> {
    const user = await this.educatorModel.findOne({
      $or: [{ email: emailorphone }, { tel: emailorphone }],
    });
    if (!user)
      return { code: '#Error', message: 'Invalid Email / Tel Or Password' };

    if (user.password !== password)
      return { code: '#Error', message: 'Invalid Code Or Password' };

    return { code: '#Success', id: user._id };
  }

  // async changeRCAParents() {
  //   const rcaParents = await this.parentModel.find({});
  //   for (const parent of rcaParents) {
  //     const children = parent.children?.map(
  //       (child: any) => new mongoTypes.ObjectId(child),
  //     );
  //     console.log(
  //       await this.parentModel.updateOne({ _id: parent._id }, { children }),
  //     );
  //   }
  // }
}
