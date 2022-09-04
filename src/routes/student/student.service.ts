import {
  Student,
  StudentDocument,
  SafeStudent,
} from './../../schemas/student.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}
  async getStudentsByClass(schoolId, year, _class) {
    const students = await this.studentModel.find({
      school: schoolId,
      class: { _year: year, _class },
    });
    const safeStudents: SafeStudent[] = students.map(
      (student) => new SafeStudent(student),
    );
    return safeStudents;
  }
}
