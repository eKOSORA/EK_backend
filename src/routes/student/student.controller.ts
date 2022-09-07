import { StudentService } from './student.service';
import { Jwt } from './../../config/global.interface';
import { OnlyAdminGuard } from './../../guards/admin.guard';
import {
  ClassSerializerInterceptor,
  Get,
  Post,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { JWTToken, ProtectedController } from '../../custom/custom.decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('student')
@ProtectedController('jwt', 'student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  /**
   * Fetch all students in a specified class and year/grade in the school of the currently logged in user
   * @param token object that contains info about the request source
   * @param year
   * @param _class
   */
  @Get('/getAll')
  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getStudentsByClass(
    @JWTToken() token: Jwt,
    @Query('year', ParseIntPipe) year: number,
    @Query('class') _class: string,
  ) {
    return this.studentService.getStudentsByClass(token.schoolId, year, _class);
    return { code: '#Success' };
  }

  @Post('/add')
  addStudents() {
    return { code: '#UnDocument' };
  }

  @Post('/edit')
  editStudents() {
    return { code: '#UnDocument' };
  }

  @Post('/addRecord')
  newRecord() {
    return { code: '#UnDocument' };
  }

  @Post('/updateMark')
  updateMark() {
    return { code: '#UnDocument' };
  }

  @Post('/getRecords')
  getRecords() {
    return { code: '#UnDocument' };
  }

  @Delete('/deleteRecord')
  deleteRecord() {
    return { code: '#UnDocument' };
  }

  @Post('/addParent')
  addParent() {
    return { code: '#UnDocument' };
  }

  @Post('/getSummary')
  getSummary() {
    return { code: '#UnDocument' };
  }
}
