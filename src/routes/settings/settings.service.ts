import { SchoolTerm, SchoolTermDocument } from './../../schemas/term.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { _try } from '../../custom/try.func';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(SchoolTerm.name)
    private readonly schoolTermModel: Model<SchoolTermDocument>,
  ) {}

  async getRecentTerms(schoolId: string) {
    const terms = await this.schoolTermModel
      .find({ school: schoolId })
      .sort({ start: 1 })
      .limit(3)
      .lean()
      .populate(['academicYear']);
    return { code: '#Success', result: terms };
  }

  async getCurrentTerm(schooldId: string) {
    const curTerm = await this.schoolTermModel
      .findOne({
        school: schooldId,
        current: true,
      })
      .lean()
      .populate('academicYear');
    return { code: '#Success', result: curTerm };
  }

  @_try()
  testFunc() {
    console.log('This is the test function');
    throw 'Error';
  }
}
