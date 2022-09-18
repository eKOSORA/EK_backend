import {
  ResponseWithResults,
  ErrorResponse,
} from './../../config/global.interface';
import { GetParentInfoBody, RegisterParentBody } from './parent.types';
import { NoStudentGuard } from './../../guards/admin.guard';
import { ParentService } from './parent.service';
import { Body, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  DefaultApiResponses,
  ProtectedController,
} from '../../custom/custom.decorators';

@ProtectedController('jwt', 'parent')
@ApiTags('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post('/getInfo')
  @UseGuards(NoStudentGuard)
  @ApiOkResponse({ type: ResponseWithResults, description: 'Got Parent Info' })
  @ApiResponse({
    status: 400,
    description: 'Failed to get parent info',
    type: ErrorResponse,
  })
  async getParentInfo(
    @Body() { parentId }: GetParentInfoBody,
  ): Promise<ResponseWithResults | ErrorResponse> {
    return this.parentService.getParentInfo(parentId);
  }

  @Post('/register/:id')
  @DefaultApiResponses(
    'Successfully registered parent',
    'Failed to Register Parent',
  )
  registerParent(
    @Param('id') parentId: string,
    @Body() { updates }: RegisterParentBody,
  ) {
    return this.parentService.registerParent(parentId, updates);
  }

  // @Post('/add')
  // addParent() {
  //   return { code: '#UnDocumented' };
  // }

  // @Post('/addChild')
  // addChild() {
  //   return { code: '#UnDocumented' };
  // }
}
