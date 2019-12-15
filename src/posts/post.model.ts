import { getModelForClass, prop } from '@hasezoey/typegoose'

export class Post {
  @prop({default:'我是默认的'})
  title:string
  @prop({default:'我是默认的'})
  content:string
}

export const PostModel = getModelForClass(Post) 