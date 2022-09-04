import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { Cookies } from 'src/customDecorators/custom.decorators';

@Controller('student')
export class StudentController {
  @Get('/getAll')
  getStudentsByClass(
    @Cookies('jwt') token: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('class') _class: string,
  ) {
    console.log(token, year, _class);
  }
}
