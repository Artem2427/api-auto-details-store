import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiExcludeEndpoint, ApiHideProperty, ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('Tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // @ApiExcludeEndpoint(true)
  // @ApiSecurity('Test')
  @Get()
  async findAll() {
    // const tags = await this.tagService.findAll();
    // return {
    //   tags: tags.map((tag) => tag.name),
    // };

    return await this.tagService.findAll();
  }
  @Get('test')
  async findAll1() {
    const tags = await this.tagService.test();
    return tags;
  }
}
