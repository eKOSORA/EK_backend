import { Post } from '@nestjs/common';
import { ProtectedController } from 'src/custom/custom.decorators';

@ProtectedController('jwt', 'educator')
export class ParentController {
  @Post('/getInfo')
  getParentInfo() {
    return { code: '#UnDocument' };
  }

  @Post('/add')
  addParent() {
    return { code: '#UnDocument' };
  }

  @Post('/register')
  registerParent() {
    return { code: '#UnDocument' };
  }

  @Post('/addChild')
  addChild() {
    return { code: '#UnDocument' };
  }
}
