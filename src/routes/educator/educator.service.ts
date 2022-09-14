import { ResponseWithResults } from './../../config/global.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Educator, EducatorDocument } from '../../schemas/educator.schema';

@Injectable()
export class EducatorService {
  constructor(
    @InjectModel(Educator.name)
    private readonly educatorModel: Model<EducatorDocument>,
  ) {}

  async getSubjects(
    schoolId: string,
    educatorId: string,
  ): Promise<ResponseWithResults> {
    try {
      const educator = await this.educatorModel
        .findOne({
          _id: educatorId,
          school: schoolId,
        })
        .lean()
        .populate({ path: 'subjects', select: 'title' });

      if (!educator) {
        throw new Error('Invalid EducatorID. No Such Educator in The System');
      }

      return { code: '#Success', results: educator.subjects };
    } catch (e) {
      return { code: '#Error', message: e.message };
    }
  }
}
