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
    return JSON.parse(JSON.stringify(safeStudents));
  }
}
