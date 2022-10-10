import { deep_stringify } from './../../config/oneliners';
import { Educator, EducatorDocument } from './../../schemas/educator.schema';
import { Parent, ParentDocument } from './../../schemas/parent.schema';
import { School, SchoolDocument } from './../../schemas/school.schema';
import { SignupBody } from './signupBody.dto';
import { DefaultResponse, LoginResponse } from '../../config/global.interface';
import { Student, StudentDocument } from '../../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { ErrorChecker } from '../../custom/custom.decorators';

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

  @ErrorChecker()
  async signupSchool(body: SignupBody): Promise<DefaultResponse> {
    const school = new this.schoolModel(body);
    await school.save();
    return { code: '#Success' };
  }

  async login(
    accountType: string,
    emailorcode: string,
    password: string,
    school?: string,
  ): Promise<DefaultResponse> {
    if (!school && accountType !== 'parent')
      return { code: '#Error', message: 'Missing school id' };

    let response: LoginResponse | null = null;
    switch (accountType) {
      case 'student':
        response = await this.loginStudent(emailorcode, password, school);
        break;
      case 'educator':
        response = await this.loginEducator(emailorcode, password, school);
        break;
      case 'parent':
        response = await this.loginParent(emailorcode, password);
        break;
      default:
        response = { code: '#Error' };
    }
    /* Add token */
    response.token = jwt.sign(
      {
        accountType,
        id: response.id,
        isAdmin: !!response.isAdmin,
        schoolId: school,
      },
      process.env.JWT_SECRET,
    );
    return response;
  }

  async loginStudent(
    code: string,
    password: string,
    schoolId: string,
  ): Promise<LoginResponse> {
    const user = await this.studentModel.findOne({ code, school: schoolId });
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
      return { code: '#Error', message: 'Invalid Email / Tel Or Password' };

    return { code: '#Success', id: user._id };
  }

  async loginEducator(
    emailorphone: string,
    password: string,
    schoolId: string,
  ): Promise<LoginResponse> {
    const user = await this.educatorModel.findOne({
      school: schoolId,
      $or: [{ email: emailorphone }, { tel: emailorphone }],
    });
    if (!user)
      return { code: '#Error', message: 'Invalid Email / Tel Or Password' };

    if (user.password !== password)
      return { code: '#Error', message: 'Invalid Email / Tel Or Password' };
    const titles = Array.isArray(user.title) ? user.title : [user.title];
    return {
      code: '#Success',
      id: user._id,
      isAdmin: titles.includes('admin'),
    };
  }

  async changeRCAStudents() {
    const rca = await this.schoolModel.findOne({ initials: /rca/i });
    const rcaStudents = await this.studentModel.find({ school: rca._id });
    console.log(rcaStudents.length);

    for (const _student of rcaStudents) {
      const student: any = _student;
      await this.studentModel.updateOne(
        {
          _id: student._id,
        },
        {
          class: {
            _class: student.class.class,
            _year: student.class.year,
            year: undefined,
            class: undefined,
          },
        },
      );
      console.log('done with ', student.names);
    }
  }

  @ErrorChecker()
  async testdec() {
    // await this.studentModel.updateMany({}, { $unset: { parentEmails: 1 } });
    // return { code: '#Success' };
    // const studentWithParents = await this.studentModel
    //   .find({
    //     $nor: [{ parentEmails: [] }],
    //   })
    //   .lean();
    // for (const student of studentWithParents) {
    //   const studentParents = student.parentEmails;
    //   const parentIds = deep_stringify(
    //     await this.parentModel
    //       .find({ email: { $in: studentParents } })
    //       .select('_id'),
    //   ).map((parent) => parent._id);
    //   await this.studentModel.updateOne(
    //     { _id: student._id },
    //     { parents: parentIds },
    //   );
    // }
    // console.log('[LOG] Got students');
    return { code: '#Success' };
  }
}
