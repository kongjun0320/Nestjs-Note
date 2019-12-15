import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as mongoose from 'mongoose'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // 连接数据库
  mongoose.connect('mongodb://localhost/nest-blog-api', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  const app = await NestFactory.create(AppModule);
  // 加上全局验证管道
  app.useGlobalPipes(new ValidationPipe())
  // API文档的格式
  const options = new DocumentBuilder()
    .setTitle('nest博客API接口文档')
    .setDescription('我的第一个nest项目')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
//  监听的端口号
  await app.listen(5000);
}
bootstrap();
