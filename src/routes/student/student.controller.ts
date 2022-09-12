import {
  AddStudentBody,
  EditStudentBody,
  AddRecordBody,
} from './student.types';
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
  Body,
} from '@nestjs/common';
import { JWTToken, ProtectedController } from '../../custom/custom.decorators';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse, SuccessResponse } from '../auth/auth.types';

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
  @UseGuards(OnlyAdminGuard)
  @ApiOkResponse({
    description: 'Successfully added students',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to add students',
    type: ErrorResponse,
  })
  addStudents(@JWTToken() token: Jwt, @Body() body: AddStudentBody) {
    return this.studentService.addStudents(token.schoolId, body.students);
  }

  @Post('/edit')
  @ApiOkResponse({
    description: 'Successfully edited student info',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong.',
    type: ErrorResponse,
  })
  editStudents(@JWTToken() token: Jwt, @Body() body: EditStudentBody) {
    return this.studentService.editStudents(
      token.schoolId,
      body.studentId,
      body.updates,
    );
  }

  @Post('/addRecord')
  @ApiOkResponse({
    description: 'Successfully edited student info',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Something went wrong.',
    type: ErrorResponse,
  })
  newRecord(@JWTToken() token: Jwt, @Body() body: AddRecordBody) {
    return { code: '#UnDocumented' };
  }

  @Post('/updateMark')
  updateMark() {
    return { code: '#UnDocumented' };
  }

  @Post('/getRecords')
  getRecords() {
    return { code: '#UnDocumented' };
  }

  @Delete('/deleteRecord')
  deleteRecord() {
    return { code: '#UnDocumented' };
  }

  @Post('/addParent')
  addParent() {
    return { code: '#UnDocumented' };
  }

  @Post('/getSummary')
  getSummary() {
    return { code: '#UnDocumented' };
  }
}
