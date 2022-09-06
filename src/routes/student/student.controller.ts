import { Jwt } from './../../config/global.interface';
import { OnlyAdminGuard } from './../../guards/admin.guard';
import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JWTToken } from '../../custom/custom.decorators';

@Controller('student')
export class StudentController {
  /**
   * Fetch all students in a specified class and year/grade in the school of the currently logged in user
   * @param token object that contains info about the request source
   * @param year
   * @param _class
   */
  @Get('/getAll')
  @UseGuards(OnlyAdminGuard)
  getStudentsByClass(
    @JWTToken() token: Jwt,
    @Query('year', ParseIntPipe) year: number,
    @Query('class') _class: string,
  ) {
    console.log(token, year, _class);
    return { code: '#Success' };
  }
}
