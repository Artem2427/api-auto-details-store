import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TagService } from './tag.service';
import {
  ApiExcludeEndpoint,
  ApiHideProperty,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tags')
@ApiTags('Tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // @ApiExcludeEndpoint(true)
  // @ApiSecurity('Test')
  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }
  @Get('test')
  async findAll1(@Param('id', new ParseIntPipe()) id: number) {
    const tags = await this.tagService.test();
    return tags;
  }
}
