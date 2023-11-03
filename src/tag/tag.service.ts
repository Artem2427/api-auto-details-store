import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TagRepository } from '@app/database/repositories/tag.repository';
import { CacheService } from '@app/shared/cache/cache.service';

// var ffmpeg = require('fluent-ffmpeg');

import * as FfmpegCommand from 'fluent-ffmpeg';

const ffmpegStatic = require('ffmpeg-static');

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    @Inject(CacheService)
    private readonly cacheService: CacheService,
  ) {}
  async findAll(): Promise<any> {
    const cacheKey = this.cacheService.generateDynamicKey('tags', ['all']);

    const cacheData = await this.cacheService.get(cacheKey);

    throw new HttpException('Test error', HttpStatus.BAD_REQUEST);

    if (cacheData) {
      return cacheData;
    }

    const tags = await this.tagRepository.findAll();
    await this.cacheService.set(cacheKey, tags);

    return tags;
  }

  async test() {
    this.cacheService.set(
      this.cacheService.generateDynamicKey('tags', ['all']),
      { a: 2, b: { c: 5 } },
      30,
    );
  }

  async getAudioFromTheVideo(file: Express.Multer.File) {
    console.log(file, 'file');
    const supportedFiles = ['mp4', 'mov', 'm4v'];

    console.log(ffmpegStatic, 'ffmpegStatic');

    FfmpegCommand.setFfmpegPath('"' + ffmpegStatic + '"');
    FfmpegCommand()
      .input('./test-video.mp4')
      .saveToFile('./audio.mp3')
      .on('progress', (progress) => {
        console.log(progress, 'progress');

        if (progress.percent) {
          console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
      })
      .on('end', () => {
        console.log('FFmpeg has finished.');
      })
      .on('error', (error) => {
        console.error(error);
      })
      .run();
  }
}
