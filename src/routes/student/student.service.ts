import { StudentBody, LessStudentBody, AddRecordBody } from './student.types';
import { deep_stringify } from './../../config/oneliners';
import {
  Student,
  StudentDocument,
  SafeStudent,
} from './../../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
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
}
