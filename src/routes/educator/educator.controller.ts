import { Get, Post } from '@nestjs/common';
import { ProtectedController } from 'src/custom/custom.decorators';

@ProtectedController('jwt', 'educator')
export class EducatorController {
  @Post('/add')
  addEducator() {
    return { code: '#UnDocument' };
  }
  @Get('/getAll')
  getAllEducators() {
    return { code: '#UnDocument' };
  }
  @Post('/edit')
  editEducator() {
    return { code: '#UnDocument' };
  }
}
