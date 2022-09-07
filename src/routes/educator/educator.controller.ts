import { Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProtectedController } from '../../custom/custom.decorators';

@ProtectedController('jwt', 'educator')
@ApiTags('educator')
export class EducatorController {
  @Post('/add')
  addEducator() {
    return { code: '#UnDocumented' };
  }
  @Get('/getAll')
  getAllEducators() {
    return { code: '#UnDocumented' };
  }
  @Post('/edit')
  editEducator() {
    return { code: '#UnDocumented' };
  }
}
