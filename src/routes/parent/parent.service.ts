import { SendGridService } from './../sendgrid/sendgrid.service';
import { Parent, ParentDocument } from '../../schemas/parent.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewParentMailContent } from '../sendgrid/sendgrid.types';
import { Student, StudentDocument } from '../../schemas/student.schema';

@Injectable()
export class ParentService {
  constructor(
    @InjectModel(Parent.name)
    private readonly parentModel: Model<ParentDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    private readonly sendGridService: SendGridService,
  ) {}

  async newParent(schoolId: string, studentId: string, parent_email: string) {
    try {
      const student = await this.studentModel.findOne({
        _id: studentId,
        school: schoolId,
      });
      if (!student) {
        throw new Error('Invalid Student ID. Student Does Not Exist');
      }

      const parent = new this.parentModel({
        email: parent_email,
        children: [studentId],
      });
      await parent.save();

      const mailContent: NewParentMailContent = {
        code: String(parent._id),
        student_names: student.names,
        date: `${new Date().toString().slice(0, 21)}`,
      };
      await this.sendGridService.send(
        {
          subject: 'Welcome to eKOSORA',
          to: parent_email,
          dynamicTemplateData: mailContent,
        },
        'register_parent',
      );

      return { code: '#Success' };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }

  async addChild(schoolId: string, parentId: string, studentId: string) {
    try {
      const child = await this.studentModel.findOne({
        school: schoolId,
        _id: studentId,
      });
      if (!child) {
        throw new Error('Invalid Student ID. Student Does Not Exist');
      }

      const parent = await this.parentModel.updateOne(
        { _id: parentId },
        { $push: { children: studentId } },
      );
      if (!parent.matchedCount) {
        throw new Error('Invalid Parent ID. Parent Does Not Exist');
      }

      return {
        code: '#Success',
      };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }
}
