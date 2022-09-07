import { Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProtectedController } from '../../custom/custom.decorators';

@ProtectedController('jwt', 'educator')
@ApiTags('parent')
export class ParentController {
  @Post('/getInfo')
  getParentInfo() {
    return { code: '#UnDocumented' };
  }

  @Post('/add')
  addParent() {
    return { code: '#UnDocumented' };
  }

  @Post('/register')
  registerParent() {
    return { code: '#UnDocumented' };
  }

  @Post('/addChild')
  addChild() {
    return { code: '#UnDocumented' };
  }
}
