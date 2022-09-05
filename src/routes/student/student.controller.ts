import { AdminGuard } from './../../guards/admin.guard';
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
  @Get('/getAll')
  @UseGuards(AdminGuard)
  getStudentsByClass(
    @JWTToken() token: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('class') _class: string,
  ) {
    console.log(token, year, _class);
  }
}
