import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { PostModel } from './post.model';
import { IsNotEmpty } from 'class-validator'

class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: '默认标题' })
  @IsNotEmpty({message:'请填写帖子标题'})
  title: string
  @ApiProperty({ description: '帖子内容', example: '默认内容' })
  content: string
}

@Controller('posts')
@ApiTags('post')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '显示帖子列表' })
  async index() {
    return await PostModel.find()
  }
  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() createPostDto: CreatePostDto) {
    await PostModel.create(createPostDto)
    return {
      status: 0,
      msg: '创建成功'
    }
  }
  @Get(':id')
  @ApiOperation({ summary: '帖子详情' })
  async detail(@Param('id') id: string) {
    return await PostModel.findById(id)
  }
  @Put(':id')
  @ApiOperation({ summary: '修改帖子' })
  async update(@Param('id') id: string, @Body() CreatePostDto: CreatePostDto) {
    await PostModel.findByIdAndUpdate(id, CreatePostDto)
    return {
      status: 0,
      msg: '修改帖子成功'
    }
  }
  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    await PostModel.findByIdAndDelete(id)
    return {
      status: 0,
      msg: '删除帖子成功'
    }
  }
}
