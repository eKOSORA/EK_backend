import { ParentService } from './../parent/parent.service';
import {
  StudentBody,
  LessStudentBody,
  AddRecordBody,
  UpdateMarkBody,
} from './student.types';
import { deep_stringify } from './../../config/oneliners';
import {
  Student,
  StudentDocument,
  SafeStudent,
} from './../../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Parent, ParentDocument } from '../../schemas/parent.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
    @InjectModel(Parent.name)
    private readonly parentModel: Model<ParentDocument>,
    private readonly parentService: ParentService,
  ) {}

  async getStudentsByClass(schoolId: string, year: number, _class: string) {
    const students = await this.studentModel
      .find({
        school: new Types.ObjectId(schoolId),
        $and: [{ 'class._class': _class }, { 'class._year': Number(year) }],
      })
      .lean({ options: { _id: true } })
      .populate({ path: 'school', select: ['name', 'initials'] });

    const safeStudents: SafeStudent[] = students.map(
      (student) => new SafeStudent(student, 'records', 'password'),
    );
    return deep_stringify(safeStudents);
  }

  async addStudents(schoolId: string, students: StudentBody[]) {
    students = students.map((student) => ({
      ...student,
      school: new Types.ObjectId(schoolId),
    }));

    try {
      await this.studentModel.insertMany(students);
      return { code: '#Success' };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }

  async editStudents(
    schoolId: string,
    studentId: string,
    updates: LessStudentBody,
  ) {
    try {
      const found = !!(await this.studentModel.findOneAndUpdate(
        {
          school: schoolId,
          _id: studentId,
        },
        {
          ...updates,
        },
      ));

      return found
        ? { code: '#Success' }
        : {
            code: '#Error',
            message: 'Something went wrong. Please check your information',
          };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }

  async newRecord(schoolId: string, recordInfo: AddRecordBody) {
    // if (recordInfo.term === 'current') {
    //   recordInfo.term = await this.
    // }
    try {
      await this.studentModel.updateMany(
        {
          school: schoolId,
          'class._class': recordInfo._class,
          'class._year': recordInfo._year,
        },
        {
          $push: {
            records: {
              name: recordInfo.name,
              subject: recordInfo.subject,
              max: recordInfo.max,
              reversed: recordInfo.reversed,
              date: recordInfo.date,
              term: recordInfo.term,
            },
          },
        },
      );
      return { code: '#Success' };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }

  async updateMark(schoolId: string, recordInfo: UpdateMarkBody) {
    try {
      await this.studentModel.updateOne(
        {
          school: schoolId,
          _id: recordInfo.studentId,
          records: { $elemMatch: { _id: recordInfo.recordId } },
        },
        {
          $set: { 'records.$.mark': recordInfo.mark },
        },
      );
      return { code: '#Success' };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }

  async getRecords(schoolId: string, _year: string, _class: string) {
    try {
      const records = await this.studentModel
        .find({
          school: schoolId,
          'class._class': _class,
          'class._year': _year,
        })
        .lean()
        .populate({ path: 'subject', select: 'title' });
      return { code: '#Success', results: deep_stringify(records) };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }

  async deleteRecord(schoolId: string, recordId: string) {
    try {
      await this.studentModel.updateMany(
        {
          school: schoolId,
          records: { $elemMatch: { _id: recordId } },
        },
        {
          $pull: { records: { _id: recordId } },
        },
      );
      return { code: '#Success' };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }

  async addParent(schoolId: string, studentId: string, parent_email: string) {
    const parent = await this.parentModel.findOne({
      email: parent_email,
    });
    if (!!parent) {
      return this.parentService.addChild(schoolId, parent._id, studentId);
    }

    return this.parentService.newParent(schoolId, studentId, parent_email);
  }
}
